import React from 'react';
import { X, Upload, Image, Plus } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const BlogModal = ({
    isOpen,
    onClose,
    currentEditingBlog,
    blogForm,
    setBlogForm,
    handleBlogSubmit,
    isSavingBlog,
    addBlogSection,
    removeBlogSection,
    updateBlogSection
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-[#040d21]/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#161b22] border-l border-[#30363d] w-full max-w-2xl h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
                <div className="p-6 border-b border-[#30363d] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#e6edf3]">
                        {currentEditingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
                    </h3>
                    <button onClick={onClose} className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer">
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

                    <div className="p-6 border-t border-[#30363d] bg-[#161b22] flex justify-end gap-3 sticky bottom-0">
                        <button
                            type="button" onClick={onClose}
                            className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit" disabled={isSavingBlog}
                            className="bg-[#238636] hover:bg-[#2ea44f] border border-[#30363d]/50 text-white py-2 px-5 rounded-lg text-xs font-bold shadow-lg cursor-pointer transition-colors flex items-center gap-2"
                        >
                            {isSavingBlog ? 'Saving...' : 'Save Blog Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogModal;
