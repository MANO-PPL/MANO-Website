import { useState, useEffect } from 'react';
import { X, Send, User, Mail, MessageSquare, Building2, Phone, Briefcase, ChevronDown, Loader2 } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { useToast } from './Toast';
import { ENQUIRY_API_URL } from '../config';

const ContactModalMobile = ({ isOpen, onClose, initialService = '' }) => {
    const { isEPC } = useCompany();
    const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(initialService);
    const showToast = useToast();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        contact_whatsapp: '',
        email: '',
        project_details: ''
    });

    // Sync initialService when the modal opens or prop changes
    useEffect(() => {
        if (isOpen && initialService) {
            setSelectedService(initialService);
        } else if (isOpen && !initialService) {
            setSelectedService(''); // reset if opened without specific service
        }
    }, [isOpen, initialService]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
        if (!selectedService) newErrors.service = 'Please select a service';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        const API_URL = ENQUIRY_API_URL;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    service_required: selectedService
                }),
            });

            const result = await response.json();

            if (response.ok) {
                showToast("Enquiry submitted successfully!", 'success');
                setFormData({
                    name: '',
                    company_name: '',
                    contact_whatsapp: '',
                    email: '',
                    project_details: ''
                });
                setSelectedService('');
                onClose();
            } else {
                showToast("Failed to submit enquiry: " + result.message, 'error');
            }
        } catch (error) {
            console.error("Network Error:", error);
            showToast("Network error. Please try again later.", 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const pcplServices = [
        "Project Management",
        "Project Execution",
        "Project Planning",
        "Contract Management",
        "QA/QC and Auditing",
        "Cost Consultancy",
        "QS and Auditing",
        "EHS Audit",
        "Enquiry"
    ];

    const pplServices = [
        "EPC Solution",
        "Enquiry"
    ];

    const services = isEPC ? pplServices : pcplServices;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 pointer-events-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Bottom Sheet Modal Content - Glassmorphism */}
            <div className="relative w-full rounded-t-3xl rounded-b-none p-0.5 z-10 animate-slide-up">
                {/* Gradient Border Wrapper */}
                <div className="absolute inset-0 rounded-t-3xl rounded-b-none bg-gradient-to-br from-white/20 via-white/5 to-white/10 blur-[1px]"></div>

                <div className="relative bg-black/85 backdrop-blur-2xl rounded-t-[24px] rounded-b-none border-t border-x border-white/10 p-5 shadow-2xl overflow-hidden max-h-[85dvh] overflow-y-auto custom-scrollbar">
                    {/* Visual drag handle indicator for bottom sheet */}
                    <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5"></div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full -z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-600/5 blur-[60px] rounded-full -z-10 pointer-events-none"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-transparent hover:border-white/20 group z-20"
                    >
                        <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div className="text-center mb-6 pr-8">
                        <h2 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Get in Touch</h2>
                        <p className="text-gray-400 text-xs">Fill in the details below and we'll get back to you.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Name */}
                        <div>
                            <div className="relative group">
                                <User className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => { handleChange(e); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
                                    placeholder="Full Name *"
                                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border ${errors.name ? 'border-red-500/70' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all font-medium`}
                                />
                            </div>
                            {errors.name && <p className="mt-1 ml-1 text-xs text-red-400">{errors.name}</p>}
                        </div>

                        {/* Company Name */}
                        <div className="relative group">
                            <Building2 className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all font-medium"
                            />
                        </div>

                        {/* Contact / WhatsApp */}
                        <div className="relative group">
                            <Phone className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                name="contact_whatsapp"
                                value={formData.contact_whatsapp}
                                onChange={handleChange}
                                placeholder="Contact / WhatsApp"
                                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all font-medium"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <div className="relative group">
                                <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => { handleChange(e); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                                    placeholder="Email Address *"
                                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border ${errors.email ? 'border-red-500/70' : 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all font-medium`}
                                />
                            </div>
                            {errors.email && <p className="mt-1 ml-1 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        {/* Service Required */}
                        <div>
                            <div className="relative group">
                                <Briefcase className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-400 transition-colors z-10" />
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setServiceDropdownOpen(!serviceDropdownOpen); if (errors.service) setErrors(prev => ({ ...prev, service: '' })); }}
                                        className={`w-full pl-10 pr-4 py-3 text-left rounded-xl bg-white/5 border ${errors.service ? 'border-red-500/70' : 'border-white/10'} text-white focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all font-medium text-sm flex justify-between items-center`}
                                    >
                                        <span className={selectedService ? "text-white" : "text-gray-500"}>
                                            {selectedService || "Service Required"}
                                        </span>
                                        <ChevronDown size={18} className={`text-gray-500 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {serviceDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden z-30 max-h-48 overflow-y-auto">
                                            {services.map((service, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedService(service);
                                                        setServiceDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors"
                                                >
                                                    {service}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errors.service && <p className="mt-1 ml-1 text-xs text-red-400">{errors.service}</p>}
                        </div>

                        {/* Project Details */}
                        <div className="relative group">
                            <MessageSquare className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <textarea
                                name="project_details"
                                value={formData.project_details}
                                onChange={handleChange}
                                placeholder="Project Details..."
                                rows={3}
                                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 hover:border-blue-500/30 transition-all resize-none font-medium"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-5 py-3.5 text-sm rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30 flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactModalMobile;
