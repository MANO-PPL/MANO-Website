import { query } from '../config/db.js';

export const submitResume = async (req, res, next) => {
    try {
        const { name, email, job_role } = req.body;

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

        const role = job_role ? job_role.trim() : 'General Application';
        const fileName = req.file.originalname;
        const filePath = req.file.path.replace(/\\/g, '/'); // normalize backslashes for all OS compatibility

        const insertQuery = `
            INSERT INTO resumes (name, email, job_role, file_name, file_path)
            VALUES ($1, $2, $3, $4, $5)
        `;

        await query(insertQuery, [
            name.trim(),
            email.trim().toLowerCase(),
            role,
            fileName,
            filePath
        ]);

        return res.status(200).json({
            ok: true,
            message: 'Application submitted successfully'
        });
    } catch (error) {
        next(error);
    }
};
