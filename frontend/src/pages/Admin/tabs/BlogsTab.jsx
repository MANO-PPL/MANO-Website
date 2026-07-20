import React from 'react';
import { Search, Filter, Plus, FileText, Edit2, Trash2, User as UserIcon, Calendar } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const BlogsTab = ({
    blogSearch,
    setBlogSearch,
    blogCategoryFilter,
    setBlogCategoryFilter,
    blogCategories,
    blogsLoading,
    filteredBlogs,
    openCreateBlogModal,
    openEditBlogModal,
    handleDeleteBlog,
    setViewingBlog
}) => {
    return (
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
                                                onClick={(e) => { e.stopPropagation(); handleDeleteBlog(blog); }}
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
    );
};

export default BlogsTab;
