import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

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

// Bootstrap function to create database, user, tables, and assign least-privilege permissions
export const bootstrap = async () => {
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

      const hasResumes = await adminDB.schema.hasTable('resumes');
      if (!hasResumes) {
        await adminDB.schema.createTable('resumes', (table) => {
          table.increments('id').primary();
          table.string('name', 255).notNullable();
          table.string('email', 255).notNullable();
          table.string('job_role', 255).notNullable();
          table.string('file_name', 255).notNullable();
          table.string('file_path', 255).notNullable();
          table.timestamp('created_at').defaultTo(adminDB.fn.now());
        });
        console.log("Table 'resumes' created successfully.");
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
