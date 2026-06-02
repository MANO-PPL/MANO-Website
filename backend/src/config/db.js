import pg from 'pg';
import mysql from 'mysql2/promise';

const dbType = process.env.DB_TYPE || 'mysql';

let pool;

if (dbType === 'postgres') {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/mano_website'
    });
} else if (dbType === 'mysql') {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mano_website',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

export const query = async (text, params) => {
    if (dbType === 'postgres') {
        const res = await pool.query(text, params);
        return res;
    } else {
        // Replace positional parameters ($1, $2, etc.) with MySQL's '?' placeholder
        const mysqlText = text.replace(/\$\d+/g, '?');
        const [rows, fields] = await pool.execute(mysqlText, params);
        return { rows, fields };
    }
};

export const bootstrap = async () => {
    const isPostgres = dbType === 'postgres';
    const idType = isPostgres ? 'SERIAL' : 'INT AUTO_INCREMENT';
    const primaryKey = 'PRIMARY KEY';
    
    const enquiriesTableSql = `
        CREATE TABLE IF NOT EXISTS enquiries (
            id ${idType} ${primaryKey},
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            company_name VARCHAR(255),
            contact_whatsapp VARCHAR(50),
            service_required VARCHAR(255) NOT NULL,
            project_details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const resumesTableSql = `
        CREATE TABLE IF NOT EXISTS resumes (
            id ${idType} ${primaryKey},
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            job_role VARCHAR(255) NOT NULL,
            file_name VARCHAR(255) NOT NULL,
            file_path VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        await query(enquiriesTableSql);
        await query(resumesTableSql);
    } catch (err) {
        console.error('Failed to bootstrap tables:', err.message);
        throw err;
    }
};
