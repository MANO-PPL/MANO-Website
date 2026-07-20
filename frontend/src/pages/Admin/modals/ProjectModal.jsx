import React from 'react';
import { X, Upload } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import ToggleSwitch from '../components/ToggleSwitch';

const ProjectModal = ({
    isOpen,
    onClose,
    currentEditingProject,
    projectForm,
    setProjectForm,
    handleProjectSubmit,
    isSavingProject,
    projectImageInputRef,
    handleProjectImageAdd,
    removeExistingProjectImage,
    removeNewProjectImage
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-xl h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                <div className="p-6 border-b border-[#30363d] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#e6edf3]">
                        {currentEditingProject ? 'Edit Project Masterpiece' : 'Publish New Project'}
                    </h3>
                    <button onClick={onClose} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleProjectSubmit} autoComplete="off" className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Project Title *</label>
                            <input
                                type="text" required value={projectForm.title}
                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                placeholder="e.g. Hotel Moon Palace"
                                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                            />
                        </div>

                        {/* Location + Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Location</label>
                                <input
                                    type="text" value={projectForm.location}
                                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                                    placeholder="e.g. Kinshasa, Congo"
                                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Category *</label>
                                <CustomSelect
                                    value={projectForm.category}
                                    onChange={(val) => setProjectForm({ ...projectForm, category: val })}
                                    options={[
                                        { label: 'Commercial', value: 'Commercial' },
                                        { label: 'Residential', value: 'Residential' },
                                        { label: 'Hospitality', value: 'Hospitality' },
                                        { label: 'Industrial', value: 'Industrial' },
                                        { label: 'International', value: 'International' },
                                        { label: 'Infrastructure', value: 'Infrastructure' }
                                    ]}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Scope of Work */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Scope of Work</label>
                            <input
                                type="text" value={projectForm.scope}
                                onChange={(e) => setProjectForm({ ...projectForm, scope: e.target.value })}
                                placeholder="e.g. PMC - Project Management Consultants"
                                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                            />
                        </div>

                        {/* Highlight/Description */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Highlight/Description</label>
                            <textarea
                                rows={3} value={projectForm.highlight}
                                onChange={(e) => setProjectForm({ ...projectForm, highlight: e.target.value })}
                                placeholder="Briefly summarize project details, scale or impact..."
                                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                            />
                        </div>

                        {/* Display Order + Status + Featured */}
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div>
                                <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Display Order</label>
                                <input
                                    type="number" value={projectForm.display_order}
                                    onChange={(e) => setProjectForm({ ...projectForm, display_order: e.target.value })}
                                    placeholder="0"
                                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] outline-none placeholder-[#484f58]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-1.5">Status</label>
                                <CustomSelect
                                    value={projectForm.status}
                                    onChange={(val) => setProjectForm({ ...projectForm, status: val })}
                                    options={[
                                        { label: 'Active', value: 'active' },
                                        { label: 'Inactive', value: 'inactive' }
                                    ]}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">Featured Project</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-bold uppercase ${projectForm.featured ? 'text-amber-400' : 'text-gray-500'}`}>
                                        {projectForm.featured ? "Featured" : "Standard"}
                                    </span>
                                    <ToggleSwitch
                                        checked={projectForm.featured}
                                        onChange={() => setProjectForm({ ...projectForm, featured: !projectForm.featured })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Multiple Image Upload */}
                        <div className="border-t border-[#30363d] pt-4 mt-2">
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2.5">Project Gallery Images (Max 20)</label>
                            
                            {/* Upload box */}
                            <div className="relative border border-dashed border-[#30363d] hover:border-[#58a6ff] rounded-xl p-6 bg-[#0d1117] flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                                <input
                                    ref={projectImageInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleProjectImageAdd}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <Upload size={20} className="text-[#8b949e] mb-2" />
                                <p className="text-xs text-[#e6edf3] font-semibold mb-0.5">Click to choose image files</p>
                                <p className="text-[10px] text-[#8b949e]">Select multiple files (PNG, JPG, WEBP, GIF up to 15MB each)</p>
                            </div>

                            {/* Image previews list */}
                            {(projectForm.existingImages.length > 0 || projectForm.newImageFiles.length > 0) && (
                                <div className="mt-4 bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
                                    <span className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-wider mb-3">
                                        Image Gallery Previews ({projectForm.existingImages.length + projectForm.newImageFiles.length} Selected)
                                    </span>
                                    <div className="grid grid-cols-4 gap-3">
                                        {/* Existing images */}
                                        {projectForm.existingImages.map((imgUrl, idx) => (
                                            <div key={`exist-${idx}`} className="relative aspect-square rounded-lg border border-[#30363d] overflow-hidden group">
                                                <img src={imgUrl} alt={`Existing ${idx}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingProjectImage(imgUrl)}
                                                        className="bg-[#da3633] hover:bg-[#f85149] text-white p-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* New files */}
                                        {projectForm.newImageFiles.map((file, idx) => (
                                            <div key={`new-${idx}`} className="relative aspect-square rounded-lg border border-[#30363d] overflow-hidden group">
                                                <img src={URL.createObjectURL(file)} alt={`New ${idx}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeNewProjectImage(idx)}
                                                        className="bg-[#da3633] hover:bg-[#f85149] text-white p-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                            type="submit" disabled={isSavingProject}
                            className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white py-2 px-5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-colors flex items-center gap-2"
                        >
                            {isSavingProject ? 'Publishing...' : 'Publish Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;
