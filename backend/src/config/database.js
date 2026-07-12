import knex from 'knex';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secure password hashing helper using scrypt
export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedPassword) => {
  if (!storedPassword) return false;
  const [salt, hash] = storedPassword.split(':');
  if (!salt || !hash) return false;
  const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return verifyHash === hash;
};

// Dynamically extract seed data from hardcoded frontend blog files
const getSeedBlogs = () => {
  try {
    const blogPagePath = path.join(__dirname, '../../../frontend/src/pages/Blog/BlogPage.jsx');
    const blogDetailPath = path.join(__dirname, '../../../frontend/src/pages/Blog/BlogDetail.jsx');

    if (!fs.existsSync(blogPagePath) || !fs.existsSync(blogDetailPath)) {
      console.warn("⚠️ Static blog files not found for seeding database.");
      return [];
    }

    const blogPageContent = fs.readFileSync(blogPagePath, 'utf8');
    const blogPostsMatch = blogPageContent.match(/export const blogPosts = (\[[\s\S]*?\n\]);/);
    if (!blogPostsMatch) {
      console.warn("⚠️ Could not match blogPosts in BlogPage.jsx");
      return [];
    }

    // Evaluate the array directly
    const blogPosts = eval(blogPostsMatch[1]);

    const blogDetailContent = fs.readFileSync(blogDetailPath, 'utf8');
    const blogContentMatch = blogDetailContent.match(/const blogContent = (\{[\s\S]*?\n\});/);
    if (!blogContentMatch) {
      console.warn("⚠️ Could not match blogContent in BlogDetail.jsx");
      return [];
    }
    const blogContentMap = eval('(' + blogContentMatch[1] + ')');

    // Combine metadata with detailed contents
    const seededBlogs = blogPosts.map(post => {
      const detail = blogContentMap[post.id] || { sections: [], keyTakeaways: [] };
      return {
        id: post.id,
        title: post.title,
        summary: post.summary,
        author: post.author,
        author_role: post.authorRole,
        date: post.date,
        read_time: post.readTime,
        category: post.category,
        image: post.image,
        featured: post.featured ? 1 : 0,
        tags: JSON.stringify(post.tags || []),
        content: JSON.stringify(detail)
      };
    });

    return seededBlogs;
  } catch (error) {
    console.error("Failed to parse static blog files for seeding:", error);
    return [];
  }
};

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

// Admin access only for local dev environment
export let adminDB = null;

if (process.env.NODE_ENV === 'development') {
  adminDB = knex({
    client: 'mysql2',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: process.env.DB_ADMIN_USER,
      password: process.env.DB_ADMIN_PASSWORD,
      database: process.env.WEBSITE_DB_NAME || 'MANO_Website_db',
    },
  });
}

// Least-privileged web app usage connection
export const ManoWebDB = knex({
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: process.env.WEBSITE_DB_USER,
    password: process.env.WEBSITE_DB_PASSWORD,
    database: process.env.WEBSITE_DB_NAME || 'MANO_Website_db',
  },
  pool: { min: 0, max: 10 },
});

// Backward-compatible query function using the least-privileged ManoWebDB connection
export const query = async (text, params = []) => {
  // Replace positional parameters ($1, $2, etc.) with MySQL's '?' placeholder
  const mysqlText = text.replace(/\$\d+/g, '?');
  const result = await ManoWebDB.raw(mysqlText, params);
  // Knex raw returns [rows, fields] for mysql2 client
  return { rows: result[0], fields: result[1] };
};

export let isDbReady = false;

