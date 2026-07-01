import multer from 'multer';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                ok: false,
                message: 'File size exceeds 50MB limit.'
            });
        }
        return res.status(400).json({
            ok: false,
            message: err.message
        });
    }

    if (err.message === 'Only .pdf, .doc, and .docx files are allowed!') {
        return res.status(400).json({
            ok: false,
            message: err.message
        });
    }

    // Default error
    return res.status(500).json({
        ok: false,
        message: err.message || 'Internal server error'
    });
};

export default errorHandler;
