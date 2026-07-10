import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { bootstrap } from './config/database.js';
import net from 'net';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const activePortFile = path.join(rootDir, '.active_port');

// Helper to find a free port starting from a given port
function getAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.unref();
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(getAvailablePort(startPort + 1));
            } else {
                reject(err);
            }
        });
        server.listen(startPort, '0.0.0.0', () => {
            server.close(() => {
                resolve(startPort);
            });
        });
    });
}

const initialPort = parseInt(process.env.PORT || '8001', 10);

getAvailablePort(initialPort)
    .then((port) => {
        // Write the port to the active port file
        try {
            fs.writeFileSync(activePortFile, port.toString(), 'utf8');

            // Register clean up hooks to remove the port file on termination
            const cleanup = () => {
                try {
                    if (fs.existsSync(activePortFile)) {
                        fs.unlinkSync(activePortFile);
                    }
                } catch (e) { }
                process.exit();
            };
            process.on('SIGINT', cleanup);
            process.on('SIGTERM', cleanup);
            process.on('exit', () => {
                try {
                    if (fs.existsSync(activePortFile)) {
                        fs.unlinkSync(activePortFile);
                    }
                } catch (e) { }
            });
        } catch (err) {
            console.error('Failed to write active port to file:', err);
        }

        // Start listening immediately on IPv4 wildcard
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });

        // Bootstrap database tables in parallel
        bootstrap()
            .then((dbConnected) => {
                if (dbConnected) {
                    console.log('Database tables bootstrapped successfully.');
                } else {
                    console.log('Database not connected. Server running in offline mode.');
                }
            })
            .catch((err) => {
                console.error('Unexpected error during database bootstrap:', err);
            });
    })
    .catch((err) => {
        console.error('Failed to find an available port:', err);
        process.exit(1);
    });

