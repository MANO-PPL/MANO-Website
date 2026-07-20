import React from 'react';
import { X, AlertTriangle, FileText, Upload } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import ToggleSwitch from '../components/ToggleSwitch';
import { API_BASE_URL } from '../../../config';

const JobModal = ({
    isOpen,
    onClose,
    currentEditingJob,
    jobForm,
    setJobForm,
    handleJobSubmit,
    isSavingJob
}) => {
    if (!isOpen) return null;

    const handlePlatformToggle = (p) => {
        const selectedPlatforms = jobForm.platform ? jobForm.platform.split(',') : ['pmc'];
        let newPlatforms;
        if (selectedPlatforms.includes(p)) {
            newPlatforms = selectedPlatforms.filter(item => item !== p);
            if (newPlatforms.length === 0) newPlatforms = [p];
        } else {
            newPlatforms = [...selectedPlatforms, p];
        }
        setJobForm({ ...jobForm, platform: newPlatforms.join(',') });
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
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-lg h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                <div className="p-6 border-b border-[#30363d] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#e6edf3]">
                        {currentEditingJob ? 'Edit Job Opening' : 'Create Job Opening'}
                    </h3>
                    <button onClick={onClose} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleJobSubmit} autoComplete="off" className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="space-y-4">
                        {/* Job Title */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Job Title *</label>
                            <input
                                type="text" required value={jobForm.title}
                                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                placeholder="e.g. Senior Billing Engineer"
                                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                            />
                        </div>

                        {/* Qualification + Location */}
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

                        {/* Gender + Status */}
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

                        {/* Platform */}
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

                        {/* JD Upload */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Job Description (JD)</label>

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
                            type="button" onClick={onClose}
                            className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSavingJob}
                            className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white py-2 px-5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-colors flex items-center gap-2"
                        >
                            {isSavingJob ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobModal;
