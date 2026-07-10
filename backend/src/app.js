import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import errorHandler from './middleware/errorHandler.js';
import { isDbReady } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS with default settings or origins from env
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Dynamically allow any localhost or 127.0.0.1 origin on any port for local development
        const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        
        if (isLocalhost || allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded resumes statically — __dirname = backend/src, so ../uploads = backend/uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



// Register API routes
app.use('/api', apiRoutes);

// Catch-all 404 response
app.use((req, res, next) => {
    res.status(404).json({
        ok: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Error handling middleware
app.use(errorHandler);

export default app;
