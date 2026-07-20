import React from 'react';
import { Search, Filter, Users, Briefcase, Mail, Phone, Calendar, Download, Trash2, MapPin, Clock, FileText, Edit2, Plus } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import ToggleSwitch from '../components/ToggleSwitch';
import { API_BASE_URL } from '../../../config';

const CareersTab = ({
    activeTab,
    subTab,
    setSubTab,
    stats,
    candidates,
    candidatesLoading,
    candidateSearch,
    setCandidateSearch,
    candidateRoleFilter,
    setCandidateRoleFilter,
    candidateRoles,
    filteredCandidates,
    setViewingCandidate,
    handleDeleteCandidate,
    jobs,
    jobsLoading,
    jobSearch,
    setJobSearch,
    jobLocationFilter,
    setJobLocationFilter,
    jobLocations,
    filteredJobs,
    openCreateModal,
    openEditModal,
    handleDeleteJob,
    handleToggleJobStatus,
    setViewingJob
}) => {
    const getResumeLink = (filePath) => {
        if (!filePath) return '#';
        const filename = filePath.split('/').pop().split('\\').pop();
        return `${API_BASE_URL}/api/resumes/view/${filename}`;
    };

    const getFileLink = (filePath, subFolder = 'resumes') => {
        if (!filePath) return '#';
        const filename = filePath.split('/').pop().split('\\').pop();
        if (subFolder === 'jds') {
            return `${API_BASE_URL}/api/jds/view/${filename}`;
        }
        return `${API_BASE_URL}/api/resumes/view/${filename}`;
    };

    return (
        <div className="space-y-6">
            {/* Desktop Careers Sub-tabs Switcher */}
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

            {/* 1. CANDIDATES PORTAL VIEW */}
            {subTab === 'candidates' && (
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
                                        <th className="px-6 py-4">Mobile Number</th>
                                        <th className="px-6 py-4">Platform</th>
                                        <th className="px-6 py-4">Applied Role</th>
                                        <th className="px-6 py-4">Date Applied</th>
                                        <th className="px-6 py-4 max-w-[150px] truncate">Resume File</th>
                                        <th className="px-6 py-4 max-w-[250px]">Remarks</th>
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
                                                {c.mobile ? (
                                                    <a 
                                                        href={`tel:${c.mobile}`} 
                                                        onClick={(e) => e.stopPropagation()} 
                                                        className="hover:text-[#58a6ff] flex items-center gap-1.5 text-[#c9d1d9] font-medium"
                                                    >
                                                        <Phone size={12} className="text-[#8b949e]" />
                                                        {c.mobile}
                                                    </a>
                                                ) : (
                                                    <span className="text-[#484f58] font-light">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${c.platform?.toLowerCase() === 'epc' ? 'bg-purple-900/30 border border-purple-800/50 text-purple-400' : 'bg-blue-900/30 border border-blue-800/50 text-blue-400'}`}>
                                                    {c.platform || 'pmc'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide border inline-block whitespace-nowrap ${
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
                                            <td className="px-6 py-4 max-w-[150px]">
                                                <a
                                                    href={getResumeLink(c.file_path)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 text-[#58a6ff] hover:underline font-semibold max-w-full"
                                                >
                                                    <Download size={12} className="flex-shrink-0" />
                                                    <span className="truncate" title={c.file_name || 'Download Resume'}>
                                                        {c.file_name || 'Download Resume'}
                                                    </span>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 max-w-[250px]">
                                                {c.remarks ? (
                                                    <div className="text-[#c9d1d9] line-clamp-3 whitespace-normal break-words" title={c.remarks}>
                                                        {c.remarks}
                                                    </div>
                                                ) : (
                                                    <span className="text-[#484f58] font-light">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteCandidate(c); }}
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
            {subTab === 'jobs' && (
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
        </div>
    );
};

export default CareersTab;
