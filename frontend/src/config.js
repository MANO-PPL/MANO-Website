export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ENQUIRY_API_URL = `${API_BASE_URL}/api/enquiry_api/enquiry`;
export const RESUME_API_URL = `${API_BASE_URL}/api/resume-upload/upload`;
export const JOBS_API_URL = `${API_BASE_URL}/api/jobs`;
export const ADMIN_RESUMES_API_URL = `${API_BASE_URL}/api/mano-admin-portal-dashboard-secure/resumes`;
export const ADMIN_LOGIN_API_URL = `${API_BASE_URL}/api/mano-admin-portal-dashboard-secure/login`;
export const ADMIN_JOBS_API_URL = `${API_BASE_URL}/api/jobs`;
export const BLOGS_API_URL = `${API_BASE_URL}/api/blogs`;
export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const PROJECTS_ADMIN_API_URL = `${API_BASE_URL}/api/projects-admin/all`;
export const ADMIN_ENQUIRIES_API_URL = `${API_BASE_URL}/api/mano-admin-portal-dashboard-secure/enquiries`;
export const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL || 'https://mano-static-website.s3.us-east-1.amazonaws.com';

