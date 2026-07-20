import React from 'react';
import { Search, Filter, MessageSquare, Mail, Phone, Calendar, Eye, Trash2 } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const EnquiriesTab = ({
    enquirySearch,
    setEnquirySearch,
    enquiryServiceFilter,
    setEnquiryServiceFilter,
    enquiries,
    enquiriesLoading,
    setViewingEnquiry,
    setDeleteConfirmEnquiry
}) => {
    const filteredEnquiries = enquiries.filter(e => {
        const matchesSearch = 
            (e.name && e.name.toLowerCase().includes(enquirySearch.toLowerCase())) ||
            (e.email && e.email.toLowerCase().includes(enquirySearch.toLowerCase())) ||
            (e.company_name && e.company_name.toLowerCase().includes(enquirySearch.toLowerCase())) ||
            (e.service_required && e.service_required.toLowerCase().includes(enquirySearch.toLowerCase())) ||
            (e.project_details && e.project_details.toLowerCase().includes(enquirySearch.toLowerCase()));
            
        const matchesService = enquiryServiceFilter === 'All' || e.service_required === enquiryServiceFilter;
        return matchesSearch && matchesService;
    });

    const uniqueServices = ['All', ...Array.from(new Set(enquiries.map(e => e.service_required).filter(Boolean)))];

    return (
        <div className="space-y-6">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-[#161b22] p-4 rounded-xl border border-[#30363d]">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={16} />
                    <input
                        type="text"
                        value={enquirySearch}
                        onChange={(e) => setEnquirySearch(e.target.value)}
                        placeholder="Search by client name, email, company, or details..."
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 text-xs text-[#e6edf3] focus:border-[#58a6ff] transition-all outline-none placeholder-[#484f58]"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Filter size={14} className="text-[#8b949e]" />
                    <CustomSelect
                        value={enquiryServiceFilter}
                        onChange={setEnquiryServiceFilter}
                        options={uniqueServices.map(service => ({ value: service, label: service === 'All' ? 'All Services' : service }))}
                        className="min-w-[170px]"
                    />
                </div>
            </div>

            {enquiriesLoading ? (
                <div className="h-48 flex flex-col items-center justify-center gap-3 text-[#8b949e]">
                    <div className="w-8 h-8 border-2 border-[#1f6feb] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Fetching client enquiries...</span>
                </div>
            ) : filteredEnquiries.length === 0 ? (
                <div className="h-48 border border-dashed border-[#30363d] rounded-xl flex flex-col items-center justify-center text-[#8b949e] gap-2">
                    <MessageSquare size={32} className="opacity-40" />
                    <p className="text-xs font-semibold">No client enquiries found</p>
                    <p className="text-[10px] text-[#484f58]">Try adjusting your search query or filters</p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-[#30363d] rounded-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#161b22] text-[#8b949e] border-b border-[#30363d] text-[10px] font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Client Name & Email</th>
                                <th className="px-6 py-4">Company Name</th>
                                <th className="px-6 py-4">WhatsApp Contact</th>
                                <th className="px-6 py-4">Service Required</th>
                                <th className="px-6 py-4">Submitted Date</th>
                                <th className="px-6 py-4 max-w-[200px]">Project Details</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#30363d]/60 text-xs text-[#c9d1d9]">
                            {filteredEnquiries.map(e => (
                                <tr
                                    key={e.id}
                                    onClick={() => setViewingEnquiry(e)}
                                    className="hover:bg-[#161b22]/80 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-[#e6edf3] text-sm group-hover:text-[#58a6ff] transition-colors">{e.name}</p>
                                            <p className="text-xs text-[#8b949e] flex items-center gap-1.5 mt-0.5">
                                                <Mail size={12} />
                                                {e.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {e.company_name ? (
                                            <span className="font-medium text-[#e6edf3]">{e.company_name}</span>
                                        ) : (
                                            <span className="text-[#484f58] italic">Not specified</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {e.contact_whatsapp ? (
                                            <a
                                                href={`https://wa.me/${e.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(evt) => evt.stopPropagation()}
                                                className="inline-flex items-center gap-1.5 text-[#2ea44f] hover:underline font-semibold"
                                                title="Chat on WhatsApp"
                                            >
                                                <Phone size={12} />
                                                {e.contact_whatsapp}
                                            </a>
                                        ) : (
                                            <span className="text-[#484f58] italic">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-[#1f6feb]/15 border border-[#388bfd]/30 text-[#58a6ff] px-2.5 py-1 rounded text-[10px] font-bold tracking-wide inline-block">
                                            {e.service_required}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-[#8b949e] flex items-center gap-1.5">
                                            <Calendar size={12} />
                                            {new Date(e.created_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 max-w-[200px]">
                                        {e.project_details ? (
                                            <p className="text-[#8b949e] truncate" title={e.project_details}>
                                                {e.project_details}
                                            </p>
                                        ) : (
                                            <span className="text-[#484f58] italic">No details provided</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2" onClick={(evt) => evt.stopPropagation()}>
                                            <button
                                                onClick={() => setViewingEnquiry(e)}
                                                className="text-[#c9d1d9] hover:text-[#58a6ff] p-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] rounded-md transition-all cursor-pointer"
                                                title="View Details"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmEnquiry(e)}
                                                className="text-[#c9d1d9] hover:text-[#f85149] p-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#f85149] rounded-md transition-all cursor-pointer"
                                                title="Delete Enquiry"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EnquiriesTab;
