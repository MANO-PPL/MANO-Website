import React from 'react';
import { Briefcase, FileText, FolderOpen, MessageSquare, LogOut } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, setSubTab, enquiriesCount = 0, onLogout }) => {
    return (
        <aside className="w-64 bg-[#161b22] border-r border-[#30363d] p-0 hidden md:flex flex-col justify-between fixed top-0 left-0 bottom-0 z-50 overflow-hidden">
            <div className="space-y-4">
                {/* Company Logo in Sidebar */}
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

                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'projects' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'}`}
                    >
                        <FolderOpen size={16} />
                        <span>Projects</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('enquiries')}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${activeTab === 'enquiries' ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'}`}
                    >
                        <div className="flex items-center gap-3">
                            <MessageSquare size={16} />
                            <span>Client Enquiries</span>
                        </div>
                        {enquiriesCount > 0 && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-[#30363d] text-[#e6edf3]'}`}>
                                {enquiriesCount}
                            </span>
                        )}
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
    );
};

export default AdminSidebar;
