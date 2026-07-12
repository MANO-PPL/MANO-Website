import knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

const db = knex({
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: process.env.DB_ADMIN_USER || process.env.WEBSITE_DB_USER,
    password: process.env.DB_ADMIN_PASSWORD || process.env.WEBSITE_DB_PASSWORD,
    database: process.env.WEBSITE_DB_NAME || 'MANO_Website_db',
  },
});

async function run() {
  try {
    console.log("Checking if 'resumes' table has 'mobile' column...");
    const hasMobile = await db.schema.hasColumn('resumes', 'mobile');
    if (!hasMobile) {
      console.log("Adding 'mobile' column to 'resumes' table...");
      await db.schema.alterTable('resumes', (table) => {
        table.string('mobile', 50).nullable();
      });
      console.log("Column 'mobile' added successfully to 'resumes' table.");
    } else {
      console.log("'mobile' column already exists in 'resumes' table.");
    }

    console.log("Checking if 'resumes' table has 'remarks' column...");
    const hasRemarks = await db.schema.hasColumn('resumes', 'remarks');
    if (!hasRemarks) {
      console.log("Adding 'remarks' column to 'resumes' table...");
      await db.schema.alterTable('resumes', (table) => {
        table.text('remarks').nullable();
      });
      console.log("Column 'remarks' added successfully to 'resumes' table.");
    } else {
      console.log("'remarks' column already exists in 'resumes' table.");
    }

    console.log("Checking if 'jobs' table has 'status' column...");
    const hasStatus = await db.schema.hasColumn('jobs', 'status');
    if (!hasStatus) {
      console.log("Adding 'status' column to 'jobs' table...");
      await db.schema.alterTable('jobs', (table) => {
        table.string('status', 50).defaultTo('active').notNullable();
      });
      console.log("Column 'status' added successfully with default value 'active'.");
    } else {
      console.log("'status' column already exists in 'jobs' table.");
    }

    console.log("Updating existing jobs status...");
    await db('jobs').whereNull('status').orWhere('status', '').update({ status: 'active' });
    console.log("Updated status to 'active' for existing records.");

    // ─── PROJECTS TABLE MIGRATION ──────────────────────────────────────────
    console.log("Checking if 'projects' table exists...");
    const hasProjects = await db.schema.hasTable('projects');
    if (!hasProjects) {
      console.log("Creating 'projects' table...");
      await db.schema.createTable('projects', (table) => {
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
            `${BASE_URL}Golf Apartment/Golf Appartment 1 .jpg.webp`,
            `${BASE_URL}Golf Apartment/Golf Appartment 2 .jpg.webp`
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

      await db('projects').insert(seedProjects);
      console.log(`Seeded ${seedProjects.length} projects successfully in migrate.js.`);
    } else {
      console.log("'projects' table already exists.");
    }

    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
