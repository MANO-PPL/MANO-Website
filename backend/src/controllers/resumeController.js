import { query } from '../config/database.js';
import { uploadFileToS3, deleteFileFromS3, getS3ObjectStream } from '../services/uploadService.js';
import path from 'path';
import fs from 'fs';

export const submitResume = async (req, res, next) => {
    try {
        const { name, email, job_role, job_id, platform } = req.body;

        // Basic server-side validations
        if (!name || !name.trim()) {
            return res.status(400).json({ ok: false, message: 'Full name is required' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ ok: false, message: 'Email address is required' });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ ok: false, message: 'A valid email address is required' });
        }
        if (!req.file) {
            return res.status(400).json({ ok: false, message: 'Resume file is required' });
        }

        let role = job_role ? job_role.trim() : 'General Application';
        let finalPlatform = (req.params.platform || platform || 'pmc').trim().toLowerCase();

        // Auto-detect and clean up legacy EPC suffix if present
        if (role.endsWith(' (EPC)')) {
            role = role.replace(' (EPC)', '');
            finalPlatform = 'epc';
        }

        let finalJobId = null;
        if (role !== 'General Application') {
            finalJobId = job_id ? parseInt(job_id) : null;
            if (finalJobId) {
                const jobQuery = `SELECT id, title, platform FROM jobs WHERE id = $1`;
                const jobResult = await query(jobQuery, [finalJobId]);
                if (jobResult.rows && jobResult.rows.length > 0) {
                    const job = jobResult.rows[0];
                    role = job.title;
                    finalPlatform = job.platform;
                } else {
                    finalJobId = null;
                }
            } else {
                // Auto-associate based on title and platform fallback if job_id was not explicitly sent
                const findJobQuery = `SELECT id FROM jobs WHERE title = $1 AND platform = $2 LIMIT 1`;
                const findJobResult = await query(findJobQuery, [role, finalPlatform]);
                if (findJobResult.rows && findJobResult.rows.length > 0) {
                    finalJobId = findJobResult.rows[0].id;
                }
            }
        }

        const fileName = req.file.originalname;
        const filePath = await uploadFileToS3(req.file, `${finalPlatform}/resume`);

        const insertQuery = `
            INSERT INTO resumes (name, email, job_role, job_id, file_name, file_path, platform)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        await query(insertQuery, [
            name.trim(),
            email.trim().toLowerCase(),
            role,
            finalJobId,
            fileName,
            filePath,
            finalPlatform
        ]);

        return res.status(200).json({
            ok: true,
            message: 'Application submitted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Admin: Get all candidate resumes
export const getResumes = async (req, res, next) => {
    try {
        const platform = req.params.platform || req.query.platform;
        let selectQuery = `
            SELECT r.id, r.name, r.email, r.file_name, r.file_path, r.platform, r.created_at, r.job_id,
                   COALESCE(j.title, r.job_role) AS job_role
            FROM resumes r
            LEFT JOIN jobs j ON r.job_id = j.id
        `;
        const params = [];

        if (platform) {
            selectQuery += ` WHERE r.platform = $1`;
            params.push(platform.trim().toLowerCase());
        }

        selectQuery += ` ORDER BY r.id DESC`;
        const result = await query(selectQuery, params);
        return res.status(200).json({ ok: true, data: result.rows || [] });
    } catch (error) {
        next(error);
    }
};

// Admin: Delete candidate resume submission
export const deleteResume = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find file path to delete from disk
        const findQuery = `SELECT file_path FROM resumes WHERE id = $1`;
        const findResult = await query(findQuery, [id]);
        if (!findResult.rows || findResult.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Candidate application not found' });
        }

        const filePath = findResult.rows[0].file_path;

        // Delete from DB first
        const deleteQuery = `DELETE FROM resumes WHERE id = $1`;
        await query(deleteQuery, [id]);

        // Try to delete file from S3 or disk
        if (filePath) {
            await deleteFileFromS3(filePath);
        }

        return res.status(200).json({ ok: true, message: 'Application deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Admin: Securely view/stream candidate resume files (handles private S3 access & local files fallback)
export const viewResume = async (req, res, next) => {
    try {
        const { filename } = req.params;
        
        // Find the resume entry in database to get the exact file path
        const dbResult = await query(
            `SELECT file_path FROM resumes WHERE file_path LIKE $1 OR file_path LIKE $2 LIMIT 1`,
            [`%/${filename}`, `%\\${filename}`]
        );

        let fileUrlOrPath = null;
        if (dbResult.rows && dbResult.rows.length > 0) {
            fileUrlOrPath = dbResult.rows[0].file_path;
        }

        // 1. Try S3 first
        let s3Streamed = false;
        if (fileUrlOrPath && fileUrlOrPath.includes('amazonaws.com')) {
            try {
                const urlParts = fileUrlOrPath.split('.com/');
                if (urlParts.length > 1) {
                    const key = decodeURIComponent(urlParts[1]);
                    const s3Response = await getS3ObjectStream(key);
                    if (s3Response) {
                        res.setHeader('Content-Type', s3Response.ContentType || 'application/pdf');
                        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
                        s3Response.Body.pipe(res);
                        s3Streamed = true;
                        return;
                    }
                }
            } catch (s3Err) {
                // Ignore S3 errors and let it try the fallback
            }
        }

        // Fallback for legacy resumes if not streamed from DB path
        if (!s3Streamed) {
            const legacyKeys = [
                `${filename}`, // Check root/raw filename
                `pmc/resume/${filename}`,
                `epc/resume/${filename}`,
                `careers/pmc/resumes/${filename}`,
                `careers/epc/resumes/${filename}`,
                `careers/resume/${filename}`
            ];
            for (const key of legacyKeys) {
                try {
                    const s3Response = await getS3ObjectStream(key);
                    if (s3Response) {
                        res.setHeader('Content-Type', s3Response.ContentType || 'application/pdf');
                        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
                        s3Response.Body.pipe(res);
                        return;
                    }
                } catch (s3Err) {
                    // Try next key
                }
            }
        }

        // 2. Local fallback paths
        const pathsToTry = [];
        if (fileUrlOrPath && !fileUrlOrPath.includes('amazonaws.com')) {
            pathsToTry.push(fileUrlOrPath);
            pathsToTry.push(path.join(process.cwd(), fileUrlOrPath));
            pathsToTry.push(path.join(process.cwd(), 'backend', fileUrlOrPath));
        }

        pathsToTry.push(
            path.join(process.cwd(), 'uploads/resumes', filename),
            path.join(process.cwd(), 'backend/uploads/resumes', filename),
            path.join(process.cwd(), 'backend/src/uploads/resumes', filename)
        );
        
        for (const filePath of pathsToTry) {
            try {
                if (fs.existsSync(filePath)) {
                    let contentType = 'application/pdf';
                    const ext = path.extname(filename).toLowerCase();
                    if (ext === '.doc') contentType = 'application/msword';
                    else if (ext === '.docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    
                    res.setHeader('Content-Type', contentType);
                    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
            } catch (err) {
                console.error(`Error reading local fallback file at ${filePath}:`, err);
            }
        }

        return res.status(404).json({ ok: false, message: 'Resume file not found' });
    } catch (error) {
        next(error);
    }
};
