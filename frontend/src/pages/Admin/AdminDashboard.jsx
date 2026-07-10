import React, { useState, useEffect } from 'react';
import { 
    Users, Briefcase, LogOut, Plus, Trash2, Edit2, Search, 
    Filter, X, Download, Calendar, Mail, MapPin, Award, 
    Clock, DollarSign, UserCheck, Shield, ChevronRight, Check,
    FileText, Tag, User as UserIcon, BookOpen, ChevronDown, Upload, Image, AlertTriangle
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { 
    API_BASE_URL, 
    ADMIN_RESUMES_API_URL, 
    ADMIN_JOBS_API_URL,
    BLOGS_API_URL 
} from '../../config';

// ─── Custom Select Component (GitHub Dark Styled) ─────────────────────────────
const CustomSelect = ({ value, onChange, options, placeholder = "Select option", className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || { label: value, value };

    return (
        <div className={`relative inline-block ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-xs text-[#e6edf3] focus:border-[#58a6ff] hover:border-[#8b949e]/50 transition-all outline-none flex items-center justify-between gap-2 cursor-pointer w-full text-left"
            >
                <span className="truncate">{selectedOption.label || placeholder}</span>
                <ChevronDown size={12} className={`text-[#8b949e] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-1.5 w-full min-w-[150px] bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="max-h-60 overflow-y-auto">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${opt.value === value ? 'bg-[#1f6feb] text-white font-semibold' : 'text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#e6edf3]'}`}
                            >
                                <span className="truncate">{opt.label}</span>
                                {opt.value === value && <Check size={11} className="text-white flex-shrink-0" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Custom Toggle Switch Component ──────────────────────────────────────────
const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <div 
            onClick={onChange}
            style={{
                width: '38px',
                height: '20px',
                borderRadius: '9999px',
                padding: '2px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: checked ? '#238636' : '#30363d'
            }}
        >
            <div 
                style={{
                    backgroundColor: '#e6edf3',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                    transform: checked ? 'translateX(18px)' : 'translateX(0px)'
                }}
            />
        </div>
    );
};

const AdminDashboard = ({ token, onLogout }) => {
    const [activeTab, setActiveTab] = useState('pmc-careers');
    const [subTab, setSubTab] = useState('jobs');
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [candidatesLoading, setCandidatesLoading] = useState(true);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [blogsLoading, setBlogsLoading] = useState(true);

    // Search and Filters
    const [candidateSearch, setCandidateSearch] = useState('');
    const [candidateRoleFilter, setCandidateRoleFilter] = useState('All');
    const [jobSearch, setJobSearch] = useState('');
    const [jobLocationFilter, setJobLocationFilter] = useState('All');
    const [blogSearch, setBlogSearch] = useState('');
    const [blogCategoryFilter, setBlogCategoryFilter] = useState('All');

    // Modals
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [currentEditingJob, setCurrentEditingJob] = useState(null);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [currentEditingBlog, setCurrentEditingBlog] = useState(null);
    const [viewingJob, setViewingJob] = useState(null);
    const [viewingCandidate, setViewingCandidate] = useState(null);
    const [viewingBlog, setViewingBlog] = useState(null);
    const [deleteConfirmJob, setDeleteConfirmJob] = useState(null);
    const [isDeletingJob, setIsDeletingJob] = useState(false);
    const [isSavingJob, setIsSavingJob] = useState(false);
    const [isSavingBlog, setIsSavingBlog] = useState(false);

    // Form States
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

    const [blogForm, setBlogForm] = useState({
        title: '',
        summary: '',
        author: '',
        author_role: '',
        category: 'Project Management',
        image: '',
        featured: false,
        tags: '',
        sections: [{ heading: '', body: '' }],
        keyTakeaways: '',
        blog_image: null
    });

    const headers = {
        'Content-Type': 'application/json',
        'x-admin-token': token
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

    useEffect(() => {
        if (token) {
            const currentPlatform = activeTab === 'pmc-careers' ? 'pmc' : activeTab === 'epc-careers' ? 'epc' : null;
            if (currentPlatform) {
                fetchJobs(currentPlatform);
                fetchCandidates(currentPlatform);
            } else if (activeTab === 'blogs') {
                fetchBlogs();
            }
        }
    }, [activeTab, token]);

    // Handle Candidates delete
    const handleDeleteCandidate = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application? This will also remove the resume file.')) {
            return;
        }

        try {
            const response = await fetch(`${ADMIN_RESUMES_API_URL}/${id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Application deleted successfully.');
                setCandidates(candidates.filter(c => c.id !== id));
            } else {
                toast.error(data.message || 'Failed to delete application.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Server error deleting candidate.');
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

    // Handle Jobs Form submit (Create or Update)
    const handleJobSubmit = async (e) => {
        e.preventDefault();
        if (!jobForm.title.trim()) {
            toast.warn('Job Title is required.');
            return;
        }

        const isEditing = !!currentEditingJob;
        // Always use jobForm.platform so that switching a job's platform during edit works correctly
        const targetPlatform = (jobForm.platform || 'pmc').toLowerCase();
        // Use clean endpoints that don't need platform prefix in path
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
                // Refresh the tab that matches the (possibly new) platform
                const currentPlatform = activeTab === 'pmc-careers' ? 'pmc' : activeTab === 'epc-careers' ? 'epc' : null;
                fetchJobs(currentPlatform);
                // If the platform was changed, also refresh the other platform's list in the background
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

    // Open the delete confirmation modal
    const handleDeleteJob = (job) => {
        setDeleteConfirmJob(job);
    };

    // Execute deletion after user confirms in the modal
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
                toast.success(`"${deleteConfirmJob.title}" deleted successfully.`, {
                    position: 'top-right',
                    autoClose: 4000,
                });
            } else {
                toast.error(data.message || 'Failed to delete job opening.', {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Delete job error:', error);
            toast.error('Server error. Could not delete job opening.', {
                position: 'top-right',
                autoClose: 5000,
            });
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
            image: '',
            featured: false,
            tags: '',
            sections: [{ heading: '', body: '' }],
            keyTakeaways: ''
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

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog post? It will disappear from the live website immediately.')) {
            return;
        }

        try {
            const response = await fetch(`${BLOGS_API_URL}/${id}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Blog post deleted successfully.');
                setBlogs(blogs.filter(b => b.id !== id));
            } else {
                toast.error(data.message || 'Failed to delete blog.');
            }
        } catch (error) {
            console.error('Delete blog error:', error);
            toast.error('Server error deleting blog.');
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

    // Calculate dynamic stats based on current platform context
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

    // Unique values for dropdown filters
    const candidateRoles = ['All', ...new Set(candidates.map(c => c.job_role))];
    const jobLocations = ['All', ...new Set(jobs.map(j => j.details?.Location).filter(Boolean))];
    const blogCategories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

    // Helper to extract file name and serve download
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
            {/* Left Sidebar (Fixed on desktop, occupies full screen height, static zero scroll) */}
            <aside className="w-64 bg-[#161b22] border-r border-[#30363d] p-0 hidden md:flex flex-col justify-between fixed top-0 left-0 bottom-0 z-50 overflow-hidden">
                    <div className="space-y-4">
                        {/* Company Logo in Sidebar (aligned with header line) */}
                        <div className="flex items-center gap-2.5 px-6 h-[73px] border-b border-[#30363d] bg-[#161b22]">
                            <img src="/mano-logo.svg" alt="MANO Logo" className="h-8 w-auto" />
                            <div>
                                <span className="text-xs font-extrabold text-white tracking-wider uppercase block leading-tight">MANO</span>
                                <span className="text-[9px] font-semibold text-[#8b949e] uppercase tracking-wider block">Admin Control</span>
                            </div>
                        </div>

                        <nav className="space-y-1 px-4">
                            <button
                                onClick={() => { setActiveTab('pmc-careers'); setSubTab('jobs'); }}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'pmc-careers' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'}`}
                            >
                                <Briefcase size={16} />
                                <span>PMC Careers</span>
                            </button>

                            <button
                                onClick={() => { setActiveTab('epc-careers'); setSubTab('jobs'); }}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'epc-careers' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'}`}
                            >
                                <Briefcase size={16} />
                                <span>EPC Careers</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('blogs')}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'blogs' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'}`}
                            >
                                <FileText size={16} />
                                <span>Blog Posts</span>
                            </button>
                        </nav>
                    </div>

                    <div className="p-4 border-t border-[#30363d] space-y-4 bg-[#161b22]">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-[#1f6feb]/20 flex items-center justify-center text-[#58a6ff] font-bold text-xs border border-[#1f6feb]/30">
                                SA
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-[#e6edf3]">Sys Admin</p>
                                <p className="text-[9px] text-[#8b949e] uppercase">Owner Account</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="w-full bg-[#21262d] hover:bg-[#da3633] hover:text-white border border-[#30363d] hover:border-[#da3633] text-[#c9d1d9] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Top Navigation Header (starts after sidebar on desktop, locks to top) */}
                <header className="sticky top-0 z-40 bg-[#161b22]/90 border-b border-[#30363d] backdrop-blur-xl px-6 h-[73px] flex items-center justify-between md:ml-64 transition-all">
                    {/* Mobile Logo & Title */}
                    <div className="flex items-center gap-3 md:hidden">
                        <img src="/mano-logo.svg" alt="MANO Logo" className="h-6 w-auto" />
                        <h1 className="text-sm font-bold text-[#e6edf3] tracking-tight">MANO Admin</h1>
                    </div>
                    {/* Desktop dashboard panel indicator */}
                    <div className="hidden md:block">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">
                            {activeTab === 'pmc-careers' && 'PMC Careers Portal'}
                            {activeTab === 'epc-careers' && 'EPC Careers Portal'}
                            {activeTab === 'blogs' && 'Blog Posts'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-[#e6edf3]">System Administrator</p>
                            <p className="text-xs text-[#58a6ff] font-medium">Session Active</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="bg-[#21262d] hover:bg-[#da3633] hover:text-white hover:border-[#da3633] border border-[#30363d] text-[#c9d1d9] py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 md:hidden"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Content Area (offset by sidebar width on desktop) */}
                <main className="md:ml-64 p-6 space-y-6">
                    
                    {/* Mobile Navigation Header Tabs (Visible on mobile only) */}
                    <div className="md:hidden bg-[#161b22] border border-[#30363d] p-1.5 rounded-xl flex gap-1 mb-2">
                        <button
                            onClick={() => { setActiveTab('pmc-careers'); setSubTab('jobs'); }}
                            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${activeTab === 'pmc-careers' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e]'}`}
                        >
                            PMC
                        </button>
                        <button
                            onClick={() => { setActiveTab('epc-careers'); setSubTab('jobs'); }}
                            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${activeTab === 'epc-careers' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e]'}`}
                        >
                            EPC
                        </button>
                        <button
                            onClick={() => setActiveTab('blogs')}
                            className={`flex-1 text-center py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${activeTab === 'blogs' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e]'}`}
                        >
                            Blogs ({blogs.length})
                        </button>
                    </div>

                    {(activeTab === 'pmc-careers' || activeTab === 'epc-careers') && (
                        <div className="md:hidden bg-[#161b22] border border-[#30363d] p-1 rounded-lg flex gap-1 mb-2">
                            <button
                                onClick={() => setSubTab('jobs')}
                                className={`flex-1 text-center py-1.5 rounded-md text-[11px] font-semibold cursor-pointer transition-all ${subTab === 'jobs' ? 'bg-[#21262d] text-[#58a6ff]' : 'text-[#8b949e]'}`}
                            >
                                Jobs ({stats.activeJobs})
                            </button>
                            <button
                                onClick={() => setSubTab('candidates')}
                                className={`flex-1 text-center py-1.5 rounded-md text-[11px] font-semibold cursor-pointer transition-all ${subTab === 'candidates' ? 'bg-[#21262d] text-[#58a6ff]' : 'text-[#8b949e]'}`}
                            >
                                Candidates ({stats.totalApplicants})
                            </button>
                        </div>
                    )}

                    {/* Tab Content Box */}
                    <div className="space-y-6">
                        {/* Desktop Careers Sub-tabs Switcher (Only visible on Careers view) */}
                        {(activeTab === 'pmc-careers' || activeTab === 'epc-careers') && (
                            <div className="hidden md:flex gap-6 border-b border-[#30363d] pb-2">
                                <button
                                    onClick={() => setSubTab('jobs')}
                                    className={`pb-2 text-sm font-semibold transition-all relative cursor-pointer ${subTab === 'jobs' ? 'text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
                                >
                                    Job Openings ({stats.activeJobs})
                                    {subTab === 'jobs' && <div className="absolute bottom-[-10px] left-0 right-0 h-[2.5px] bg-[#58a6ff] rounded-full animate-in fade-in duration-200" />}
                                </button>
                                <button
                                    onClick={() => setSubTab('candidates')}
                                    className={`pb-2 text-sm font-semibold transition-all relative cursor-pointer ${subTab === 'candidates' ? 'text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
                                >
                                    Candidates ({stats.totalApplicants})
                                    {subTab === 'candidates' && <div className="absolute bottom-[-10px] left-0 right-0 h-[2.5px] bg-[#58a6ff] rounded-full animate-in fade-in duration-200" />}
                                </button>
                            </div>
                        )}
                            
                            {/* 1. CANDIDATES PORTAL VIEW */}
                            {(activeTab === 'pmc-careers' || activeTab === 'epc-careers') && subTab === 'candidates' && (
                                <div className="space-y-6">
                                    {/* Search & Filters */}
                                    <div className="flex flex-col sm:flex-row gap-4 bg-[#161b22] p-4 rounded-xl border border-[#30363d]">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={16} />
                                            <input
                                                type="text"
                                                value={candidateSearch}
                                                onChange={(e) => setCandidateSearch(e.target.value)}
                                                placeholder="Search candidates by name or email..."
                                                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 text-xs text-[#e6edf3] focus:border-[#58a6ff] transition-all outline-none placeholder-[#484f58]"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Filter size={14} className="text-[#8b949e]" />
                                            <CustomSelect
                                                value={candidateRoleFilter}
                                                onChange={setCandidateRoleFilter}
                                                options={candidateRoles.map(role => ({ value: role, label: role === 'All' ? 'All Roles' : role }))}
                                                className="min-w-[140px]"
                                            />
                                        </div>
                                    </div>

                                    {candidatesLoading ? (
                                        <div className="h-48 flex flex-col items-center justify-center gap-3 text-[#8b949e]">
                                            <div className="w-8 h-8 border-2 border-[#1f6feb] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs">Fetching candidate applications...</span>
                                        </div>
                                    ) : filteredCandidates.length === 0 ? (
                                        <div className="h-48 border border-dashed border-[#30363d] rounded-xl flex flex-col items-center justify-center text-[#8b949e] gap-2">
                                            <Users size={32} className="opacity-40" />
                                            <p className="text-xs font-semibold">No candidate submissions found</p>
                                            <p className="text-[10px] text-[#484f58]">Try adjusting your filters or search keywords</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto border border-[#30363d] rounded-xl">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-[#161b22] text-[#8b949e] border-b border-[#30363d] text-[10px] font-bold uppercase tracking-wider">
                                                        <th className="px-6 py-4">Name & Email</th>
                                                        <th className="px-6 py-4">Platform</th>
                                                        <th className="px-6 py-4">Applied Role</th>
                                                        <th className="px-6 py-4">Date Applied</th>
                                                        <th className="px-6 py-4">Resume File</th>
                                                        <th className="px-6 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#30363d]/60 text-xs text-[#c9d1d9]">
                                                    {filteredCandidates.map(c => (
                                                        <tr 
                                                            key={c.id}
                                                            onClick={() => setViewingCandidate(c)}
                                                            className="hover:bg-[#161b22]/80 transition-colors cursor-pointer group"
                                                        >
                                                            <td className="px-6 py-4">
                                                                <div>
                                                                    <p className="font-bold text-[#e6edf3] text-sm group-hover:text-[#58a6ff] transition-colors">{c.name}</p>
                                                                    <p className="text-xs text-[#8b949e] flex items-center gap-1.5 mt-0.5">
                                                                        <Mail size={12} />
                                                                        {c.email}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${c.platform?.toLowerCase() === 'epc' ? 'bg-purple-900/30 border border-purple-800/50 text-purple-400' : 'bg-blue-900/30 border border-blue-800/50 text-blue-400'}`}>
                                                                    {c.platform || 'pmc'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide border ${
                                                                     c.job_role === 'General Application'
                                                                         ? 'bg-[#d29922]/15 border-[#d29922]/30 text-[#d29922]'
                                                                         : 'bg-[#1f6feb]/15 border-[#388bfd]/30 text-[#58a6ff]'
                                                                 }`}>
                                                                     {c.job_role}
                                                                 </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="text-[#8b949e] flex items-center gap-1.5">
                                                                    <Calendar size={12} />
                                                                    {new Date(c.created_at).toLocaleDateString(undefined, {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <a
                                                                    href={getResumeLink(c.file_path)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="inline-flex items-center gap-1.5 text-[#58a6ff] hover:underline font-semibold"
                                                                >
                                                                    <Download size={12} />
                                                                    {c.file_name || 'Download Resume'}
                                                                </a>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDeleteCandidate(c.id); }}
                                                                    className="text-[#8b949e] hover:text-[#f85149] p-1.5 bg-[#21262d] hover:bg-[#da3633]/20 border border-[#30363d] hover:border-[#f85149] rounded-md transition-all cursor-pointer"
                                                                    title="Delete Candidate Record"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 2. JOB OPENINGS MANAGER VIEW */}
                            {(activeTab === 'pmc-careers' || activeTab === 'epc-careers') && subTab === 'jobs' && (
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-4 bg-[#161b22] p-4 rounded-xl border border-[#30363d] items-center">
                                        <div className="flex-1 w-full relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={16} />
                                            <input
                                                type="text"
                                                value={jobSearch}
                                                onChange={(e) => setJobSearch(e.target.value)}
                                                placeholder="Search openings by job title..."
                                                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 text-xs text-[#e6edf3] focus:border-[#58a6ff] transition-all outline-none placeholder-[#484f58]"
                                            />
                                        </div>
                                        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4">
                                            <div className="flex items-center gap-2.5">
                                                <Filter size={14} className="text-[#8b949e]" />
                                                <CustomSelect
                                                    value={jobLocationFilter}
                                                    onChange={setJobLocationFilter}
                                                    options={jobLocations.map(location => ({ value: location, label: location === 'All' ? 'All Locations' : location }))}
                                                    className="min-w-[140px]"
                                                />
                                            </div>
                                            <button
                                                onClick={openCreateModal}
                                                className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                                            >
                                                <Plus size={14} />
                                                Create Opening
                                            </button>
                                        </div>
                                    </div>

                                    {jobsLoading ? (
                                        <div className="h-48 flex flex-col items-center justify-center gap-3 text-[#8b949e]">
                                            <div className="w-8 h-8 border-2 border-[#1f6feb] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs">Fetching job openings...</span>
                                        </div>
                                    ) : filteredJobs.length === 0 ? (
                                        <div className="h-48 border border-dashed border-[#30363d] rounded-xl flex flex-col items-center justify-center text-[#8b949e] gap-2">
                                            <Briefcase size={32} className="opacity-40" />
                                            <p className="text-xs font-semibold">No active job openings found</p>
                                            <p className="text-[10px] text-[#484f58]">Click "Create Opening" to publish a new job opening.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {filteredJobs.map(job => (
                                                <div 
                                                    key={job.id} 
                                                    onClick={() => setViewingJob(job)}
                                                    className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[#8b949e]/40 hover:shadow-lg transition-all group cursor-pointer"
                                                >
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div>
                                                                <h3 className="text-md font-bold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors inline-block mr-2">
                                                                    {job.title}
                                                                </h3>
                                                                {(job.platform || 'pmc').split(',').map(p => (
                                                                    <span key={p} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider inline-block align-middle mr-1 ${p.trim().toLowerCase() === 'epc' ? 'bg-purple-900/30 border border-purple-800/50 text-purple-400' : 'bg-blue-900/30 border border-blue-800/50 text-blue-400'}`}>
                                                                        {p.trim()}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="flex gap-2 items-center">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); openEditModal(job); }}
                                                                    className="text-[#c9d1d9] hover:text-[#58a6ff] p-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] rounded-md transition-all cursor-pointer"
                                                                    title="Edit Job details"
                                                                >
                                                                    <Edit2 size={13} />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDeleteJob(job); }}
                                                                    className="text-[#c9d1d9] hover:text-[#f85149] p-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#f85149] rounded-md transition-all cursor-pointer"
                                                                    title="Delete Job Opening"
                                                                >
                                                                    <Trash2 size={13} />
                                                                </button>
                                                                <div 
                                                                    className="flex items-center gap-1.5 flex-shrink-0" 
                                                                    title={job.status === 'active' ? "Deactivate Opening" : "Activate Opening"}
                                                                >
                                                                    <span className={`text-[10px] font-bold ${job.status === 'active' ? 'text-[#2ea44f]' : 'text-[#8b949e]'}`}>
                                                                        {job.status === 'active' ? 'Active' : 'Inactive'}
                                                                    </span>
                                                                    <ToggleSwitch 
                                                                        checked={job.status === 'active'}
                                                                        onChange={(e) => { 
                                                                            e.stopPropagation(); 
                                                                            handleToggleJobStatus(job.id, job.status); 
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] text-[#8b949e]">
                                                            <p className="flex items-center gap-1.5">
                                                                <MapPin size={12} className="text-[#8b949e]" />
                                                                <span className="font-semibold text-[#c9d1d9]">Location:</span> {job.details?.Location || 'Pan India'}
                                                            </p>
                                                            <p className="flex items-center gap-1.5">
                                                                <Clock size={12} className="text-[#8b949e]" />
                                                                <span className="font-semibold text-[#c9d1d9]">Notice Period:</span> {job.details?.['Notice Period'] || 'Immediate'}
                                                            </p>
                                                            <p className="flex items-center gap-1.5">
                                                                <Users size={12} className="text-[#8b949e]" />
                                                                <span className="font-semibold text-[#c9d1d9]">Gender Preference:</span> {job.details?.Gender || 'Any'}
                                                            </p>
                                                            {job.jd_file_path && (
                                                                <p className="flex items-center gap-1.5 col-span-2">
                                                                    <FileText size={12} className="text-[#58a6ff]" />
                                                                    <span className="font-semibold text-[#58a6ff]">JD:</span> <a href={getFileLink(job.jd_file_path, 'jds')} target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">Download JD File</a>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-[#30363d]/80 pt-3 text-[10px] text-[#8b949e] flex justify-between items-center">
                                                        <span>Qualification: {job.details?.Qualification || 'Any Graduate'}</span>
                                                        <span className={job.status === 'active' ? 'text-[#2ea44f] font-semibold' : 'text-[#8b949e]'}>
                                                            {job.status === 'active' ? 'Live' : 'Inactive'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 3. BLOG POSTS MANAGER VIEW */}
                            {activeTab === 'blogs' && (
                                <div className="space-y-6">
                                    {/* Search & Category Filter */}
                                    <div className="flex flex-col sm:flex-row gap-4 bg-[#161b22] p-4 rounded-xl border border-[#30363d] items-center">
                                        <div className="flex-1 w-full relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={16} />
                                            <input
                                                type="text"
                                                value={blogSearch}
                                                onChange={(e) => setBlogSearch(e.target.value)}
                                                placeholder="Search blogs by title, summary or author..."
                                                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 text-xs text-[#e6edf3] focus:border-[#58a6ff] transition-all outline-none placeholder-[#484f58]"
                                            />
                                        </div>
                                        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4">
                                            <div className="flex items-center gap-2.5">
                                                <Filter size={14} className="text-[#8b949e]" />
                                                <CustomSelect
                                                    value={blogCategoryFilter}
                                                    onChange={setBlogCategoryFilter}
                                                    options={blogCategories.map(cat => ({ value: cat, label: cat === 'All' ? 'All Categories' : cat }))}
                                                    className="min-w-[140px]"
                                                />
                                            </div>
                                            <button
                                                onClick={openCreateBlogModal}
                                                className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                                            >
                                                <Plus size={14} />
                                                Create Blog Post
                                            </button>
                                        </div>
                                    </div>

                                    {blogsLoading ? (
                                        <div className="h-48 flex flex-col items-center justify-center gap-3 text-[#8b949e]">
                                            <div className="w-8 h-8 border-2 border-[#1f6feb] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs">Fetching blog articles...</span>
                                        </div>
                                    ) : filteredBlogs.length === 0 ? (
                                        <div className="h-48 border border-dashed border-[#30363d] rounded-xl flex flex-col items-center justify-center text-[#8b949e] gap-2">
                                            <FileText size={32} className="opacity-40" />
                                            <p className="text-xs font-semibold">No blog articles found</p>
                                            <p className="text-[10px] text-[#484f58]">Click "Create Blog Post" to publish a new article.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4">
                                            {filteredBlogs.map(blog => (
                                                <div 
                                                    key={blog.id} 
                                                    onClick={() => setViewingBlog(blog)}
                                                    className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col sm:flex-row gap-5 hover:border-[#8b949e]/40 transition-all group cursor-pointer hover:shadow-lg"
                                                >
                                                    {blog.image && (
                                                        <div className="w-full sm:w-36 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#0d1117] border border-[#30363d]">
                                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex-1 flex flex-col justify-between gap-3">
                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between items-start gap-4">
                                                                <h3 className="text-sm font-bold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors leading-tight">
                                                                    {blog.title}
                                                                </h3>
                                                                <div className="flex gap-2 flex-shrink-0">
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); openEditBlogModal(blog); }}
                                                                        className="text-[#c9d1d9] hover:text-[#58a6ff] p-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] rounded-md transition-all cursor-pointer"
                                                                        title="Edit Blog Post"
                                                                    >
                                                                        <Edit2 size={13} />
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handleDeleteBlog(blog.id); }}
                                                                        className="text-[#c9d1d9] hover:text-[#f85149] p-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#f85149] rounded-md transition-all cursor-pointer"
                                                                        title="Delete Blog Post"
                                                                    >
                                                                        <Trash2 size={13} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed">
                                                                {blog.summary}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-[#8b949e] border-t border-[#30363d]/60 pt-2.5">
                                                            <div className="flex items-center gap-3">
                                                                <span className="bg-[#1f6feb]/15 border border-[#388bfd]/30 text-[#58a6ff] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{blog.category}</span>
                                                                <span className="flex items-center gap-1"><UserIcon size={11} /> {blog.author}</span>
                                                                <span className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {blog.featured && <span className="bg-amber-900/30 border border-amber-800/80 text-amber-400 px-2 py-0.5 rounded font-bold">★ Featured</span>}
                                                                <span>{blog.read_time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                </main>

            {/* CREATE / EDIT JOB OPENING MODAL - Slides from Right Sidebar Drawer */}
            {isJobModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={resetJobForm} />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-xl h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between">
                            <h3 className="text-lg font-bold text-[#e6edf3]">
                                {currentEditingJob ? 'Edit Job Opening' : 'Create Job Opening'}
                            </h3>
                            <button onClick={resetJobForm} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleJobSubmit} autoComplete="off" className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div className="space-y-4">
                                {/* Job Title — full width */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Job Title *</label>
                                    <input
                                        type="text" required value={jobForm.title}
                                        onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                        placeholder="e.g. Senior Billing Engineer"
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                    />
                                </div>

                                {/* Qualification + Location side-by-side */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Qualification</label>
                                        <input
                                            type="text" value={jobForm.qualification}
                                            onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                                            placeholder="e.g. BE/B.Tech Civil"
                                            className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Location</label>
                                        <input
                                            type="text" value={jobForm.location}
                                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                            placeholder="e.g. HO (Dadar)"
                                            className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                        />
                                    </div>
                                </div>

                                {/* Gender + Status side-by-side */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Gender Preference</label>
                                        <CustomSelect
                                            value={jobForm.gender}
                                            onChange={(val) => setJobForm({ ...jobForm, gender: val })}
                                            options={[
                                                { value: 'Any', label: 'Any' },
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' }
                                            ]}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Status</label>
                                        <div className="flex items-center gap-3 bg-[#0d1117] border border-[#30363d] rounded-lg p-2 px-3 h-[38px] w-full">
                                            <ToggleSwitch 
                                                checked={jobForm.status === 'active'}
                                                onChange={() => setJobForm({ ...jobForm, status: jobForm.status === 'active' ? 'inactive' : 'active' })}
                                            />
                                            <span className={`text-xs font-bold ${jobForm.status === 'active' ? 'text-[#2ea44f]' : 'text-[#8b949e]'}`}>
                                                {jobForm.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Platform — full width */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Platform *</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['pmc', 'epc'].map(p => {
                                             const selectedPlatforms = jobForm.platform ? jobForm.platform.split(',') : ['pmc'];
                                             const isSelected = selectedPlatforms.includes(p);
                                             return (
                                                 <button
                                                     key={p}
                                                     type="button"
                                                     onClick={() => handlePlatformToggle(p)}
                                                     className={`py-2.5 px-4 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                                         isSelected
                                                             ? p === 'epc'
                                                                 ? 'bg-purple-900/30 border-purple-700 text-purple-300'
                                                                 : 'bg-blue-900/30 border-blue-700 text-blue-300'
                                                             : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:border-[#58a6ff] hover:text-[#e6edf3]'
                                                     }`}
                                                 >
                                                     {p === 'pmc' ? 'PMC — Project Management' : 'EPC — Engineering & Procurement'}
                                                 </button>
                                             );
                                         })}
                                    </div>
                                    {currentEditingJob && currentEditingJob.platform !== jobForm.platform && (
                                        <p className="text-[10px] text-amber-400 mt-1.5 flex items-center gap-1">
                                            <AlertTriangle size={11} />
                                            This will update the job's assigned platform settings.
                                        </p>
                                    )}
                                </div>

                                {/* JD Upload — full width */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Job Description (JD)</label>

                                    {/* Current JD row with view link + remove button */}
                                    {jobForm.jd_file_path && !jobForm.remove_jd && (
                                        <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2.5 mb-2">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <FileText size={13} className="text-[#58a6ff] flex-shrink-0" />
                                                <a
                                                    href={getFileLink(jobForm.jd_file_path, 'jds')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[#58a6ff] text-xs hover:underline font-semibold truncate"
                                                >
                                                    {jobForm.jd_file_path.split('/').pop().split('\\').pop()}
                                                </a>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setJobForm({ ...jobForm, remove_jd: true, jd_file: null })}
                                                className="flex-shrink-0 ml-3 text-[10px] font-bold text-[#f85149] hover:underline cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    {/* Pending removal notice */}
                                    {jobForm.remove_jd && (
                                        <div className="flex items-center justify-between bg-[#da3633]/10 border border-[#da3633]/30 rounded-lg px-3 py-2 mb-2">
                                            <span className="text-xs text-[#f85149] font-semibold">JD will be removed on save</span>
                                            <button
                                                type="button"
                                                onClick={() => setJobForm({ ...jobForm, remove_jd: false })}
                                                className="text-[10px] text-[#8b949e] hover:text-[#e6edf3] font-bold cursor-pointer"
                                            >
                                                Undo
                                            </button>
                                        </div>
                                    )}

                                    {/* File picker drop zone */}
                                    <label className="relative flex flex-col items-center justify-center text-center border border-dashed border-[#30363d] hover:border-[#58a6ff] rounded-lg p-5 bg-[#0d1117] cursor-pointer transition-all group">
                                        <input
                                            key={jobForm.jd_file ? jobForm.jd_file.name : 'empty'}
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="sr-only"
                                            onChange={(e) => {
                                                const f = e.target.files?.[0];
                                                if (f) setJobForm({ ...jobForm, jd_file: f, remove_jd: false });
                                            }}
                                        />
                                        <Upload size={18} className="text-[#8b949e] group-hover:text-[#58a6ff] mb-2 transition-colors" />
                                        {jobForm.jd_file ? (
                                            <div className="text-xs text-[#e6edf3] space-y-0.5">
                                                <p className="font-bold text-[#58a6ff]">New file ready to upload</p>
                                                <p className="text-[#8b949e] truncate max-w-[280px]">{jobForm.jd_file.name}</p>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setJobForm({ ...jobForm, jd_file: null }); }}
                                                    className="text-[10px] text-[#f85149] hover:underline font-bold mt-1"
                                                >
                                                    Clear selection
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-[#8b949e] space-y-0.5">
                                                <p className="text-[#e6edf3] font-semibold group-hover:text-[#58a6ff] transition-colors">
                                                    {jobForm.jd_file_path && !jobForm.remove_jd ? 'Replace JD file' : 'Upload JD file'}
                                                </p>
                                                <p>PDF, DOC or DOCX &mdash; up to 50 MB</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-[#30363d] flex justify-end gap-3">
                                <button
                                    type="button" onClick={resetJobForm}
                                    className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white py-2 px-5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* CREATE / EDIT BLOG POST MODAL - Slides from Right Sidebar Drawer */}
            {isBlogModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={resetBlogForm} />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-2xl h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between">
                            <h3 className="text-lg font-bold text-[#e6edf3]">
                                {currentEditingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
                            </h3>
                            <button onClick={resetBlogForm} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleBlogSubmit} autoComplete="off" className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Article Title *</label>
                                    <input
                                        type="text" required value={blogForm.title}
                                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                        placeholder="e.g. The Future of Construction Project Management"
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Short Summary / Intro *</label>
                                    <textarea
                                        required rows={1} value={blogForm.summary}
                                        onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                                        placeholder="Write a brief intro/summary of the post..."
                                        ref={(el) => {
                                            if (el) {
                                                el.style.height = 'auto';
                                                el.style.height = `${el.scrollHeight}px`;
                                            }
                                        }}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58] resize-none overflow-hidden"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Author Name *</label>
                                    <input
                                        type="text" required value={blogForm.author}
                                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                                        placeholder="e.g. Mugilan Muthaiah"
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Author Designation</label>
                                    <input
                                        type="text" value={blogForm.author_role}
                                        onChange={(e) => setBlogForm({ ...blogForm, author_role: e.target.value })}
                                        placeholder="e.g. Founder & MD, MANO Projects"
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Category *</label>
                                    <CustomSelect
                                        value={blogForm.category}
                                        onChange={(val) => setBlogForm({ ...blogForm, category: val })}
                                        options={[
                                            { value: 'Project Management', label: 'Project Management' },
                                            { value: 'Cost & Finance', label: 'Cost & Finance' },
                                            { value: 'Quality & Safety', label: 'Quality & Safety' },
                                            { value: 'EPC & Construction', label: 'EPC & Construction' },
                                            { value: 'Industry Trends', label: 'Industry Trends' },
                                            { value: 'Real Estate', label: 'Real Estate' }
                                        ]}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Read Time (e.g. '8 min read')</label>
                                    <input
                                        type="text" value={blogForm.read_time}
                                        onChange={(e) => setBlogForm({ ...blogForm, read_time: e.target.value })}
                                        placeholder="e.g. 8 min read"
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">Banner Image *</label>
                                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                                        {/* Image Preview Window */}
                                        <div className="w-full sm:w-48 h-32 rounded-xl border border-[#30363d] bg-[#0d1117] overflow-hidden flex-shrink-0 flex items-center justify-center relative group/preview">
                                            {blogForm.blog_image ? (
                                                <img 
                                                    src={URL.createObjectURL(blogForm.blog_image)} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : blogForm.image ? (
                                                <img 
                                                    src={blogForm.image} 
                                                    alt="Current Banner" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-center p-3 text-[#484f58]">
                                                    <Image size={24} className="mb-1" />
                                                    <span className="text-[10px]">No image selected</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* File Upload Field */}
                                        <div className="flex-1 w-full space-y-2">
                                            <div className="relative border border-dashed border-[#30363d] hover:border-[#58a6ff] rounded-xl p-6 bg-[#0d1117] flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setBlogForm({ ...blogForm, blog_image: file });
                                                        }
                                                    }}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                                <Upload size={20} className="text-[#8b949e] mb-2" />
                                                <p className="text-xs text-[#e6edf3] font-semibold mb-0.5">
                                                    {blogForm.blog_image ? "Replace selected image" : "Choose a banner image"}
                                                </p>
                                                <p className="text-[10px] text-[#8b949e]">
                                                    PNG, JPG, JPEG, WEBP or GIF (up to 10MB)
                                                </p>
                                            </div>
                                            {blogForm.blog_image && (
                                                <div className="flex items-center justify-between bg-[#161b22] border border-[#30363d] px-3 py-1.5 rounded-lg">
                                                    <span className="text-[10px] text-[#8b949e] truncate max-w-[200px]">
                                                        {blogForm.blog_image.name}
                                                    </span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setBlogForm({ ...blogForm, blog_image: null })}
                                                        className="text-[#f85149] hover:underline text-[10px] font-bold cursor-pointer"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Tags (Comma-separated)</label>
                                    <input
                                        type="text" value={blogForm.tags}
                                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                                        placeholder="e.g. PMC, Cost Control, Residential"
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                    />
                                </div>
                                <div className="flex items-center gap-3 py-1">
                                    <input
                                        type="checkbox" id="blogFeatured" checked={blogForm.featured}
                                        onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                                        className="bg-[#0d1117] border border-[#30363d] focus:ring-[#58a6ff] h-4 w-4 text-[#1f6feb] rounded"
                                    />
                                    <label htmlFor="blogFeatured" className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer">Pin to Featured Post</label>
                                </div>

                                <div className="sm:col-span-2 border-t border-[#30363d] pt-4 mt-2">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wide">Article Sections</h4>
                                        <button
                                            type="button" onClick={addBlogSection}
                                            className="bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] border border-[#30363d] hover:border-[#58a6ff] py-1 px-3 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                        >
                                            <Plus size={12} /> Add Section
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {blogForm.sections.map((section, index) => (
                                            <div key={index} className="p-3 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-3 relative">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-bold text-[#8b949e]">Section #{index + 1}</span>
                                                    <button
                                                        type="button" onClick={() => removeBlogSection(index)}
                                                        className="text-red-400 hover:text-red-300 text-[10px] font-bold cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <input
                                                    type="text" required value={section.heading}
                                                    onChange={(e) => updateBlogSection(index, 'heading', e.target.value)}
                                                    placeholder="Section Heading"
                                                    className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2 text-xs text-[#e6edf3] outline-none"
                                                />
                                                <textarea
                                                    required rows={1} value={section.body}
                                                    onChange={(e) => updateBlogSection(index, 'body', e.target.value)}
                                                    placeholder="Section Body Content (Use **bold** for headings or emphasis if needed)"
                                                    ref={(el) => {
                                                        if (el) {
                                                            el.style.height = 'auto';
                                                            el.style.height = `${el.scrollHeight}px`;
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        e.target.style.height = 'auto';
                                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                                    }}
                                                    className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2 text-xs text-[#e6edf3] outline-none resize-none overflow-hidden"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="sm:col-span-2 border-t border-[#30363d] pt-4 mt-2">
                                    <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Key Takeaways (one per line)</label>
                                    <textarea
                                        rows={1} value={blogForm.keyTakeaways}
                                        onChange={(e) => setBlogForm({ ...blogForm, keyTakeaways: e.target.value })}
                                        placeholder="Takeaway 1&#10;Takeaway 2&#10;Takeaway 3"
                                        ref={(el) => {
                                            if (el) {
                                                el.style.height = 'auto';
                                                el.style.height = `${el.scrollHeight}px`;
                                            }
                                        }}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                        className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58] resize-none overflow-hidden"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#30363d] flex justify-end gap-3">
                                <button
                                    type="button" onClick={resetBlogForm}
                                    className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white py-2 px-5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* VIEW JOB DETAILS RIGHT-SLIDING DRAWER */}
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
                                
                                {/* Candidates Applied Section */}
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

            {/* CANDIDATE DETAILS RIGHT-SLIDING DRAWER */}
            {viewingCandidate && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div
                        className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm"
                        onClick={() => setViewingCandidate(null)}
                    />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        {/* Header */}
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

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">

                            {/* Applied Role */}
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

                            {/* Date Applied */}
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

                            {/* Contact Email */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Contact Email</span>
                                <span className="text-[#e6edf3] font-medium text-sm flex items-center gap-2">
                                    <Mail size={13} className="text-[#58a6ff] flex-shrink-0" />
                                    <a href={`mailto:${viewingCandidate.email}`} className="hover:text-[#58a6ff] transition-colors">
                                        {viewingCandidate.email}
                                    </a>
                                </span>
                            </div>

                            {/* Resume / CV */}
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

                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-[#30363d] flex gap-3 bg-[#0d1117]/30 flex-shrink-0">
                            <a
                                href={getResumeLink(viewingCandidate.file_path)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-[#1f6feb] hover:bg-[#388bfd] text-white py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                                <Download size={14} />
                                Download Resume
                            </a>
                            <button
                                onClick={() => {
                                    handleDeleteCandidate(viewingCandidate.id);
                                    setViewingCandidate(null);
                                }}
                                className="bg-[#21262d] hover:bg-[#da3633]/20 hover:text-[#f85149] hover:border-[#f85149] border border-[#30363d] text-[#8b949e] py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW BLOG DETAILS RIGHT-SLIDING DRAWER */}
            {viewingBlog && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={() => setViewingBlog(null)} />
                    <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-xl h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                        <div className="p-6 border-b border-[#30363d] flex items-center justify-between flex-shrink-0">
                            <div>
                                <span className="bg-[#1f6feb]/15 border border-[#388bfd]/30 text-[#58a6ff] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {viewingBlog.category}
                                </span>
                                <h3 className="text-lg font-bold text-[#e6edf3] mt-2">
                                    {viewingBlog.title}
                                </h3>
                            </div>
                            <button onClick={() => setViewingBlog(null)} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer p-1">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            {viewingBlog.image && (
                                <div className="w-full h-48 rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117]">
                                    <img src={viewingBlog.image} alt={viewingBlog.title} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="space-y-4 text-xs text-[#c9d1d9]">
                                <div>
                                    <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Summary</span>
                                    <p className="font-medium text-[#e6edf3] leading-relaxed">{viewingBlog.summary}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-[#30363d] pt-4">
                                    <div>
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Author</span>
                                        <p className="font-medium text-[#e6edf3]">{viewingBlog.author} {viewingBlog.author_role && `(${viewingBlog.author_role})`}</p>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Date</span>
                                        <p className="font-medium text-[#e6edf3]">{viewingBlog.date}</p>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Read Time</span>
                                        <p className="font-medium text-[#e6edf3]">{viewingBlog.read_time}</p>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-1">Featured</span>
                                        <p className="font-medium text-[#e6edf3]">{viewingBlog.featured ? '★ Yes' : 'No'}</p>
                                    </div>
                                </div>

                                {viewingBlog.tags && (
                                    <div className="border-t border-[#30363d] pt-4">
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-2">Tags</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(() => {
                                                try {
                                                    const parsedTags = typeof viewingBlog.tags === 'string' ? JSON.parse(viewingBlog.tags) : viewingBlog.tags;
                                                    if (Array.isArray(parsedTags)) {
                                                        return parsedTags.map((t, idx) => (
                                                            <span key={idx} className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-2 py-0.5 rounded text-[10px]">
                                                                {t}
                                                            </span>
                                                        ));
                                                    }
                                                } catch (e) {}
                                                return <span className="text-gray-500 italic">No tags</span>;
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {viewingBlog.content && (
                                    <div className="border-t border-[#30363d] pt-4">
                                        <span className="block text-[10px] font-semibold text-[#8b949e] uppercase tracking-wider mb-2">Detailed Content Sections</span>
                                        <div className="space-y-4">
                                            {(() => {
                                                try {
                                                    const contentObj = typeof viewingBlog.content === 'string' ? JSON.parse(viewingBlog.content) : viewingBlog.content;
                                                    if (contentObj) {
                                                        return (
                                                            <>
                                                                {Array.isArray(contentObj.sections) && contentObj.sections.map((sec, idx) => (
                                                                    <div key={idx} className="space-y-1.5 bg-[#0d1117] border border-[#30363d] p-3 rounded-lg">
                                                                        <h4 className="font-bold text-xs text-[#58a6ff]">{sec.heading || `Section ${idx + 1}`}</h4>
                                                                        <p className="text-[#c9d1d9] leading-relaxed whitespace-pre-line">{sec.body}</p>
                                                                    </div>
                                                                ))}
                                                                {Array.isArray(contentObj.keyTakeaways) && contentObj.keyTakeaways.length > 0 && (
                                                                    <div className="space-y-1.5 bg-amber-900/10 border border-amber-800/30 p-3 rounded-lg">
                                                                        <h4 className="font-bold text-xs text-amber-400">Key Takeaways</h4>
                                                                        <ul className="list-disc pl-4 space-y-1 text-[#c9d1d9]">
                                                                            {contentObj.keyTakeaways.map((takeaway, idx) => (
                                                                                <li key={idx}>{takeaway}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </>
                                                        );
                                                    }
                                                } catch (e) {}
                                                return <p className="text-gray-500 italic">No sectioned content</p>;
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
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
                                Edit Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SAVING JOB OVERLAY */}
            {isSavingJob && (
                <div className="fixed inset-0 bg-[#040d21]/70 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="bg-[#161b22]/90 border border-[#30363d] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center gap-6 text-center backdrop-blur-xl">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-[#30363d]"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-t-[#58a6ff] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                            <Briefcase className="w-6 h-6 text-[#58a6ff] animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-[#e6edf3]">
                                {currentEditingJob ? 'Updating Job Opening...' : 'Creating Job Opening...'}
                            </h3>
                            <p className="text-xs text-[#8b949e] leading-relaxed max-w-[240px]">
                                Please wait while we process the job description and publish to the live careers page.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* SAVING BLOG OVERLAY */}
            {isSavingBlog && (
                <div className="fixed inset-0 bg-[#040d21]/70 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="bg-[#161b22]/90 border border-[#30363d] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center gap-6 text-center backdrop-blur-xl">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-[#30363d]"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-t-[#58a6ff] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                            <FileText className="w-6 h-6 text-[#58a6ff] animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-[#e6edf3]">
                                {currentEditingBlog ? 'Updating Blog Post...' : 'Creating Blog Post...'}
                            </h3>
                            <p className="text-xs text-[#8b949e] leading-relaxed max-w-[240px]">
                                Please wait while we publish the article to the live insights page.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE JOB OPENING CONFIRMATION MODAL */}
            {deleteConfirmJob && (
                <div className="fixed inset-0 bg-[#040d21]/80 backdrop-blur-sm z-[9999] flex items-center justify-center animate-in fade-in duration-200 p-4">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden" style={{animation: 'modalZoomIn 0.2s ease-out'}}>
                        
                        {/* Red accent top strip */}
                        <div className="h-1 w-full bg-gradient-to-r from-[#da3633] to-[#f85149]" />
                        
                        {/* Header */}
                        <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#da3633]/15 border border-[#da3633]/30 flex items-center justify-center flex-shrink-0">
                                    <Trash2 size={18} className="text-[#f85149]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#f85149]">Delete Job Opening</h3>
                                    <p className="text-[10px] text-[#8b949e] mt-0.5">This action cannot be undone</p>
                                </div>
                            </div>
                            <button
                                onClick={() => !isDeletingJob && setDeleteConfirmJob(null)}
                                className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer flex-shrink-0 mt-0.5"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 pb-5 space-y-4">
                            {/* Job preview card */}
                            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-[#e6edf3]">{deleteConfirmJob.title}</span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                        deleteConfirmJob.platform?.toLowerCase() === 'epc'
                                            ? 'bg-purple-900/30 border border-purple-800/50 text-purple-400'
                                            : 'bg-blue-900/30 border border-blue-800/50 text-blue-400'
                                    }`}>
                                        {deleteConfirmJob.platform?.toUpperCase() || 'PMC'}
                                    </span>
                                </div>
                                {deleteConfirmJob.details?.Location && (
                                    <p className="text-[11px] text-[#8b949e] flex items-center gap-1.5">
                                        <MapPin size={11} />
                                        {deleteConfirmJob.details.Location}
                                    </p>
                                )}
                            </div>

                            {/* Warning message */}
                            <div className="bg-[#da3633]/8 border border-[#da3633]/25 rounded-xl px-4 py-3 flex items-start gap-3">
                                <AlertTriangle size={15} className="text-[#f85149] flex-shrink-0 mt-0.5" />
                                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                                    This will <span className="text-[#f85149] font-semibold">permanently remove</span> the job opening from the live website and delete any attached JD file. Existing applications from candidates will not be affected.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-[#0d1117]/60 border-t border-[#30363d] flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={isDeletingJob}
                                onClick={() => setDeleteConfirmJob(null)}
                                className="bg-[#21262d] hover:bg-[#30363d] disabled:opacity-50 border border-[#30363d] text-[#c9d1d9] py-2 px-5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={isDeletingJob}
                                onClick={confirmDeleteJob}
                                className="bg-[#da3633] hover:bg-[#f85149] disabled:opacity-70 disabled:cursor-not-allowed text-white py-2 px-5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-2"
                            >
                                {isDeletingJob ? (
                                    <>
                                        <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={13} />
                                        Yes, Delete It
                                    </>
                                )}
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