// Bootstrap function to create database, user, tables, and assign least-privilege permissions
const performBootstrap = async () => {
  if (process.env.NODE_ENV === 'development') {
    const dbName = process.env.WEBSITE_DB_NAME;
    const dbUser = process.env.WEBSITE_DB_USER;
    const dbPass = process.env.WEBSITE_DB_PASSWORD;

    // 1. Connect without a database first to ensure the database and user exist
    const adminInit = knex({
      client: 'mysql2',
      connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: process.env.DB_ADMIN_USER,
        password: process.env.DB_ADMIN_PASSWORD,
      },
    });

    try {
      // Test initial database connection
      await adminInit.raw('SELECT 1');
    } catch (connErr) {
      console.warn(`⚠️ Local MySQL database is not reachable on ${DB_HOST}:${DB_PORT} (${connErr.code || connErr.message}).`);
      console.warn(`Please ensure your local MySQL server is started or SSH tunnel is active.`);
      await adminInit.destroy();
      return false;
    }

    try {
      // Create Database if it does not exist
      await adminInit.raw(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

      // Create least-privileged user if it does not exist
      try {
        await adminInit.raw(`CREATE USER IF NOT EXISTS '${dbUser}'@'%' IDENTIFIED BY '${dbPass}'`);
      } catch (err) {
        console.log('User creation check warning (user may already exist):', err.message);
      }

      // Ensure password is up to date
      try {
        await adminInit.raw(`ALTER USER '${dbUser}'@'%' IDENTIFIED BY '${dbPass}'`);
      } catch (err) {
        console.log('User password alteration check warning:', err.message);
      }

      // Grant only SELECT, INSERT, UPDATE, DELETE to the webapp user (least privilege)
      await adminInit.raw(`GRANT SELECT, INSERT, UPDATE, DELETE ON \`${dbName}\`.* TO '${dbUser}'@'%'`);
      await adminInit.raw('FLUSH PRIVILEGES');
      console.log(`Database "${dbName}" and user "${dbUser}" privileges bootstrapped successfully.`);
    } catch (err) {
      console.error('Error during database initialization phase:', err.message);
    } finally {
      await adminInit.destroy();
    }

    // 2. Now use adminDB (which connects to the database as admin) to create/modify tables
    try {
      const hasUsers = await adminDB.schema.hasTable('users');
      if (!hasUsers) {
        await adminDB.schema.createTable('users', (table) => {
          table.increments('id').primary();
          table.string('username', 255).notNullable().unique();
          table.string('password', 255).notNullable();
          table.string('role', 50).defaultTo('admin');
          table.timestamp('created_at').defaultTo(adminDB.fn.now());
        });
        console.log("Table 'users' created successfully.");

        const initialAdminUsername = process.env.ADMIN_USERNAME || 'admin';
        const initialAdminPassword = process.env.ADMIN_PASSWORD || 'admin';
        const hashedPassword = hashPassword(initialAdminPassword);

        await adminDB('users').insert({
          username: initialAdminUsername,
          password: hashedPassword,
          role: 'admin'
        });
        console.log("Initial admin user seeded successfully.");
      }

      const hasBlogs = await adminDB.schema.hasTable('blogs');
      if (!hasBlogs) {
        await adminDB.schema.createTable('blogs', (table) => {
          table.increments('id').primary();
          table.string('title', 255).notNullable();
          table.text('summary').notNullable();
          table.string('author', 255).notNullable();
          table.string('author_role', 255);
          table.string('date', 50);
          table.string('read_time', 50);
          table.string('category', 100);
          table.string('image', 255);
          table.boolean('featured').defaultTo(false);
          table.text('tags'); // JSON stringified array
          table.text('content'); // JSON stringified object containing {sections: [...], keyTakeaways: [...]}
          table.timestamps(true, true);
        });
        console.log("Table 'blogs' created successfully.");

        const seedBlogs = getSeedBlogs();
        if (seedBlogs.length > 0) {
          await adminDB('blogs').insert(seedBlogs);
          console.log(`Seeded ${seedBlogs.length} blogs successfully from static frontend files.`);
        }
      }

      const hasEnquiries = await adminDB.schema.hasTable('enquiries');
      if (!hasEnquiries) {
        await adminDB.schema.createTable('enquiries', (table) => {
          table.increments('id').primary();
          table.string('name', 255).notNullable();
          table.string('email', 255).notNullable();
          table.string('company_name', 255);
          table.string('contact_whatsapp', 50);
          table.string('service_required', 255).notNullable();
          table.text('project_details');
          table.timestamp('created_at').defaultTo(adminDB.fn.now());
        });
        console.log("Table 'enquiries' created successfully.");
      }

      // ─── RESUMES TABLE SETUP ──────────────────────────────────────────────
      const hasResumes = await adminDB.schema.hasTable('resumes');
      if (!hasResumes) {
        await adminDB.schema.createTable('resumes', (table) => {
          table.increments('id').primary();
          table.string('name', 255).notNullable();
          table.string('email', 255).notNullable();
          table.string('job_role', 255).notNullable();
          table.integer('job_id').unsigned().nullable(); // Handled as foreign key below
          table.string('file_name', 255).notNullable();
          table.string('file_path', 255).notNullable();
          table.enum('platform', ['pmc', 'epc']).defaultTo('pmc').notNullable();
          table.timestamp('created_at').defaultTo(adminDB.fn.now());
        });
        console.log("Table 'resumes' created successfully.");
      }

      // Ensure platform, job_id, email columns and constraints on resumes table
      const hasResumesPlatform = await adminDB.schema.hasColumn('resumes', 'platform');
      if (!hasResumesPlatform) {
        await adminDB.schema.alterTable('resumes', (table) => {
          table.enum('platform', ['pmc', 'epc']).defaultTo('pmc').notNullable();
        });
        console.log("Added enum column 'platform' to table 'resumes'.");
      } else {
        // Safe data sanitization before alter
        await adminDB.raw("UPDATE resumes SET platform = 'pmc' WHERE platform NOT IN ('pmc', 'epc') OR platform IS NULL");
        // Alter type to enum
        try {
          await adminDB.schema.alterTable('resumes', (table) => {
            table.enum('platform', ['pmc', 'epc']).defaultTo('pmc').notNullable().alter();
          });
        } catch (e) {
          // Ignore
        }
      }

      const hasResumesJobId = await adminDB.schema.hasColumn('resumes', 'job_id');
      if (!hasResumesJobId) {
        await adminDB.schema.alterTable('resumes', (table) => {
          table.integer('job_id').unsigned().nullable();
        });
        console.log("Added column 'job_id' to table 'resumes'.");
      }

      // Ensure foreign key constraint for resumes.job_id references jobs.id
      try {
        await adminDB.schema.alterTable('resumes', (table) => {
          table.foreign('job_id').references('id').inTable('jobs').onDelete('SET NULL');
        });
        console.log("Added foreign key constraint resumes(job_id) -> jobs(id) with ON DELETE SET NULL.");
      } catch (err) {
        // Constraint might already exist
      }

      // Clean up/remove brand_context column if it exists (since it's no longer required)
      const hasBrandColumn = await adminDB.schema.hasColumn('resumes', 'brand_context');
      if (hasBrandColumn) {
        await adminDB.schema.table('resumes', (table) => {
          table.dropColumn('brand_context');
        });
        console.log("Removed column 'brand_context' from table 'resumes' to keep schema clean.");
      }

      // ─── JOBS TABLE SETUP ─────────────────────────────────────────────────
      const hasJobs = await adminDB.schema.hasTable('jobs');
      if (!hasJobs) {
        await adminDB.schema.createTable('jobs', (table) => {
          table.increments('id').primary();
          table.string('title', 255).notNullable();
          table.string('qualification', 255);
          table.string('location', 255);
          table.enum('gender', ['Male', 'Female', 'Any']).defaultTo('Any');
          table.string('jd_file_path', 500);
          table.enum('status', ['active', 'inactive']).defaultTo('active').notNullable();
          table.string('platform', 100).defaultTo('pmc').notNullable();
          table.timestamps(true, true);
        });
        console.log("Table 'jobs' created successfully.");

        // Initial Seed Data
        const initialJobs = [
          {
            title: "BD-Sales Marketing",
            qualification: "Any Graduate",
            location: "HO (Dadar)",
            gender: "Female",
            jd_file_path: null,
            platform: "pmc"
          },
          {
            title: "Sr.Billing Engineer",
            qualification: "BE/DCE CIVIL",
            location: "HO (Dadar)",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          },
          {
            title: "QA/QC Engineer",
            qualification: "BE/B.Tech",
            location: "HO (Dadar)",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          },
          {
            title: "Project Cordinator",
            qualification: "BE/B.Tech",
            location: "HO (Dadar)",
            gender: "Male",
            jd_file_path: null,
            platform: "pmc"
          },
          {
            title: "Sr.Engineer",
            qualification: "BE/B.Tech",
            location: "Indore",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          },
          {
            title: "Interior Site Incharge",
            qualification: "DCE/BE/B.tech",
            location: "Pan India",
            gender: "Male",
            jd_file_path: null,
            platform: "pmc"
          },
          {
            title: "JR.Engineer",
            qualification: "DEE/BE/B.tech",
            location: "Glowmax, Central Africa",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          },
          {
            title: "Interior Project manager",
            qualification: "DEE/BE/B.tech",
            location: "Pan India",
            gender: "Male",
            jd_file_path: null,
            platform: "pmc"
          },
          {
            title: "MEP Electrical engineer",
            qualification: "DEE/BE/B.tech",
            location: "Pan India",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          },
          {
            title: "SR.Engineer",
            qualification: "DEE/BE/B.tech",
            location: "Pan India",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          },
          {
            title: "JR.Engineer",
            qualification: "DEE/BE/B.tech",
            location: "Pan India",
            gender: "Male",
            jd_file_path: null,
            platform: "epc"
          }
        ];

        await adminDB('jobs').insert(initialJobs);
        console.log("Table 'jobs' seeded successfully.");
      } else {
        // Sanitize data before altering type to enum
        await adminDB.raw("UPDATE jobs SET status = 'active' WHERE status NOT IN ('active', 'inactive') OR status IS NULL");
        await adminDB.raw("UPDATE jobs SET platform = 'pmc' WHERE platform IS NULL");
        await adminDB.raw("UPDATE jobs SET gender = 'Any' WHERE gender NOT IN ('Male', 'Female', 'Any') OR gender IS NULL");

        // Alter jobs columns
        try {
          await adminDB.schema.alterTable('jobs', (table) => {
            table.enum('status', ['active', 'inactive']).defaultTo('active').notNullable().alter();
            table.string('platform', 100).defaultTo('pmc').notNullable().alter();
            table.enum('gender', ['Male', 'Female', 'Any']).defaultTo('Any').alter();
          });
        } catch (err) {
          // Ignore
        }

        // Alter table to add jd_file_path if it doesn't exist
        const hasJdPath = await adminDB.schema.hasColumn('jobs', 'jd_file_path');
        if (!hasJdPath) {
          await adminDB.schema.alterTable('jobs', (table) => {
            table.string('jd_file_path', 500).nullable();
          });
          console.log("Added column 'jd_file_path' to table 'jobs'.");
        }

        // Alter table to drop experience, age, specialization, salary, and notice_period columns if they exist
        const colsToDrop = ['experience', 'age', 'specialization', 'salary', 'notice_period'];
        for (const col of colsToDrop) {
          const hasCol = await adminDB.schema.hasColumn('jobs', col);
          if (hasCol) {
            await adminDB.schema.alterTable('jobs', (table) => {
              table.dropColumn(col);
            });
            console.log(`Dropped column '${col}' from table 'jobs'.`);
          }
        }
      }

      // ─── INDEXES & RELATIONSHIP MIGRATIONS ──────────────────────────────
      // Add indexing safely
      const indexesToEnsure = [
        { table: 'resumes', col: 'job_id' },
        { table: 'resumes', col: 'email' },
        { table: 'resumes', col: 'platform' },
        { table: 'jobs', col: 'status' },
        { table: 'jobs', col: 'platform' }
      ];

      for (const idx of indexesToEnsure) {
        try {
          await adminDB.schema.alterTable(idx.table, (table) => {
            table.index(idx.col);
          });
        } catch (e) {
          // Index already exists
        }
      }

      // One-time data migration: link resumes to jobs if job_id is null
      const unlinkedResumes = await adminDB('resumes').whereNull('job_id');
      if (unlinkedResumes.length > 0) {
        let count = 0;
        for (const resume of unlinkedResumes) {
          // Find matching job by title and platform
          const job = await adminDB('jobs')
            .where({
              title: resume.job_role,
              platform: resume.platform
            })
            .first();
          if (job) {
            await adminDB('resumes')
              .where({ id: resume.id })
              .update({ job_id: job.id });
            count++;
          }
        }
        if (count > 0) {
          console.log(`Associated ${count} unlinked resumes with their respective jobs.`);
        }
      }

      // ─── PROJECTS TABLE SETUP ─────────────────────────────────────────────
      const hasProjects = await adminDB.schema.hasTable('projects');
      if (!hasProjects) {
        await adminDB.schema.createTable('projects', (table) => {
          table.increments('id').primary();
          table.string('title', 255).notNullable();
          table.string('location', 255).defaultTo('');
          table.string('category', 100).defaultTo('Commercial');
          table.text('scope');
          table.text('highlight');
          table.longtext('images'); // JSON stringified array of image URLs
          table.boolean('featured').defaultTo(false);
          table.integer('display_order').defaultTo(0);
          table.enum('status', ['active', 'inactive']).defaultTo('active').notNullable();
          table.timestamps(true, true);
        });
        console.log("Table 'projects' created successfully.");

        // Seed all existing static project data
        const BASE_URL = '/';
        const seedProjects = [
          // ── Featured / International ──────────────────────────────────────
          {
            title: "Hotel Moon Palace - Kinshasa",
            location: "Kinshasa, Congo",
            category: "Hospitality",
            scope: "PMC - Project Management Consultants",
            highlight: "Luxury hospitality development with premium amenities.",
            images: JSON.stringify([
              `${BASE_URL}Hotel Moon Kinshasa/001 (3).webp`,
              `${BASE_URL}Hotel Moon Kinshasa/002 (3).webp`,
              `${BASE_URL}Hotel Moon Kinshasa/003 (3).webp`,
              `${BASE_URL}Hotel Moon Kinshasa/006 (2).webp`
            ]),
            featured: 1, display_order: 1
          },
          {
            title: "Triveni Crown",
            location: "Kalyan",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "Landmark residential project with grand entrance gate.",
            images: JSON.stringify([
              `${BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/1.option 01-crown gate 01.webp`,
              `${BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/5.option 02-crown gate 03.webp`,
              `${BASE_URL}HD Picture TRIVENI Crown, Kalyan/MAIN GATE/6.option 02-crown gate 04.webp`
            ]),
            featured: 1, display_order: 2
          },
          {
            title: "Ananda Residency - Paradigm Ambit Buildcon",
            location: "Borivali (West), Mumbai",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "Massive 3,10,230 sq. ft. residential development completed successfully.",
            images: JSON.stringify([
              `${BASE_URL}projects_img/Ananda Residency - Paradigm Ambit Buildcon..webp`,
              `${BASE_URL}Ananda residency/Aerial.webp`,
              `${BASE_URL}Ananda residency/podium.webp`,
              `${BASE_URL}Ananda residency/pool.webp`,
              `${BASE_URL}Ananda residency/terrace 2.webp`
            ]),
            featured: 1, display_order: 3
          },
          {
            title: "Westside – Tata Trent Ltd.",
            location: "Gachibowli, Hyderabad",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "21,255 sq.ft. retail project delivered for Tata Trent.",
            images: JSON.stringify([
              `${BASE_URL}projects_img/Westside – Tata Trent Ltd.(1).webp`,
              `${BASE_URL}projects_img/Westside– Tata Trent Ltd..webp`
            ]),
            featured: 1, display_order: 4
          },
          {
            title: "30 Juin",
            location: "Congo",
            category: "Hospitality",
            scope: "PMC - Project Management Consultants",
            highlight: "Premium residential and commercial development.",
            images: JSON.stringify([
              `${BASE_URL}30 Juin/Tranjio Hotel 03.webp`,
              `${BASE_URL}30 Juin/Tranjio Hotel 04.webp`,
              `${BASE_URL}30 Juin/Tranjio Hotel 06.webp`
            ]),
            featured: 1, display_order: 5
          },
          // ── Residential ───────────────────────────────────────────────────
          {
            title: "Sati Darshan - Goyal Group",
            location: "Malad, Mumbai",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "1,39,749 sq.ft. residential project in Malad, Mumbai.",
            images: JSON.stringify([`${BASE_URL}projects_img/Sati Darshan - Goyal Group..webp`]),
            featured: 0, display_order: 6
          },
          {
            title: "Celestia - Shree Ram Samarth",
            location: "Mulund, Mumbai",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "1,00,000 sq.ft. residential development in Mulund, Mumbai.",
            images: JSON.stringify([`${BASE_URL}projects_img/Celestia - Shree Ram Samarth..webp`]),
            featured: 0, display_order: 7
          },
          {
            title: "Shubharambh Residency",
            location: "Solapur",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "59,000 sq.ft. housing project in Solapur.",
            images: JSON.stringify([`${BASE_URL}projects_img/Shubharambh Residency - Veer Housing Projects LLP..webp`]),
            featured: 0, display_order: 8
          },
          {
            title: "Golf Apartment",
            location: "",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "Luxury apartments with golf course views.",
            images: JSON.stringify([
              `${BASE_URL}Golf Apartment/Golf Appartment 1 .webp.webp`,
              `${BASE_URL}Golf Apartment/Golf Appartment 2 .webp.webp`
            ]),
            featured: 0, display_order: 9
          },
          {
            title: "Triveni Classics",
            location: "Kalyan",
            category: "Residential",
            scope: "PMC - Project Management Consultants",
            highlight: "Classic residential architecture in Kalyan.",
            images: JSON.stringify([
              `${BASE_URL}HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (NEW view) in progress.webp`,
              `${BASE_URL}HD Picture TRIVENI Classics, Kalyan/Triveni CLASSIC (Old view).webp`
            ]),
            featured: 0, display_order: 10
          },
          // ── Commercial ────────────────────────────────────────────────────
          {
            title: "Zudio / Tata Trent Projects",
            location: "",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "Rollout management for multiple retail outlets.",
            images: JSON.stringify([
              `${BASE_URL}projects_img/Zudio – Tata Trent Ltd.(3).webp`,
              `${BASE_URL}projects_img/Zudio – Tata Trent Ltd.(4).webp`
            ]),
            featured: 0, display_order: 11
          },
          {
            title: "NIDIMO - Kamala Mill",
            location: "Mumbai",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "Commercial interior works at Kamala Mills.",
            images: JSON.stringify([
              `${BASE_URL}NIDIMO - Kamala mill/2025-12-19 123025 1.webp`,
              `${BASE_URL}NIDIMO - Kamala mill/2025-12-19 123201 2.webp`,
              `${BASE_URL}NIDIMO - Kamala mill/2025-12-19 123143 3.webp`,
              `${BASE_URL}NIDIMO - Kamala mill/2025-12-19 123244 4.webp`
            ]),
            featured: 0, display_order: 12
          },
          {
            title: "NSCI Dome – Worli",
            location: "Worli, Mumbai",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "5,150 sq.ft. institutional-scale project in Mumbai.",
            images: JSON.stringify([
              `${BASE_URL}projects_img/NSCI Dome – National Sports Club of India..webp`,
              `${BASE_URL}NSCI/16.webp`,
              `${BASE_URL}NSCI/21.webp`,
              `${BASE_URL}NSCI/25.webp`
            ]),
            featured: 0, display_order: 13
          },
          {
            title: "More Hyper Mart",
            location: "Nashik",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "Retail construction in Nashik, Maharashtra.",
            images: JSON.stringify([`${BASE_URL}projects_img/More Hyper Mart -Aher Constructions Pvt. Ltd..webp`]),
            featured: 0, display_order: 14
          },
          {
            title: "Expeditors – Studio DNA",
            location: "",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "Corporate office interior project.",
            images: JSON.stringify([
              `${BASE_URL}projects_img/Expeditors – Studio DNA .webp`,
              `${BASE_URL}projects_img/Expeditors – Studio DNA.webp`
            ]),
            featured: 0, display_order: 15
          },
          {
            title: "Maharail – Studio DNA",
            location: "",
            category: "Commercial",
            scope: "PMC - Project Management Consultants",
            highlight: "Office space development.",
            images: JSON.stringify([`${BASE_URL}projects_img/Maharail – Studio DNA.webp`]),
            featured: 0, display_order: 16
          },
          // ── Industrial ────────────────────────────────────────────────────
          {
            title: "Prima Plastics Limited",
            location: "",
            category: "Industrial",
            scope: "PMC - Project Management Consultants",
            highlight: "1,69,000 Sft plastic manufacturing facility.",
            images: JSON.stringify([`${BASE_URL}projects_img/Prima Plastics Limited..webp`]),
            featured: 0, display_order: 17
          },
          {
            title: "Textile Factory",
            location: "Tarapur",
            category: "Industrial",
            scope: "PMC - Project Management Consultants",
            highlight: "52,532 sq.ft. industrial facility in Tarapur.",
            images: JSON.stringify([`${BASE_URL}projects_img/Textile Factory - Micro Interlinings Pvt. Ltd..webp`]),
            featured: 0, display_order: 18
          },
          {
            title: "Gaiwadi Industrial Estate",
            location: "",
            category: "Industrial",
            scope: "PMC - Project Management Consultants",
            highlight: "Amazon Warehouse project management.",
            images: JSON.stringify([`${BASE_URL}projects_img/Gaiwadi Industrial Estate - Amazon Warehouse..webp`]),
            featured: 0, display_order: 19
          },
          {
            title: "JNPC Infra Development",
            location: "",
            category: "Industrial",
            scope: "PMC - Project Management Consultants",
            highlight: "Infrastructure development oversight.",
            images: JSON.stringify([`${BASE_URL}projects_img/JNPC Infra Development– TUV Rheinland (India) Pvt Ltd..webp`]),
            featured: 0, display_order: 20
          },
          // ── Hospitality ───────────────────────────────────────────────────
          {
            title: "KAPCO Banquets & Catering",
            location: "New Delhi",
            category: "Hospitality",
            scope: "PMC - Project Management Consultants",
            highlight: "15,698 sq.ft. hospitality project in New Delhi.",
            images: JSON.stringify([`${BASE_URL}projects_img/KAPCO Banquets & Catering Pvt. Ltd..webp`]),
            featured: 0, display_order: 21
          }
        ];

        await adminDB('projects').insert(seedProjects);
        console.log(`Seeded ${seedProjects.length} projects successfully.`);
      }

      return true;
    } catch (err) {
      console.error('Failed to bootstrap tables with adminDB:', err.message);
      return false;
    }
  } else {
    // In production/staging, verify we can connect using ManoWebDB
    try {
      await ManoWebDB.raw('SELECT 1');
      console.log('Successfully verified connection to ManoWebDB.');
      return true;
    } catch (err) {
      console.warn(`⚠️ Failed to connect to ManoWebDB in production mode: ${err.message}`);
      return false;
    }
  }
};

export const bootstrap = async () => {
  try {
    return await performBootstrap();
  } finally {
    isDbReady = true;
  }
};
