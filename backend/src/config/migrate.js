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

    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
