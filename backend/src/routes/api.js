import express from 'express';
import { submitEnquiry } from '../controllers/enquiryController.js';
import { submitResume, getResumes, deleteResume, viewResume } from '../controllers/resumeController.js';
import { getJobs, createJob, updateJob, toggleJobStatus, deleteJob, viewJD } from '../controllers/jobsController.js';
import { verifyAdminToken } from '../middleware/auth.js';
import upload, { uploadJD, uploadBlogImage } from '../middleware/multer.js';
import { ManoWebDB, verifyPassword } from '../config/database.js';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogsController.js';

const router = express.Router();

// Enquiries and Career resume uploads
router.post('/enquiry_api/enquiry', submitEnquiry);
router.post('/:platform/resume-upload/upload', upload.single('resume_file'), submitResume);
router.post('/resume-upload/upload', upload.single('resume_file'), submitResume);
router.get('/resumes/view/:filename', viewResume);
router.get('/jds/view/:filename', viewJD);

// Public jobs list endpoint (loaded dynamically on the careers page)
router.get('/:platform/jobs', getJobs);
router.get('/jobs', getJobs);

// Public blogs endpoints
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);

// Admin Login Authentication
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ ok: false, message: 'Username and password are required' });
        }
        
        // Query users table
        const user = await ManoWebDB('users')
            .where({ username: username.trim() })
            .first();
            
        if (!user) {
            return res.status(401).json({ ok: false, message: 'Invalid username or password' });
        }
        
        // Verify hashed password
        const isPasswordValid = verifyPassword(password.trim(), user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ ok: false, message: 'Invalid username or password' });
        }
        
        const adminToken = process.env.ADMIN_TOKEN || 'mano-admin-secure-token-2026';
        return res.status(200).json({ ok: true, token: adminToken });
    } catch (error) {
        console.error('Login database verification failed:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
});

// Protected Admin Actions: Jobs CRUD
router.post('/:platform/jobs', verifyAdminToken, uploadJD.single('jd_file'), createJob);
router.post('/jobs', verifyAdminToken, uploadJD.single('jd_file'), createJob);
router.put('/:platform/jobs/:id', verifyAdminToken, uploadJD.single('jd_file'), updateJob);
router.put('/jobs/:id', verifyAdminToken, uploadJD.single('jd_file'), updateJob);
router.patch('/:platform/jobs/:id/toggle', verifyAdminToken, toggleJobStatus);
router.patch('/jobs/:id/toggle', verifyAdminToken, toggleJobStatus);
router.delete('/:platform/jobs/:id', verifyAdminToken, deleteJob);
router.delete('/jobs/:id', verifyAdminToken, deleteJob);

// Protected Admin Actions: Blogs CRUD
router.post('/blogs', verifyAdminToken, uploadBlogImage.single('blog_image'), createBlog);
router.put('/blogs/:id', verifyAdminToken, uploadBlogImage.single('blog_image'), updateBlog);
router.delete('/blogs/:id', verifyAdminToken, deleteBlog);

// Protected Admin Actions: Candidate applications
router.get('/admin/:platform/resumes', verifyAdminToken, getResumes);
router.get('/admin/resumes', verifyAdminToken, getResumes);
router.delete('/admin/resumes/:id', verifyAdminToken, deleteResume);

export default router;
