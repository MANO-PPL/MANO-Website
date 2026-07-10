import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads/resumes');
const jdUploadDir = path.join(__dirname, '../../uploads/careers/jds');

// Create upload directories if they do not exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(jdUploadDir)) {
    fs.mkdirSync(jdUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const jdStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, jdUploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_');
        cb(null, `${uniqueSuffix}-${baseName}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf' || ext === '.doc' || ext === '.docx') {
        cb(null, true);
    } else {
        cb(new Error('Only .pdf, .doc, and .docx files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

export const uploadJD = multer({
    storage: jdStorage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

const blogImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../uploads/blogs');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_');
        cb(null, `${uniqueSuffix}-${baseName}${ext}`);
    }
});

const blogImageFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp' || ext === '.gif') {
        cb(null, true);
    } else {
        cb(new Error('Only image files (.jpg, .jpeg, .png, .webp, .gif) are allowed!'), false);
    }
};

export const uploadBlogImage = multer({
    storage: blogImageStorage,
    fileFilter: blogImageFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

export default upload;
