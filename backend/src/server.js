import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { bootstrap } from './config/database.js';

const PORT = process.env.PORT || 8001;

// Bootstrap database tables on startup
bootstrap()
    .then((dbConnected) => {
        if (dbConnected) {
            console.log('Database tables bootstrapped successfully.');
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } else {
            console.log('Database not connected. Starting server in offline mode...');
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT} (Database not connected)`);
            });
        }
    })
    .catch((err) => {
        console.error('Unexpected error during database bootstrap:', err);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (Database not connected)`);
        });
    });
