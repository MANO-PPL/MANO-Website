import express from 'express';
import { submitEnquiry } from '../controllers/enquiryController.js';
import { submitResume } from '../controllers/resumeController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/enquiry_api/enquiry', submitEnquiry);
router.post('/resume-upload/upload', upload.single('resume_file'), submitResume);

export default router;
