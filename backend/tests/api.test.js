import { jest } from '@jest/globals';
import dotenv from 'dotenv';
dotenv.config();

// Mock the DB module before importing the app
jest.unstable_mockModule('../src/config/db.js', () => ({
    query: jest.fn().mockImplementation(async (text, params) => {
        return { rows: [] };
    }),
    bootstrap: jest.fn().mockImplementation(async () => {})
}));

const { default: app } = await import('../src/app.js');
import request from 'supertest';

describe('API Endpoints Test Suite', () => {
    describe('POST /api/enquiry_api/enquiry', () => {
        it('should return 400 if name is missing', async () => {
            const res = await request(app)
                .post('/api/enquiry_api/enquiry')
                .send({
                    email: 'test@mano.co.in',
                    service_required: 'Project Management'
                });
            
            expect(res.status).toBe(400);
            expect(res.body.ok).toBe(false);
            expect(res.body.message).toContain('name is required');
        });

        it('should return 400 if email is invalid', async () => {
            const res = await request(app)
                .post('/api/enquiry_api/enquiry')
                .send({
                    name: 'Test User',
                    email: 'invalid-email',
                    service_required: 'Project Management'
                });
            
            expect(res.status).toBe(400);
            expect(res.body.ok).toBe(false);
            expect(res.body.message).toContain('valid email address');
        });

        it('should return 200 on successful submission', async () => {
            const res = await request(app)
                .post('/api/enquiry_api/enquiry')
                .send({
                    name: 'John Doe',
                    email: 'john@example.com',
                    company_name: 'Acme Corp',
                    contact_whatsapp: '1234567890',
                    service_required: 'Project Management',
                    project_details: 'Need PMC service for a high-rise tower.'
                });
            
            expect(res.status).toBe(200);
            expect(res.body.ok).toBe(true);
            expect(res.body.message).toContain('Enquiry submitted successfully');
        });
    });

    describe('POST /api/resume-upload/upload', () => {
        it('should return 400 if file is missing', async () => {
            const res = await request(app)
                .post('/api/resume-upload/upload')
                .field('name', 'Applicant User')
                .field('email', 'applicant@example.com')
                .field('job_role', 'Project Manager');
            
            expect(res.status).toBe(400);
            expect(res.body.ok).toBe(false);
            expect(res.body.message).toContain('file is required');
        });

        it('should return 400 if file extension is forbidden', async () => {
            const res = await request(app)
                .post('/api/resume-upload/upload')
                .field('name', 'Applicant User')
                .field('email', 'applicant@example.com')
                .field('job_role', 'Project Manager')
                .attach('resume_file', Buffer.from('test contents'), 'resume.exe');
            
            expect(res.status).toBe(400);
            expect(res.body.ok).toBe(false);
            expect(res.body.message).toContain('Only .pdf, .doc, and .docx files are allowed!');
        });

        it('should return 200 on successful resume upload', async () => {
            const res = await request(app)
                .post('/api/resume-upload/upload')
                .field('name', 'Jane Doe')
                .field('email', 'jane@example.com')
                .field('job_role', 'Project Planning Engineer')
                .attach('resume_file', Buffer.from('PDF content mock'), 'my-resume.pdf');
            
            expect(res.status).toBe(200);
            expect(res.body.ok).toBe(true);
            expect(res.body.message).toContain('Application submitted successfully');
        });
    });
});
