import React, { useState, useEffect, useRef } from 'react';
import { 
    X, Mail, Phone, Calendar, Download, ChevronRight, 
    FileText, Eye, Star, Award, MapPin, AlertTriangle 
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    API_BASE_URL,
    ADMIN_RESUMES_API_URL,
    ADMIN_JOBS_API_URL,
    BLOGS_API_URL,
    PROJECTS_API_URL,
    PROJECTS_ADMIN_API_URL,
    ADMIN_ENQUIRIES_API_URL
} from '../../config';

import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import CareersTab from './tabs/CareersTab';
import BlogsTab from './tabs/BlogsTab';
import ProjectsTab from './tabs/ProjectsTab';
import EnquiriesTab from './tabs/EnquiriesTab';

import JobModal from './modals/JobModal';
import BlogModal from './modals/BlogModal';
import ProjectModal from './modals/ProjectModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

const ADMIN_PROJECTS_BASE_URL = PROJECTS_ADMIN_API_URL || PROJECTS_API_URL;

const AdminDashboard = ({ token, onLogout }) => {
    // Active Navigation Tabs
    const [activeTab, setActiveTab] = useState('pmc-careers');
    const [subTab, setSubTab] = useState('jobs');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Candidates State
    const [candidates, setCandidates] = useState([]);
    const [candidatesLoading, setCandidatesLoading] = useState(false);
    const [candidateSearch, setCandidateSearch] = useState('');
    const [candidateRoleFilter, setCandidateRoleFilter] = useState('All');
    const [viewingCandidate, setViewingCandidate] = useState(null);
    const [remarksText, setRemarksText] = useState('');
    const [savingRemarks, setSavingRemarks] = useState(false);

    // Jobs State
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [jobSearch, setJobSearch] = useState('');
    const [jobLocationFilter, setJobLocationFilter] = useState('All');
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [currentEditingJob, setCurrentEditingJob] = useState(null);
    const [isSavingJob, setIsSavingJob] = useState(false);
    const [viewingJob, setViewingJob] = useState(null);

    // Job Form State
    const [jobForm, setJobForm] = useState({
        title: '',
        qualification: '',
        location: '',
        gender: 'Any',
        status: 'active',
        platform: 'pmc',
        jd_file: null,
        jd_file_path: '',
        remove_jd: false
    });

    // Blogs State
    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(false);
    const [blogSearch, setBlogSearch] = useState('');
    const [blogCategoryFilter, setBlogCategoryFilter] = useState('All');
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [currentEditingBlog, setCurrentEditingBlog] = useState(null);
    const [isSavingBlog, setIsSavingBlog] = useState(false);
    const [viewingBlog, setViewingBlog] = useState(null);

    // Projects State
    const [projects, setProjects] = useState([]);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [projectSearch, setProjectSearch] = useState('');
    const [projectStatusFilter, setProjectStatusFilter] = useState('All');
    const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [currentEditingProject, setCurrentEditingProject] = useState(null);
    const [isSavingProject, setIsSavingProject] = useState(false);
    const projectImageInputRef = useRef(null);

    // Enquiries State
    const [enquiries, setEnquiries] = useState([]);
    const [enquiriesLoading, setEnquiriesLoading] = useState(false);
    const [enquirySearch, setEnquirySearch] = useState('');
    const [enquiryServiceFilter, setEnquiryServiceFilter] = useState('All');
    const [viewingEnquiry, setViewingEnquiry] = useState(null);

    // Deletion Modal States
    const [deleteConfirmJob, setDeleteConfirmJob] = useState(null);
    const [isDeletingJob, setIsDeletingJob] = useState(false);

    const [deleteConfirmCandidate, setDeleteConfirmCandidate] = useState(null);
    const [isDeletingCandidate, setIsDeletingCandidate] = useState(false);

    const [deleteConfirmBlog, setDeleteConfirmBlog] = useState(null);
    const [isDeletingBlog, setIsDeletingBlog] = useState(false);

    const [deleteConfirmProject, setDeleteConfirmProject] = useState(null);
    const [isDeletingProject, setIsDeletingProject] = useState(false);

    const [deleteConfirmEnquiry, setDeleteConfirmEnquiry] = useState(null);
    const [isDeletingEnquiry, setIsDeletingEnquiry] = useState(false);

    // Blog Form State
    const [blogForm, setBlogForm] = useState({
        title: '',
        summary: '',
        author: '',
        author_role: '',
        category: 'Project Management',
        read_time: '',
        image: '',
        featured: false,
        tags: '',
        sections: [{ heading: '', body: '' }],
        keyTakeaways: '',
        blog_image: null
    });

    // Project Form State
    const [projectForm, setProjectForm] = useState({
        title: '',
        location: '',
        category: 'Commercial',
        scope: 'PMC - Project Management Consultants',
        highlight: '',
        featured: false,
        status: 'active',
        display_order: 0,
        existingImages: [],
        newImageFiles: [],
        removedImages: []
    });

    const headers = {
        'Content-Type': 'application/json',
        'x-admin-token': token
    };

    useEffect(() => {
        if (viewingCandidate) {
            setRemarksText(viewingCandidate.remarks || '');
        } else {
            setRemarksText('');
        }
    }, [viewingCandidate]);

    const handleSaveRemarks = async () => {
        if (!viewingCandidate) return;
        setSavingRemarks(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/mano-admin-portal-dashboard-secure/resumes/${viewingCandidate.id}/remarks`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-token': token
                },
                body: JSON.stringify({ remarks: remarksText })
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Remarks updated successfully');
                setCandidates(prev => prev.map(c => c.id === viewingCandidate.id ? { ...c, remarks: remarksText } : c));
                setViewingCandidate(prev => prev ? { ...prev, remarks: remarksText } : null);
            } else {
                toast.error(data.message || 'Failed to update remarks.');
            }
        } catch (error) {
            console.error('Update remarks error:', error);
            toast.error('Unable to connect to candidate server.');
        } finally {
            setSavingRemarks(false);
        }
    };

    // Load Data
    const fetchCandidates = async (platform) => {
        setCandidatesLoading(true);
        try {
            const url = platform 
                ? `${API_BASE_URL}/api/mano-admin-portal-dashboard-secure/${platform}/resumes` 
                : ADMIN_RESUMES_API_URL;
            const response = await fetch(url, { headers });
            const data = await response.json();
            if (response.ok && data.ok) {
                setCandidates(data.data || []);
            } else {
                toast.error(data.message || 'Failed to load candidates.');
            }
        } catch (error) {
            console.error('Fetch candidates error:', error);
            toast.error('Unable to connect to candidate server.');
        } finally {
            setCandidatesLoading(false);
        }
    };

    const fetchJobs = async (platform) => {
        setJobsLoading(true);
        try {
            const url = platform 
                ? `${API_BASE_URL}/api/${platform}/jobs?all=true` 
                : `${ADMIN_JOBS_API_URL}?all=true`;
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok && data.ok) {
                const filtered = (data.data || []).filter(job => job.title !== "Position" && job.title);
                setJobs(filtered);
            } else {
                toast.error(data.message || 'Failed to load jobs.');
            }
        } catch (error) {
            console.error('Fetch jobs error:', error);
            toast.error('Unable to connect to jobs server.');
        } finally {
            setJobsLoading(false);
        }
    };

    const fetchBlogs = async () => {
        setBlogsLoading(true);
        try {
            const response = await fetch(BLOGS_API_URL);
            const data = await response.json();
            if (response.ok && data.ok) {
                setBlogs(data.data || []);
            } else {
                toast.error(data.message || 'Failed to load blogs.');
            }
        } catch (error) {
            console.error('Fetch blogs error:', error);
            toast.error('Unable to connect to blogs server.');
        } finally {
            setBlogsLoading(false);
        }
    };

    const fetchProjects = async () => {
        setProjectsLoading(true);
        try {
            const response = await fetch(PROJECTS_ADMIN_API_URL, { headers });
            const data = await response.json();
            if (response.ok && data.ok) {
                setProjects(data.data || []);
            } else {
                toast.error(data.message || 'Failed to load projects.');
            }
        } catch (error) {
            console.error('Fetch projects error:', error);
            toast.error('Unable to connect to projects server.');
        } finally {
            setProjectsLoading(false);
        }
    };

    const fetchEnquiries = async () => {
        setEnquiriesLoading(true);
        try {
            const response = await fetch(ADMIN_ENQUIRIES_API_URL, { headers });
            const data = await response.json();
            if (response.ok && data.ok) {
                setEnquiries(data.data || []);
            } else {
                toast.error(data.message || 'Failed to load client enquiries.');
            }
        } catch (error) {
            console.error('Fetch enquiries error:', error);
            toast.error('Unable to connect to enquiries server.');
        } finally {
            setEnquiriesLoading(false);
        }
    };

    const confirmDeleteEnquiry = async () => {
        if (!deleteConfirmEnquiry) return;
        setIsDeletingEnquiry(true);
        try {
            const response = await fetch(`${ADMIN_ENQUIRIES_API_URL}/${deleteConfirmEnquiry.id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Enquiry deleted successfully.');
                setEnquiries(prev => prev.filter(e => e.id !== deleteConfirmEnquiry.id));
                if (viewingEnquiry?.id === deleteConfirmEnquiry.id) setViewingEnquiry(null);
                setDeleteConfirmEnquiry(null);
            } else {
                toast.error(data.message || 'Failed to delete enquiry.');
            }
        } catch (error) {
            console.error('Delete enquiry error:', error);
            toast.error('Unable to connect to enquiries server.');
        } finally {
            setIsDeletingEnquiry(false);
        }
    };

    useEffect(() => {
        if (token) {
            const currentPlatform = activeTab === 'pmc-careers' ? 'pmc' : activeTab === 'epc-careers' ? 'epc' : null;
            if (currentPlatform) {
                fetchJobs(currentPlatform);
                fetchCandidates(currentPlatform);
            } else if (activeTab === 'blogs') {
                fetchBlogs();
            } else if (activeTab === 'projects') {
                fetchProjects();
            } else if (activeTab === 'enquiries') {
                fetchEnquiries();
            }
        }
    }, [activeTab, token]);

    // Handle Candidates delete
    const handleDeleteCandidate = (candidate) => {
        setDeleteConfirmCandidate(candidate);
    };

    const confirmDeleteCandidate = async () => {
        if (!deleteConfirmCandidate) return;
        setIsDeletingCandidate(true);
        try {
            const response = await fetch(`${ADMIN_RESUMES_API_URL}/${deleteConfirmCandidate.id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Application deleted successfully.');
                setCandidates(candidates.filter(c => c.id !== deleteConfirmCandidate.id));
                if (viewingCandidate?.id === deleteConfirmCandidate.id) setViewingCandidate(null);
                setDeleteConfirmCandidate(null);
            } else {
                toast.error(data.message || 'Failed to delete application.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Server error deleting candidate.');
        } finally {
            setIsDeletingCandidate(false);
        }
    };

    const handlePlatformToggle = (p) => {
        let platforms = jobForm.platform ? jobForm.platform.split(',') : [];
        if (platforms.includes(p)) {
            if (platforms.length > 1) {
                platforms = platforms.filter(x => x !== p);
            }
        } else {
            platforms.push(p);
        }
        const ordered = [];
        if (platforms.includes('pmc')) ordered.push('pmc');
        if (platforms.includes('epc')) ordered.push('epc');
        setJobForm({ ...jobForm, platform: ordered.join(',') });
    };

    // Handle Jobs Form submit
    const handleJobSubmit = async (e) => {
        e.preventDefault();
        if (!jobForm.title.trim()) {
            toast.warn('Job Title is required.');
            return;
        }

        const isEditing = !!currentEditingJob;
        const targetPlatform = (jobForm.platform || 'pmc').toLowerCase();
        const url = isEditing 
            ? `${API_BASE_URL}/api/jobs/${currentEditingJob.id}` 
            : `${API_BASE_URL}/api/jobs`;
        const method = isEditing ? 'PUT' : 'POST';

        const formData = new FormData();
        formData.append('title', jobForm.title);
        formData.append('qualification', jobForm.qualification || '');
        formData.append('location', jobForm.location || '');
        formData.append('gender', jobForm.gender || 'Any');
        formData.append('status', jobForm.status || 'active');
        formData.append('platform', targetPlatform);
        formData.append('remove_jd', jobForm.remove_jd ? 'true' : 'false');
        if (jobForm.jd_file) {
            formData.append('jd_file', jobForm.jd_file);
        }

        setIsSavingJob(true);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'x-admin-token': token
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success(isEditing ? 'Job opening updated!' : 'Job opening created!');
                setIsJobModalOpen(false);
                resetJobForm();
                const currentPlatform = activeTab === 'pmc-careers' ? 'pmc' : activeTab === 'epc-careers' ? 'epc' : null;
                fetchJobs(currentPlatform);
                if (isEditing && currentEditingJob.platform !== targetPlatform) {
                    const otherPlatform = targetPlatform === 'pmc' ? 'epc' : 'pmc';
                    fetchJobs(otherPlatform);
                }
            } else {
                toast.error(data.message || 'Failed to save job opening.');
            }
        } catch (error) {
            console.error('Save job error:', error);
            toast.error('Server error saving job.');
        } finally {
            setIsSavingJob(false);
        }
    };

    const handleToggleJobStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
        try {
            const response = await fetch(`${ADMIN_JOBS_API_URL}/${id}/toggle`, {
                method: 'PATCH',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success(`Job opening status updated to ${newStatus}.`);
                setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
            } else {
                toast.error(data.message || 'Failed to update job status.');
            }
        } catch (error) {
            console.error('Toggle status error:', error);
            toast.error('Server error updating status.');
        }
    };

    const handleDeleteJob = (job) => {
        setDeleteConfirmJob(job);
    };

    const confirmDeleteJob = async () => {
        if (!deleteConfirmJob) return;
        setIsDeletingJob(true);
        try {
            const platform = (deleteConfirmJob.platform || 'pmc').toLowerCase();
            const response = await fetch(`${API_BASE_URL}/api/${platform}/jobs/${deleteConfirmJob.id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                setJobs(jobs.filter(j => j.id !== deleteConfirmJob.id));
                setDeleteConfirmJob(null);
                toast.success(`"${deleteConfirmJob.title}" deleted successfully.`);
            } else {
                toast.error(data.message || 'Failed to delete job opening.');
            }
        } catch (error) {
            console.error('Delete job error:', error);
            toast.error('Server error. Could not delete job opening.');
        } finally {
            setIsDeletingJob(false);
        }
    };

    const openCreateModal = () => {
        setCurrentEditingJob(null);
        setJobForm({
            title: '',
            qualification: '',
            location: '',
            gender: 'Any',
            status: 'active',
            platform: activeTab === 'epc-careers' ? 'epc' : 'pmc',
            jd_file: null,
            jd_file_path: '',
            remove_jd: false
        });
        setIsJobModalOpen(true);
    };

    const openEditModal = (job) => {
        setCurrentEditingJob(job);
        setJobForm({
            title: job.title || '',
            qualification: job.details?.Qualification || '',
            location: job.details?.Location || '',
            gender: job.details?.Gender || 'Any',
            status: job.status || 'active',
            platform: (job.platform || 'pmc').toLowerCase(),
            jd_file: null,
            jd_file_path: job.jd_file_path || '',
            remove_jd: false
        });
        setIsJobModalOpen(true);
    };

    const resetJobForm = () => {
        setIsJobModalOpen(false);
        setCurrentEditingJob(null);
    };

    // Blogs Handlers
    const resetBlogForm = () => {
        setIsBlogModalOpen(false);
        setCurrentEditingBlog(null);
        setBlogForm({
            title: '',
            summary: '',
            author: '',
            author_role: '',
            category: 'Project Management',
            read_time: '',
            image: '',
            featured: false,
            tags: '',
            sections: [{ heading: '', body: '' }],
            keyTakeaways: '',
            blog_image: null
        });
    };

    const openCreateBlogModal = () => {
        setCurrentEditingBlog(null);
        setBlogForm({
            title: '',
            summary: '',
            author: '',
            author_role: '',
            category: 'Project Management',
            read_time: '',
            image: '',
            featured: false,
            tags: '',
            sections: [{ heading: '', body: '' }],
            keyTakeaways: '',
            blog_image: null
        });
        setIsBlogModalOpen(true);
    };

    const openEditBlogModal = (blog) => {
        setCurrentEditingBlog(blog);
        setBlogForm({
            title: blog.title || '',
            summary: blog.summary || '',
            author: blog.author || '',
            author_role: blog.author_role || '',
            category: blog.category || 'Project Management',
            read_time: blog.read_time || '',
            image: blog.image || '',
            featured: !!blog.featured,
            tags: (blog.tags || []).join(', '),
            sections: blog.content?.sections?.length > 0 
                ? blog.content.sections.map(s => ({ heading: s.heading || '', body: s.body || '' }))
                : [{ heading: '', body: '' }],
            keyTakeaways: (blog.content?.keyTakeaways || []).join('\n'),
            blog_image: null
        });
        setIsBlogModalOpen(true);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        if (!blogForm.title.trim()) {
            toast.warn('Blog Title is required.');
            return;
        }

        const isEditing = !!currentEditingBlog;
        const url = isEditing 
            ? `${BLOGS_API_URL}/${currentEditingBlog.id}` 
            : BLOGS_API_URL;
        const method = isEditing ? 'PUT' : 'POST';

        const tagsArray = blogForm.tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean);

        const keyTakeawaysArray = blogForm.keyTakeaways
            .split('\n')
            .map(t => t.trim())
            .filter(Boolean);

        const formData = new FormData();
        formData.append('title', blogForm.title.trim());
        formData.append('summary', blogForm.summary.trim());
        formData.append('author', blogForm.author.trim());
        formData.append('author_role', blogForm.author_role.trim());
        formData.append('category', blogForm.category);
        formData.append('read_time', blogForm.read_time.trim());
        formData.append('image', blogForm.image.trim());
        formData.append('featured', blogForm.featured ? 'true' : 'false');
        formData.append('tags', JSON.stringify(tagsArray));
        formData.append('content', JSON.stringify({
            sections: blogForm.sections.filter(s => s.heading.trim() || s.body.trim()),
            keyTakeaways: keyTakeawaysArray
        }));

        if (blogForm.blog_image) {
            formData.append('blog_image', blogForm.blog_image);
        }

        setIsSavingBlog(true);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'x-admin-token': token
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success(isEditing ? 'Blog post updated!' : 'Blog post created!');
                resetBlogForm();
                fetchBlogs();
            } else {
                toast.error(data.message || 'Failed to save blog post.');
            }
        } catch (error) {
            console.error('Save blog error:', error);
            toast.error('Server error saving blog.');
        } finally {
            setIsSavingBlog(false);
        }
    };

    const handleDeleteBlog = (blog) => {
        setDeleteConfirmBlog(blog);
    };

    const confirmDeleteBlog = async () => {
        if (!deleteConfirmBlog) return;
        setIsDeletingBlog(true);
        try {
            const response = await fetch(`${BLOGS_API_URL}/${deleteConfirmBlog.id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Blog post deleted successfully.');
                setBlogs(blogs.filter(b => b.id !== deleteConfirmBlog.id));
                if (viewingBlog?.id === deleteConfirmBlog.id) setViewingBlog(null);
                setDeleteConfirmBlog(null);
            } else {
                toast.error(data.message || 'Failed to delete blog.');
            }
        } catch (error) {
            console.error('Delete blog error:', error);
            toast.error('Server error deleting blog.');
        } finally {
            setIsDeletingBlog(false);
        }
    };

    const addBlogSection = () => {
        setBlogForm({
            ...blogForm,
            sections: [...blogForm.sections, { heading: '', body: '' }]
        });
    };

    const removeBlogSection = (index) => {
        const updated = [...blogForm.sections];
        updated.splice(index, 1);
        setBlogForm({
            ...blogForm,
            sections: updated.length > 0 ? updated : [{ heading: '', body: '' }]
        });
    };

    const updateBlogSection = (index, field, value) => {
        const updated = [...blogForm.sections];
        updated[index][field] = value;
        setBlogForm({ ...blogForm, sections: updated });
    };

    // Projects Handlers
    const resetProjectForm = () => {
        setIsProjectModalOpen(false);
        setCurrentEditingProject(null);
        setProjectForm({
            title: '', location: '', category: 'Commercial',
            scope: 'PMC - Project Management Consultants',
            highlight: '', featured: false, status: 'active',
            display_order: 0, existingImages: [], newImageFiles: [], removedImages: []
        });
    };

    const openCreateProjectModal = () => {
        resetProjectForm();
        setIsProjectModalOpen(true);
    };

    const openEditProjectModal = (project) => {
        setCurrentEditingProject(project);
        setProjectForm({
            title: project.title || '',
            location: project.location || '',
            category: project.category || 'Commercial',
            scope: project.scope || 'PMC - Project Management Consultants',
            highlight: project.highlight || '',
            featured: !!project.featured,
            status: project.status || 'active',
            display_order: project.display_order || 0,
            existingImages: project.images || [],
            newImageFiles: [],
            removedImages: []
        });
        setIsProjectModalOpen(true);
    };

    const handleProjectImageAdd = (e) => {
        const files = Array.from(e.target.files);
        setProjectForm(prev => ({ ...prev, newImageFiles: [...prev.newImageFiles, ...files] }));
        if (projectImageInputRef.current) projectImageInputRef.current.value = '';
    };

    const removeNewProjectImage = (index) => {
        setProjectForm(prev => {
            const updated = [...prev.newImageFiles];
            updated.splice(index, 1);
            return { ...prev, newImageFiles: updated };
        });
    };

    const removeExistingProjectImage = (url) => {
        setProjectForm(prev => ({
            ...prev,
            existingImages: prev.existingImages.filter(img => img !== url),
            removedImages: [...prev.removedImages, url]
        }));
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        if (!projectForm.title.trim()) {
            toast.warn('Project title is required.');
            return;
        }
        const isEditing = !!currentEditingProject;
        const url = isEditing
            ? `${ADMIN_PROJECTS_BASE_URL}/${currentEditingProject.id}`
            : ADMIN_PROJECTS_BASE_URL;
        const method = isEditing ? 'PUT' : 'POST';

        const formData = new FormData();
        formData.append('title', projectForm.title.trim());
        formData.append('location', projectForm.location.trim());
        formData.append('category', projectForm.category);
        formData.append('scope', projectForm.scope.trim());
        formData.append('highlight', projectForm.highlight.trim());
        formData.append('featured', projectForm.featured ? 'true' : 'false');
        formData.append('status', projectForm.status);
        formData.append('display_order', projectForm.display_order);
        formData.append('existing_images', JSON.stringify(projectForm.existingImages));
        if (projectForm.removedImages.length > 0) {
            formData.append('remove_images', JSON.stringify(projectForm.removedImages));
        }
        projectForm.newImageFiles.forEach(file => {
            formData.append('project_images', file);
        });

        setIsSavingProject(true);
        try {
            const response = await fetch(url, {
                method,
                headers: { 'x-admin-token': token },
                body: formData
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success(isEditing ? 'Project updated!' : 'Project created!');
                resetProjectForm();
                fetchProjects();
            } else {
                toast.error(data.message || 'Failed to save project.');
            }
        } catch (error) {
            console.error('Save project error:', error);
            toast.error('Server error saving project.');
        } finally {
            setIsSavingProject(false);
        }
    };

    const confirmDeleteProject = async () => {
        if (!deleteConfirmProject) return;
        setIsDeletingProject(true);
        try {
            const response = await fetch(`${ADMIN_PROJECTS_BASE_URL}/${deleteConfirmProject.id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                setProjects(projects.filter(p => p.id !== deleteConfirmProject.id));
                setDeleteConfirmProject(null);
                toast.success(`"${deleteConfirmProject.title}" deleted.`);
            } else {
                toast.error(data.message || 'Failed to delete project.');
            }
        } catch (error) {
            console.error('Delete project error:', error);
            toast.error('Server error deleting project.');
        } finally {
            setIsDeletingProject(false);
        }
    };

    const handleToggleProjectStatus = async (project) => {
        const newStatus = project.status === 'active' ? 'inactive' : 'active';
        try {
            const formData = new FormData();
            formData.append('status', newStatus);
            formData.append('existing_images', JSON.stringify(project.images || []));
            const response = await fetch(`${ADMIN_PROJECTS_BASE_URL}/${project.id}`, {
                method: 'PUT',
                headers: { 'x-admin-token': token },
                body: formData
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                setProjects(projects.map(p => p.id === project.id ? { ...p, status: newStatus } : p));
                toast.success(`Project "${project.title}" set to ${newStatus}.`);
            } else {
                toast.error(data.message || 'Failed to update project status.');
            }
        } catch (error) {
            console.error('Toggle project status error:', error);
            toast.error('Server error updating project status.');
        }
    };

    const currentPlatform = activeTab === 'pmc-careers' ? 'pmc' : activeTab === 'epc-careers' ? 'epc' : null;

    const stats = {
        totalApplicants: currentPlatform 
            ? candidates.filter(c => c.job_role === 'General Application' || c.platform?.toLowerCase() === currentPlatform).length 
            : candidates.length,
        activeJobs: currentPlatform 
            ? jobs.filter(j => j.platform?.toLowerCase().split(',').includes(currentPlatform)).length 
            : jobs.length,
        pendingReviews: currentPlatform 
            ? candidates.filter(c => c.job_role === 'General Application' || c.platform?.toLowerCase() === currentPlatform).length 
            : candidates.length
    };

    // Filters & Search
    const filteredCandidates = candidates.filter(c => {
        const matchesSearch = c.name?.toLowerCase().includes(candidateSearch.toLowerCase()) || 
                             c.email?.toLowerCase().includes(candidateSearch.toLowerCase());
        const matchesRole = candidateRoleFilter === 'All' || c.job_role === candidateRoleFilter;
        const matchesPlatform = !currentPlatform || 
                                c.job_role === 'General Application' || 
                                c.platform?.toLowerCase() === currentPlatform;
        return matchesSearch && matchesRole && matchesPlatform;
    });

    const filteredJobs = jobs.filter(j => {
        const matchesSearch = j.title?.toLowerCase().includes(jobSearch.toLowerCase());
        const matchesLocation = jobLocationFilter === 'All' || j.details?.Location === jobLocationFilter;
        const matchesPlatform = !currentPlatform || j.platform?.toLowerCase().split(',').includes(currentPlatform);
        return matchesSearch && matchesLocation && matchesPlatform;
    });

    const filteredBlogs = blogs.filter(b => {
        const matchesSearch = b.title?.toLowerCase().includes(blogSearch.toLowerCase()) ||
                             b.summary?.toLowerCase().includes(blogSearch.toLowerCase()) ||
                             b.author?.toLowerCase().includes(blogSearch.toLowerCase());
        const matchesCategory = blogCategoryFilter === 'All' || b.category === blogCategoryFilter;
        return matchesSearch && matchesCategory;
    });

    const filteredProjects = projects.filter(p => {
        const matchesSearch = (p.title || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
                             (p.location || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
                             (p.scope || '').toLowerCase().includes(projectSearch.toLowerCase());
        const matchesStatus = projectStatusFilter === 'All' || p.status === projectStatusFilter;
        return matchesSearch && matchesStatus;
    });

    const projectStatusOptions = [
        { label: 'All Statuses', value: 'All' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ];

    const candidateRoles = ['All', ...new Set(candidates.map(c => c.job_role))];
    const jobLocations = ['All', ...new Set(jobs.map(j => j.details?.Location).filter(Boolean))];
    const blogCategories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

    const getFileLink = (filePath, subFolder = 'resumes') => {
        if (!filePath) return '#';
        const filename = filePath.split('/').pop().split('\\').pop();
        if (subFolder === 'jds') {
            return `${API_BASE_URL}/api/jds/view/${filename}`;
        }
        return `${API_BASE_URL}/api/resumes/view/${filename}`;
    };

    const getResumeLink = (filePath) => {
        if (!filePath) return '#';
        const filename = filePath.split('/').pop().split('\\').pop();
        return `${API_BASE_URL}/api/resumes/view/${filename}`;
    };

    return (
        <div className="min-h-[117.65vh] bg-[#0d1117] text-[#e6edf3]">
            {/* Left Sidebar */}
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setSubTab={setSubTab}
                enquiriesCount={enquiries.length}
                onLogout={onLogout}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Top Navigation Header */}
            <AdminHeader
                activeTab={activeTab}
                onLogout={onLogout}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content Area */}
            <main className="pt-4 px-4 md:px-6 pb-8 md:ml-64 transition-all">
                <div className="w-full space-y-6">
                    {(activeTab === 'pmc-careers' || activeTab === 'epc-careers') && (
                        <CareersTab
                            activeTab={activeTab}
                            subTab={subTab}
                            setSubTab={setSubTab}
                            stats={stats}
                            candidates={candidates}
                            candidatesLoading={candidatesLoading}
                            candidateSearch={candidateSearch}
                            setCandidateSearch={setCandidateSearch}
                            candidateRoleFilter={candidateRoleFilter}
                            setCandidateRoleFilter={setCandidateRoleFilter}
                            candidateRoles={candidateRoles}
                            filteredCandidates={filteredCandidates}
                            setViewingCandidate={setViewingCandidate}
                            handleDeleteCandidate={handleDeleteCandidate}
                            jobs={jobs}
                            jobsLoading={jobsLoading}
                            jobSearch={jobSearch}
                            setJobSearch={setJobSearch}
                            jobLocationFilter={jobLocationFilter}
                            setJobLocationFilter={setJobLocationFilter}
                            jobLocations={jobLocations}
                            filteredJobs={filteredJobs}
                            openCreateModal={openCreateModal}
                            openEditModal={openEditModal}
                            handleDeleteJob={handleDeleteJob}
                            handleToggleJobStatus={handleToggleJobStatus}
                            setViewingJob={setViewingJob}
                        />
                    )}

                    {activeTab === 'blogs' && (
                        <BlogsTab
                            blogSearch={blogSearch}
                            setBlogSearch={setBlogSearch}
                            blogCategoryFilter={blogCategoryFilter}
                            setBlogCategoryFilter={setBlogCategoryFilter}
                            blogCategories={blogCategories}
                            blogsLoading={blogsLoading}
                            filteredBlogs={filteredBlogs}
                            openCreateBlogModal={openCreateBlogModal}
                            openEditBlogModal={openEditBlogModal}
                            handleDeleteBlog={handleDeleteBlog}
                            setViewingBlog={setViewingBlog}
                        />
                    )}

                    {activeTab === 'projects' && (
                        <ProjectsTab
                            token={token}
                            projectSearch={projectSearch}
                            setProjectSearch={setProjectSearch}
                            projectStatusFilter={projectStatusFilter}
                            setProjectStatusFilter={setProjectStatusFilter}
                            projectStatusOptions={projectStatusOptions}
                            projectCategoryFilter={projectCategoryFilter}
                            setProjectCategoryFilter={setProjectCategoryFilter}
                            projectsLoading={projectsLoading}
                            filteredProjects={filteredProjects}
                            setProjects={setProjects}
                            openCreateProjectModal={openCreateProjectModal}
                            openEditProjectModal={openEditProjectModal}
                            handleToggleProjectStatus={handleToggleProjectStatus}
                            setDeleteConfirmProject={setDeleteConfirmProject}
                        />
                    )}

                    {activeTab === 'enquiries' && (
                        <EnquiriesTab
                            enquirySearch={enquirySearch}
                            setEnquirySearch={setEnquirySearch}
                            enquiryServiceFilter={enquiryServiceFilter}
                            setEnquiryServiceFilter={setEnquiryServiceFilter}
                            enquiries={enquiries}
                            enquiriesLoading={enquiriesLoading}
                            setViewingEnquiry={setViewingEnquiry}
                            setDeleteConfirmEnquiry={setDeleteConfirmEnquiry}
                        />
                    )}
                </div>
            </main>

            {/* MODALS */}
            <JobModal
                isOpen={isJobModalOpen}
                onClose={resetJobForm}
                currentEditingJob={currentEditingJob}
                jobForm={jobForm}
                setJobForm={setJobForm}
                handleJobSubmit={handleJobSubmit}
                isSavingJob={isSavingJob}
                handlePlatformToggle={handlePlatformToggle}
                getFileLink={getFileLink}
            />

            <BlogModal
                isOpen={isBlogModalOpen}
                onClose={resetBlogForm}
                currentEditingBlog={currentEditingBlog}
                blogForm={blogForm}
                setBlogForm={setBlogForm}
                handleBlogSubmit={handleBlogSubmit}
                isSavingBlog={isSavingBlog}
                addBlogSection={addBlogSection}
                removeBlogSection={removeBlogSection}
                updateBlogSection={updateBlogSection}
            />

            <ProjectModal
                isOpen={isProjectModalOpen}
                onClose={resetProjectForm}
                currentEditingProject={currentEditingProject}
                projectForm={projectForm}
                setProjectForm={setProjectForm}
                handleProjectSubmit={handleProjectSubmit}
                isSavingProject={isSavingProject}
                projectImageInputRef={projectImageInputRef}
                handleProjectImageAdd={handleProjectImageAdd}
                removeExistingProjectImage={removeExistingProjectImage}
                removeNewProjectImage={removeNewProjectImage}
            />

            {/* DELETE CONFIRMATION MODALS */}
            <DeleteConfirmModal
                isOpen={!!deleteConfirmJob}
                onClose={() => setDeleteConfirmJob(null)}
                onConfirm={confirmDeleteJob}
                title="Delete Job Opening"
                message={`Are you sure you want to permanently delete "${deleteConfirmJob?.title}"? This action cannot be undone.`}
                isDeleting={isDeletingJob}
            />

            <DeleteConfirmModal
                isOpen={!!deleteConfirmCandidate}
                onClose={() => setDeleteConfirmCandidate(null)}
                onConfirm={confirmDeleteCandidate}
                title="Delete Candidate Record"
                message={`Are you sure you want to delete the application record for "${deleteConfirmCandidate?.name}"? This will remove their resume file permanently.`}
                isDeleting={isDeletingCandidate}
            />

            <DeleteConfirmModal
                isOpen={!!deleteConfirmBlog}
                onClose={() => setDeleteConfirmBlog(null)}
                onConfirm={confirmDeleteBlog}
                title="Delete Blog Post"
                message={`Are you sure you want to delete "${deleteConfirmBlog?.title}"?`}
                isDeleting={isDeletingBlog}
            />

            <DeleteConfirmModal
                isOpen={!!deleteConfirmProject}
                onClose={() => setDeleteConfirmProject(null)}
                onConfirm={confirmDeleteProject}
                title="Delete Project Masterpiece"
                message={`Are you sure you want to delete "${deleteConfirmProject?.title}"? This will remove all associated project images.`}
                isDeleting={isDeletingProject}
            />

            <DeleteConfirmModal
                isOpen={!!deleteConfirmEnquiry}
                onClose={() => setDeleteConfirmEnquiry(null)}
                onConfirm={confirmDeleteEnquiry}
                title="Delete Client Enquiry"
                message={`Are you sure you want to delete the client enquiry from "${deleteConfirmEnquiry?.name}" (${deleteConfirmEnquiry?.company_name || 'No Company'})?`}
                isDeleting={isDeletingEnquiry}
            />

            {/* VIEW JOB DETAILS DRAWER */}
            {viewingJob && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={() => setViewingJob(null)} />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-lg h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between flex-shrink-0">
                            <div>
                                <span className={`text-[10px] border px-2 py-0.5 rounded font-bold uppercase tracking-wider mr-2 ${
                                    viewingJob.status === 'active' 
                                        ? 'bg-[#2ea44f]/10 border-[#2ea44f]/30 text-[#2ea44f]' 
                                        : 'bg-[#30363d]/30 border-[#30363d] text-[#8b949e]'
                                }`}>
                                    {viewingJob.status === 'active' ? 'Active Opening' : 'Inactive Opening'}
                                </span>
                                {(viewingJob.platform || 'PMC').split(',').map(p => (
                                     <span key={p} className={`text-[10px] border px-2 py-0.5 rounded font-bold uppercase tracking-wider mr-1 ${
                                         p.trim().toLowerCase() === 'epc' 
                                             ? 'bg-purple-900/20 border-purple-800/30 text-purple-400' 
                                             : 'bg-blue-900/20 border-blue-800/30 text-blue-400'
                                     }`}>
                                         {p.trim()}
                                     </span>
                                 ))}
                                <h3 className="text-lg font-bold text-[#e6edf3] mt-2">
                                    {viewingJob.title}
                                </h3>
                            </div>
                            <button onClick={() => setViewingJob(null)} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer p-1">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs text-[#c9d1d9]">
                                <div>
                                    <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Location</span>
                                    <p className="font-medium text-[#e6edf3]">{viewingJob.details?.Location || 'Pan India'}</p>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Notice Period</span>
                                    <p className="font-medium text-[#e6edf3]">{viewingJob.details?.['Notice Period'] || 'Immediate'}</p>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Gender Preference</span>
                                    <p className="font-medium text-[#e6edf3]">{viewingJob.details?.Gender || 'Any'}</p>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Qualification</span>
                                    <p className="font-medium text-[#e6edf3]">{viewingJob.details?.Qualification || 'Any Graduate'}</p>
                                </div>
                                {viewingJob.jd_file_path && (
                                    <div className="col-span-2 border-t border-[#30363d] pt-4">
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Job Description (JD)</span>
                                        <a
                                            href={getFileLink(viewingJob.jd_file_path, 'jds')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#58a6ff] hover:underline flex items-center gap-1.5 font-medium"
                                        >
                                            <FileText size={14} /> Download JD File
                                        </a>
                                    </div>
                                )}
                                
                                <div className="col-span-2 border-t border-[#30363d] pt-4">
                                    <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-2">
                                        Candidates Applied ({candidates.filter(c => 
                                            (c.job_role === viewingJob.title || c.job_role === `${viewingJob.title} (EPC)`) &&
                                            (!c.platform || !viewingJob.platform || viewingJob.platform.toLowerCase().split(',').includes(c.platform.toLowerCase()))
                                        ).length})
                                    </span>
                                    {(() => {
                                        const applied = candidates.filter(c => 
                                            (c.job_role === viewingJob.title || c.job_role === `${viewingJob.title} (EPC)`) &&
                                            (!c.platform || !viewingJob.platform || viewingJob.platform.toLowerCase().split(',').includes(c.platform.toLowerCase()))
                                        );
                                        if (applied.length === 0) {
                                            return <p className="text-xs text-[#8b949e] italic">No candidates have applied for this job yet.</p>;
                                        }
                                        return (
                                            <div className="max-h-60 overflow-y-auto space-y-2 mt-1 pr-1">
                                                {applied.map(c => (
                                                     <div 
                                                         key={c.id}
                                                         onClick={() => {
                                                             setViewingJob(null);
                                                             setViewingCandidate(c);
                                                         }}
                                                         className="flex items-center justify-between p-2.5 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] rounded-lg transition-colors cursor-pointer group/item"
                                                     >
                                                         <div className="min-w-0 flex-1 pr-2">
                                                             <p className="font-bold text-[#e6edf3] group-hover/item:text-[#58a6ff] transition-colors truncate">{c.name}</p>
                                                             <p className="text-[10px] text-[#8b949e] truncate">{c.email}</p>
                                                         </div>
                                                         <div className="flex items-center gap-2 flex-shrink-0">
                                                             <span className="text-[9px] text-[#8b949e] hidden sm:inline">
                                                                 {new Date(c.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                             </span>
                                                             <a
                                                                 href={getResumeLink(c.file_path)}
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 onClick={(e) => e.stopPropagation()}
                                                                 className="text-[#8b949e] hover:text-[#58a6ff] p-1 bg-[#161b22] border border-[#30363d] rounded-md transition-colors"
                                                                 title="Download Resume"
                                                             >
                                                                 <Download size={12} />
                                                             </a>
                                                         </div>
                                                     </div>
                                                 ))}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#30363d] flex justify-end gap-3 bg-[#0d1117]/30 flex-shrink-0">
                            <button
                                onClick={() => setViewingJob(null)}
                                className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setViewingJob(null);
                                    openEditModal(viewingJob);
                                }}
                                className="bg-[#1f6feb] hover:bg-[#388bfd] text-white py-2 px-4 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                            >
                                Edit Opening
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CANDIDATE DETAILS DRAWER */}
            {viewingCandidate && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div
                        className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm"
                        onClick={() => setViewingCandidate(null)}
                    />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1f6feb]/20 border border-[#1f6feb]/40 flex items-center justify-center text-[#58a6ff] font-extrabold text-lg flex-shrink-0">
                                    {viewingCandidate.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-[#e6edf3] leading-tight">{viewingCandidate.name}</h3>
                                    <p className="text-xs text-[#8b949e] mt-0.5 flex items-center gap-1.5">
                                        <Mail size={11} />{viewingCandidate.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingCandidate(null)}
                                className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer p-1.5 hover:bg-[#21262d] rounded-lg"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Applied Role</span>
                                <span className={`font-semibold text-sm self-start px-3 py-1 rounded border ${
                                    (viewingCandidate.job_role || 'General Application') === 'General Application'
                                        ? 'bg-[#d29922]/15 border-[#d29922]/30 text-[#d29922]'
                                        : 'bg-[#1f6feb]/10 border-[#388bfd]/30 text-[#58a6ff]'
                                }`}>
                                    {viewingCandidate.job_role || 'General Application'}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Date Applied</span>
                                <span className="text-[#e6edf3] font-medium text-sm flex items-center gap-2">
                                    <Calendar size={13} className="text-[#58a6ff] flex-shrink-0" />
                                    {new Date(viewingCandidate.created_at).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Contact Email</span>
                                <span className="text-[#e6edf3] font-medium text-sm flex items-center gap-2">
                                    <Mail size={13} className="text-[#58a6ff] flex-shrink-0" />
                                    <a href={`mailto:${viewingCandidate.email}`} className="hover:text-[#58a6ff] transition-colors">
                                        {viewingCandidate.email}
                                    </a>
                                </span>
                            </div>

                            {viewingCandidate.mobile && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Contact Mobile</span>
                                    <span className="text-[#e6edf3] font-medium text-sm flex items-center gap-2">
                                        <Phone size={13} className="text-[#58a6ff] flex-shrink-0" />
                                        <a href={`tel:${viewingCandidate.mobile}`} className="hover:text-[#58a6ff] transition-colors">
                                            {viewingCandidate.mobile}
                                        </a>
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Resume / CV</span>
                                <a
                                    href={getResumeLink(viewingCandidate.file_path)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#58a6ff] rounded-lg p-3 transition-all group/resume"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1f6feb]/15 border border-[#1f6feb]/30 flex items-center justify-center flex-shrink-0">
                                        <Download size={14} className="text-[#58a6ff]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[#e6edf3] font-semibold text-xs truncate group-hover/resume:text-[#58a6ff] transition-colors">
                                            {viewingCandidate.file_name || 'Resume File'}
                                        </p>
                                        <p className="text-[#8b949e] text-[10px] mt-0.5">Click to open / download</p>
                                    </div>
                                    <ChevronRight size={13} className="text-[#8b949e] group-hover/resume:text-[#58a6ff] flex-shrink-0 transition-colors" />
                                </a>
                            </div>

                            <div className="border-t border-[#30363d] pt-4 space-y-2">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest block">HR Remarks / Notes</span>
                                <textarea
                                    value={remarksText}
                                    onChange={(e) => setRemarksText(e.target.value)}
                                    placeholder="Add notes, interview status, rating, or internal feedback about this candidate..."
                                    rows={4}
                                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-3 text-xs text-[#e6edf3] outline-none placeholder-[#484f58] transition-all resize-none"
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSaveRemarks}
                                        disabled={savingRemarks}
                                        className="bg-[#238636] hover:bg-[#2ea44f] disabled:opacity-50 text-white text-xs font-bold py-1.5 px-4 rounded-lg shadow-sm transition-all cursor-pointer"
                                    >
                                        {savingRemarks ? 'Saving...' : 'Save Remarks'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#30363d] flex items-center justify-between bg-[#0d1117]/30 flex-shrink-0">
                            <button
                                onClick={() => handleDeleteCandidate(viewingCandidate)}
                                className="text-[#f85149] hover:bg-[#da3633]/20 border border-[#f85149]/30 py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Delete Application
                            </button>
                            <button
                                onClick={() => setViewingCandidate(null)}
                                className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Close Drawer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* BLOG DETAILS DRAWER */}
            {viewingBlog && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={() => setViewingBlog(null)} />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-xl h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between flex-shrink-0">
                            <div>
                                <span className="bg-[#1f6feb]/15 border border-[#388bfd]/30 text-[#58a6ff] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mr-2">
                                    {viewingBlog.category}
                                </span>
                                {viewingBlog.featured && (
                                    <span className="bg-amber-900/30 border border-amber-800/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                        ★ Featured
                                    </span>
                                )}
                                <h3 className="text-lg font-bold text-[#e6edf3] mt-2 leading-snug">
                                    {viewingBlog.title}
                                </h3>
                            </div>
                            <button onClick={() => setViewingBlog(null)} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer p-1">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs text-[#c9d1d9]">
                            {viewingBlog.image && (
                                <div className="w-full h-48 rounded-xl overflow-hidden border border-[#30363d]">
                                    <img src={viewingBlog.image} alt={viewingBlog.title} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363d] pb-4 text-[#8b949e]">
                                <div>
                                    <p className="font-bold text-[#e6edf3]">{viewingBlog.author}</p>
                                    <p className="text-[10px]">{viewingBlog.author_role}</p>
                                </div>
                                <div className="text-right text-[10px]">
                                    <p>{viewingBlog.date}</p>
                                    <p>{viewingBlog.read_time}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider mb-1">Summary</h4>
                                <p className="leading-relaxed bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">{viewingBlog.summary}</p>
                            </div>

                            {viewingBlog.content?.sections?.map((sec, i) => (
                                <div key={i} className="space-y-1">
                                    <h4 className="text-xs font-bold text-[#58a6ff]">{sec.heading}</h4>
                                    <p className="leading-relaxed whitespace-pre-wrap text-[#c9d1d9]">{sec.body}</p>
                                </div>
                            ))}

                            {viewingBlog.content?.keyTakeaways?.length > 0 && (
                                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-2">
                                    <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">Key Takeaways</h4>
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        {viewingBlog.content.keyTakeaways.map((takeaway, i) => (
                                            <li key={i}>{takeaway}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-[#30363d] flex justify-end gap-3 bg-[#0d1117]/30 flex-shrink-0">
                            <button
                                onClick={() => setViewingBlog(null)}
                                className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setViewingBlog(null);
                                    openEditBlogModal(viewingBlog);
                                }}
                                className="bg-[#1f6feb] hover:bg-[#388bfd] text-white py-2 px-4 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                            >
                                Edit Article
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ENQUIRY DETAILS DRAWER */}
            {viewingEnquiry && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={() => setViewingEnquiry(null)} />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1f6feb]/20 border border-[#1f6feb]/40 flex items-center justify-center text-[#58a6ff] font-extrabold text-lg flex-shrink-0">
                                    {viewingEnquiry.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-[#e6edf3] leading-tight">{viewingEnquiry.name}</h3>
                                    <p className="text-xs text-[#8b949e] mt-0.5 flex items-center gap-1.5">
                                        <Mail size={11} />{viewingEnquiry.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingEnquiry(null)}
                                className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer p-1.5 hover:bg-[#21262d] rounded-lg"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Company Name</span>
                                <span className="text-[#e6edf3] font-semibold text-sm">
                                    {viewingEnquiry.company_name || 'Not Specified'}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Service Required</span>
                                <span className="bg-[#1f6feb]/15 border border-[#388bfd]/30 text-[#58a6ff] px-3 py-1 rounded text-xs font-bold self-start">
                                    {viewingEnquiry.service_required}
                                </span>
                            </div>

                            {viewingEnquiry.contact_whatsapp && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">WhatsApp Contact</span>
                                    <a
                                        href={`https://wa.me/${viewingEnquiry.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#2ea44f] hover:underline font-semibold text-sm flex items-center gap-2"
                                    >
                                        <Phone size={14} />
                                        {viewingEnquiry.contact_whatsapp}
                                    </a>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Submitted Date</span>
                                <span className="text-[#e6edf3] font-medium text-sm flex items-center gap-2">
                                    <Calendar size={13} className="text-[#58a6ff] flex-shrink-0" />
                                    {new Date(viewingEnquiry.created_at).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div className="border-t border-[#30363d] pt-4 space-y-2">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest block">Project Details / Message</span>
                                <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 text-xs text-[#e6edf3] whitespace-pre-wrap leading-relaxed">
                                    {viewingEnquiry.project_details || 'No additional project details provided.'}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#30363d] flex items-center justify-between bg-[#0d1117]/30 flex-shrink-0">
                            <button
                                onClick={() => setDeleteConfirmEnquiry(viewingEnquiry)}
                                className="text-[#f85149] hover:bg-[#da3633]/20 border border-[#f85149]/30 py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Delete Enquiry
                            </button>
                            <button
                                onClick={() => setViewingEnquiry(null)}
                                className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Close Drawer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </div>
    );
};

export default AdminDashboard;
