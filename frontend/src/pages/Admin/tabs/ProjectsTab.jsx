import React from 'react';
import { Search, X, Plus, FolderOpen, Star, Image, MapPin, Award, Edit2, Trash2 } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import ToggleSwitch from '../components/ToggleSwitch';
import { PROJECTS_ADMIN_API_URL, PROJECTS_API_URL } from '../../../config';
import { toast } from 'react-toastify';

const ADMIN_PROJECTS_BASE_URL = PROJECTS_ADMIN_API_URL || PROJECTS_API_URL;

const ProjectsTab = ({
    token,
    projectSearch,
    setProjectSearch,
    projectStatusFilter,
    setProjectStatusFilter,
    projectStatusOptions,
    projectCategoryFilter,
    setProjectCategoryFilter,
    projectsLoading,
    filteredProjects,
    setProjects,
    openCreateProjectModal,
    openEditProjectModal,
    handleToggleProjectStatus,
    setDeleteConfirmProject
}) => {
    return (
        <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#161b22] border border-[#30363d] p-4 rounded-xl">
                <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 sm:flex-none sm:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={projectSearch}
                            onChange={(e) => setProjectSearch(e.target.value)}
                            className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg pl-9 pr-4 py-2 text-xs text-[#e6edf3] outline-none placeholder-[#484f58] transition-all"
                        />
                        {projectSearch && (
                            <button onClick={() => setProjectSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#e6edf3]">
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    {/* Status Filter */}
                    <CustomSelect
                        value={projectStatusFilter}
                        onChange={setProjectStatusFilter}
                        options={projectStatusOptions}
                        className="w-32 sm:w-36"
                    />
                </div>

                <button
                    onClick={openCreateProjectModal}
                    className="w-full sm:w-auto bg-[#238636] hover:bg-[#2ea043] text-white py-2 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border border-[#3fb950]/30 shadow-md shadow-[#238636]/10"
                >
                    <Plus size={14} />
                    Add Project
                </button>
            </div>

            {/* Projects Grid / Content */}
            {projectsLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-8 h-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-[#8b949e]">Loading portfolio projects...</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-16 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#30363d]/50 flex items-center justify-center text-[#8b949e] mx-auto">
                        <FolderOpen size={22} />
                    </div>
                    <div className="space-y-1 max-w-sm mx-auto">
                        <h3 className="text-sm font-bold text-[#e6edf3]">No Projects Found</h3>
                        <p className="text-xs text-[#8b949e]">
                            {projectSearch || projectStatusFilter !== 'All'
                                ? 'No projects match your current filters. Try resetting search or select options.'
                                : 'Get started by publishing the first project masterpiece in the admin workspace.'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* SECTION 1: FEATURED MASTERPIECES */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Star size={16} className="text-amber-400 fill-amber-400" />
                                Featured Masterpieces (Hero Slideshows)
                            </h3>
                            <span className="text-[10px] bg-amber-900/30 border border-amber-800/80 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                                {filteredProjects.filter(p => p.featured).length} Projects
                            </span>
                        </div>
                        {filteredProjects.filter(p => p.featured).length === 0 ? (
                            <p className="text-xs text-[#8b949e] italic py-4">No featured projects found matching current filters.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects
                                    .filter(p => p.featured)
                                    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0))
                                    .map((project) => (
                                        <div key={project.id} className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group">
                                            {/* Image Box */}
                                            <div className="relative aspect-[16/10] bg-[#0d1117] border-b border-[#30363d] overflow-hidden flex items-center justify-center">
                                                {project.images && project.images.length > 0 ? (
                                                    <img
                                                        src={project.images[0]}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="text-center text-[#484f58]">
                                                        <Image size={32} className="mx-auto mb-2 opacity-55" />
                                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">No Image Uploaded</span>
                                                    </div>
                                                )}

                                                {/* Top Labels */}
                                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                                                    <span className="bg-[#161b22]/90 border border-[#30363d] text-[#e6edf3] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                                        {project.category}
                                                    </span>
                                                    <span className="bg-amber-900/90 border border-amber-800 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5 shadow">
                                                        <Star size={9} className="fill-amber-400" /> Featured
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Details Box */}
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-bold text-[#e6edf3] line-clamp-1 group-hover:text-[#58a6ff] transition-colors">
                                                        {project.title}
                                                    </h3>

                                                    {project.location && (
                                                        <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                                                            <MapPin size={12} className="text-[#58a6ff]" />
                                                            <span>{project.location}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-start gap-1.5 text-xs text-[#8b949e]">
                                                        <Award size={12} className="text-[#58a6ff] flex-shrink-0 mt-0.5" />
                                                        <span className="line-clamp-1">{project.scope}</span>
                                                    </div>

                                                    {project.highlight && (
                                                        <p className="text-xs text-[#8b949e] italic line-clamp-2 leading-relaxed bg-[#0d1117]/50 border border-[#30363d]/50 p-2.5 rounded-lg">
                                                            "{project.highlight}"
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Inline Controls */}
                                                <div className="space-y-2 bg-[#0d1117]/45 p-3 rounded-lg border border-[#30363d]/40 text-xs">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#8b949e] font-medium">Status:</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] font-bold uppercase ${project.status === 'active' ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                                                                {project.status === 'active' ? 'Active' : 'Inactive'}
                                                            </span>
                                                            <ToggleSwitch
                                                                checked={project.status === 'active'}
                                                                onChange={() => handleToggleProjectStatus(project)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#8b949e] font-medium">Featured:</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold uppercase text-amber-400">Featured</span>
                                                            <ToggleSwitch
                                                                checked={true}
                                                                onChange={async () => {
                                                                    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, featured: false } : p));
                                                                    try {
                                                                        const formData = new FormData();
                                                                        formData.append('featured', 'false');
                                                                        formData.append('existing_images', JSON.stringify(project.images || []));
                                                                        const response = await fetch(`${ADMIN_PROJECTS_BASE_URL}/${project.id}`, {
                                                                            method: 'PUT',
                                                                            headers: { 'x-admin-token': token },
                                                                            body: formData
                                                                        });
                                                                        const data = await response.json();
                                                                        if (!response.ok || !data.ok) {
                                                                            toast.error(data.message || 'Failed to update featured status.');
                                                                        }
                                                                    } catch (err) {
                                                                        console.error(err);
                                                                        toast.error('Error updating featured status.');
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#8b949e] font-medium">Display Order:</span>
                                                        <input
                                                            type="number"
                                                            value={project.display_order || 0}
                                                            onChange={async (e) => {
                                                                const val = parseInt(e.target.value) || 0;
                                                                setProjects(prev => prev.map(p => p.id === project.id ? { ...p, display_order: val } : p));
                                                                try {
                                                                    const formData = new FormData();
                                                                    formData.append('display_order', val.toString());
                                                                    formData.append('existing_images', JSON.stringify(project.images || []));
                                                                    const response = await fetch(`${ADMIN_PROJECTS_BASE_URL}/${project.id}`, {
                                                                        method: 'PUT',
                                                                        headers: { 'x-admin-token': token },
                                                                        body: formData
                                                                    });
                                                                    const data = await response.json();
                                                                    if (!response.ok || !data.ok) {
                                                                        toast.error(data.message || 'Failed to update order.');
                                                                    }
                                                                } catch (err) {
                                                                    console.error(err);
                                                                    toast.error('Error updating order.');
                                                                }
                                                            }}
                                                            className="w-16 bg-[#161b22] text-[#e6edf3] border border-[#30363d] focus:border-[#58a6ff] rounded text-[11px] text-center outline-none py-0.5"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Actions Panel */}
                                                <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-4 mt-auto">
                                                    <span className="text-[10px] text-[#484f58] font-bold uppercase tracking-wider">
                                                        {project.images?.length || 0} Images
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => openEditProjectModal(project)}
                                                            className="text-[#c9d1d9] hover:text-[#58a6ff] p-2 bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                                                            title="Edit Project"
                                                        >
                                                            <Edit2 size={12} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirmProject(project)}
                                                            className="text-[#c9d1d9] hover:text-[#f85149] p-2 bg-[#21262d] border border-[#30363d] hover:border-[#f85149] rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                                                            title="Delete Project"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: PORTFOLIO BY CATEGORY */}
                    <div className="space-y-4 border-t border-[#30363d] pt-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#30363d] pb-3 gap-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <FolderOpen size={16} className="text-[#58a6ff]" />
                                Portfolio Projects by Category
                            </h3>
                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-1.5">
                                {['All', 'Commercial', 'Residential', 'Hospitality', 'Industrial', 'International', 'Infrastructure'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setProjectCategoryFilter(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                                            projectCategoryFilter === cat
                                                ? 'bg-[#1f6feb] border-[#388bfd] text-white shadow-md'
                                                : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredProjects.filter(p => projectCategoryFilter === 'All' ? true : p.category === projectCategoryFilter).length === 0 ? (
                            <p className="text-xs text-[#8b949e] italic py-4">No projects found in this category matching current filters.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects
                                    .filter(p => projectCategoryFilter === 'All' ? true : p.category === projectCategoryFilter)
                                    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0))
                                    .map((project) => (
                                        <div key={project.id} className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group">
                                            {/* Image Box */}
                                            <div className="relative aspect-[16/10] bg-[#0d1117] border-b border-[#30363d] overflow-hidden flex items-center justify-center">
                                                {project.images && project.images.length > 0 ? (
                                                    <img
                                                        src={project.images[0]}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="text-center text-[#484f58]">
                                                        <Image size={32} className="mx-auto mb-2 opacity-55" />
                                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">No Image Uploaded</span>
                                                    </div>
                                                )}

                                                {/* Top Labels */}
                                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                                                    <span className="bg-[#161b22]/90 border border-[#30363d] text-[#e6edf3] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                                        {project.category}
                                                    </span>
                                                    {project.featured && (
                                                        <span className="bg-amber-900/90 border border-amber-800 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5 shadow">
                                                            <Star size={9} className="fill-amber-400" /> Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Details Box */}
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-bold text-[#e6edf3] line-clamp-1 group-hover:text-[#58a6ff] transition-colors">
                                                        {project.title}
                                                    </h3>

                                                    {project.location && (
                                                        <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                                                            <MapPin size={12} className="text-[#58a6ff]" />
                                                            <span>{project.location}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-start gap-1.5 text-xs text-[#8b949e]">
                                                        <Award size={12} className="text-[#58a6ff] flex-shrink-0 mt-0.5" />
                                                        <span className="line-clamp-1">{project.scope}</span>
                                                    </div>

                                                    {project.highlight && (
                                                        <p className="text-xs text-[#8b949e] italic line-clamp-2 leading-relaxed bg-[#0d1117]/50 border border-[#30363d]/50 p-2.5 rounded-lg">
                                                            "{project.highlight}"
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Inline Controls */}
                                                <div className="space-y-2 bg-[#0d1117]/45 p-3 rounded-lg border border-[#30363d]/40 text-xs">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#8b949e] font-medium">Status:</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] font-bold uppercase ${project.status === 'active' ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                                                                {project.status === 'active' ? 'Active' : 'Inactive'}
                                                            </span>
                                                            <ToggleSwitch
                                                                checked={project.status === 'active'}
                                                                onChange={() => handleToggleProjectStatus(project)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#8b949e] font-medium">Featured:</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] font-bold uppercase ${project.featured ? 'text-amber-400' : 'text-[#8b949e]'}`}>
                                                                {project.featured ? 'Featured' : 'Standard'}
                                                            </span>
                                                            <ToggleSwitch
                                                                checked={Boolean(project.featured)}
                                                                onChange={async () => {
                                                                    const newFeatured = !project.featured;
                                                                    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, featured: newFeatured } : p));
                                                                    try {
                                                                        const formData = new FormData();
                                                                        formData.append('featured', newFeatured ? 'true' : 'false');
                                                                        formData.append('existing_images', JSON.stringify(project.images || []));
                                                                        const response = await fetch(`${ADMIN_PROJECTS_BASE_URL}/${project.id}`, {
                                                                            method: 'PUT',
                                                                            headers: { 'x-admin-token': token },
                                                                            body: formData
                                                                        });
                                                                        const data = await response.json();
                                                                        if (!response.ok || !data.ok) {
                                                                            toast.error(data.message || 'Failed to update featured status.');
                                                                        }
                                                                    } catch (err) {
                                                                        console.error(err);
                                                                        toast.error('Error updating featured status.');
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#8b949e] font-medium">Display Order:</span>
                                                        <input
                                                            type="number"
                                                            value={project.display_order || 0}
                                                            onChange={async (e) => {
                                                                const val = parseInt(e.target.value) || 0;
                                                                setProjects(prev => prev.map(p => p.id === project.id ? { ...p, display_order: val } : p));
                                                                try {
                                                                    const formData = new FormData();
                                                                    formData.append('display_order', val.toString());
                                                                    formData.append('existing_images', JSON.stringify(project.images || []));
                                                                    const response = await fetch(`${ADMIN_PROJECTS_BASE_URL}/${project.id}`, {
                                                                        method: 'PUT',
                                                                        headers: { 'x-admin-token': token },
                                                                        body: formData
                                                                    });
                                                                    const data = await response.json();
                                                                    if (!response.ok || !data.ok) {
                                                                        toast.error(data.message || 'Failed to update order.');
                                                                    }
                                                                } catch (err) {
                                                                    console.error(err);
                                                                    toast.error('Error updating order.');
                                                                }
                                                            }}
                                                            className="w-16 bg-[#161b22] text-[#e6edf3] border border-[#30363d] focus:border-[#58a6ff] rounded text-[11px] text-center outline-none py-0.5"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Actions Panel */}
                                                <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-4 mt-auto">
                                                    <span className="text-[10px] text-[#484f58] font-bold uppercase tracking-wider">
                                                        {project.images?.length || 0} Images
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => openEditProjectModal(project)}
                                                            className="text-[#c9d1d9] hover:text-[#58a6ff] p-2 bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                                                            title="Edit Project"
                                                        >
                                                            <Edit2 size={12} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirmProject(project)}
                                                            className="text-[#c9d1d9] hover:text-[#f85149] p-2 bg-[#21262d] border border-[#30363d] hover:border-[#f85149] rounded-md transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                                                            title="Delete Project"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsTab;
