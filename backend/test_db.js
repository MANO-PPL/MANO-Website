import knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.WEBSITE_DB_USER || 'mano_app',
    password: process.env.WEBSITE_DB_PASSWORD || 'zijgaq-cyfjir-Facpo5',
    database: process.env.WEBSITE_DB_NAME || 'MANO_Website_db',
  }
});

console.log('Connecting to database...');
console.log('Config:', {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.WEBSITE_DB_USER || 'mano_app',
  database: process.env.WEBSITE_DB_NAME || 'MANO_Website_db',
});

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
