import app from './app.js';
import { bootstrap } from './config/db.js';

const PORT = process.env.PORT || 8001;

// Bootstrap database tables on startup
bootstrap()
    .then(() => {
        console.log('Database tables bootstrapped successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to bootstrap database. Starting server anyway...', err);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (Database not connected)`);
        });
    });
