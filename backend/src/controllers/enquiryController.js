import { query } from '../config/database.js';

export const submitEnquiry = async (req, res, next) => {
    try {
        const { name, email, company_name, contact_whatsapp, service_required, project_details } = req.body;

        // Validations
        if (!name || !name.trim()) {
            return res.status(400).json({ ok: false, message: 'Full name is required' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ ok: false, message: 'Email address is required' });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ ok: false, message: 'A valid email address is required' });
        }
        if (!service_required || !service_required.trim()) {
            return res.status(400).json({ ok: false, message: 'Service required is required' });
        }

        const insertQuery = `
            INSERT INTO enquiries (name, email, company_name, contact_whatsapp, service_required, project_details)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        await query(insertQuery, [
            name.trim(),
            email.trim().toLowerCase(),
            company_name ? company_name.trim() : null,
            contact_whatsapp ? contact_whatsapp.trim() : null,
            service_required.trim(),
            project_details ? project_details.trim() : null
        ]);

        return res.status(200).json({
            ok: true,
            message: 'Enquiry submitted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Admin: Get all enquiries
export const getEnquiries = async (req, res, next) => {
    try {
        const selectQuery = `
            SELECT id, name, email, company_name, contact_whatsapp, service_required, project_details, created_at
            FROM enquiries
            ORDER BY id DESC
        `;
        const result = await query(selectQuery);
        return res.status(200).json({ ok: true, data: result.rows || [] });
    } catch (error) {
        next(error);
    }
};

// Admin: Delete an enquiry
export const deleteEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteQuery = `DELETE FROM enquiries WHERE id = $1`;
        await query(deleteQuery, [id]);
        return res.status(200).json({ ok: true, message: 'Enquiry deleted successfully' });
    } catch (error) {
        next(error);
    }
};

