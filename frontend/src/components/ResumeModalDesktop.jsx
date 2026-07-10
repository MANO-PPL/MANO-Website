import React, { useState, useRef } from 'react';
import { X, Send, User, Mail, Briefcase, Upload, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from './Toast';
import { RESUME_API_URL } from '../config';
import { useCompany } from '../context/CompanyContext';

const ResumeModalDesktop = ({ isOpen, onClose, jobRole = "" }) => {
    const { brand: activeBrand } = useCompany();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const showToast = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        job_role: jobRole,
        file: null
    });

    const [errors, setErrors] = useState({});

    // Sync the jobRole prop to the state when the modal opens or changes
    React.useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                job_role: jobRole || "General Application"
            }));
        }
    }, [isOpen, jobRole]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) {
                showToast("File size exceeds 50MB limit.", 'error');
                return;
            }
            setFormData({ ...formData, file });
            if (errors.file) setErrors(prev => ({ ...prev, file: '' }));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.size > 50 * 1024 * 1024) {
                showToast("File size exceeds 50MB limit.", 'error');
                return;
            }
            setFormData({ ...formData, file });
            if (errors.file) setErrors(prev => ({ ...prev, file: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
        if (!formData.file) newErrors.file = 'Please upload your resume';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        const API_URL = RESUME_API_URL;

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("job_role", formData.job_role || "General Application");
            data.append("platform", (activeBrand || "pmc").toLowerCase());
            data.append("resume_file", formData.file);

            const response = await fetch(API_URL, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    onClose();
                    setSubmitted(false);
                    setFormData({ name: '', email: '', job_role: '', file: null });
                }, 3000);
            } else {
                showToast("Failed to upload resume: " + (result.message || "Unknown error"), 'error');
            }
        } catch (error) {
            console.error("Upload Error:", error);
            showToast("Network error. Please try again later.", 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-xl rounded-2xl p-px z-10 animate-modal-zoom bg-gradient-to-br from-white/20 via-white/5 to-white/10">
                <div className="relative bg-black/90 backdrop-blur-2xl rounded-[15px] p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full -z-10 pointer-events-none"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all group z-20"
                    >
                        <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    {submitted ? (
                        <div className="text-center py-12 flex flex-col items-center animate-fade-in-up">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 border border-green-500/30">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Application Sent!</h2>
                            <p className="text-base text-gray-400">Thank you for applying. We'll review your resume and get back to you soon.</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Apply for {jobRole || "Open Positions"}</h2>
                                <p className="text-gray-400 text-sm">Upload your resume and we'll be in touch.</p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                <div>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            className={`w-full pl-12 pr-5 py-3.5 text-base rounded-xl bg-white/5 border ${errors.name ? 'border-red-500/70' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 hover:border-blue-500/30 transition-all`}
                                            value={formData.name}
                                            onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 ml-1 text-sm text-red-400">{errors.name}</p>}
                                </div>

                                <div>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            className={`w-full pl-12 pr-5 py-3.5 text-base rounded-xl bg-white/5 border ${errors.email ? 'border-red-500/70' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 hover:border-blue-500/30 transition-all`}
                                            value={formData.email}
                                            onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 ml-1 text-sm text-red-400">{errors.email}</p>}
                                </div>

                                {/* File Upload Zone */}
                                <div>
                                    <div
                                        className={`relative group border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-500/10' : errors.file ? 'border-red-500/70 bg-white/5' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />

                                        {formData.file ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-900/40">
                                                    <FileText size={24} />
                                                </div>
                                                <p className="text-base text-white font-medium mb-1 truncate max-w-[220px]">{formData.file.name}</p>
                                                <p className="text-gray-500 text-xs">{(formData.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, file: null }); }}
                                                    className="mt-3 text-xs text-red-400 hover:text-red-300 font-medium underline underline-offset-4"
                                                >
                                                    Remove and replace
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                    <Upload size={24} />
                                                </div>
                                                <h4 className="text-base text-white font-medium mb-1">Upload Your Resume</h4>
                                                <p className="text-gray-500 text-xs">Drag & drop or <span className="text-blue-400">browse files</span></p>
                                                <p className="text-gray-600 text-[10px] mt-4 uppercase tracking-widest">PDF, DOC, DOCX up to 50MB</p>
                                            </>
                                        )}
                                    </div>
                                    {errors.file && <p className="mt-1 ml-1 text-sm text-red-400">{errors.file}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 text-base rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Submit Application'}
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeModalDesktop;
