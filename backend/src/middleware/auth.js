export const verifyAdminToken = (req, res, next) => {
    const token = req.headers['x-admin-token'];
    const expectedToken = process.env.ADMIN_TOKEN || 'mano-admin-secure-token-2026';
    
    if (token && token === expectedToken) {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Unauthorized: Invalid or missing admin token'
        });
    }
};
