import React from 'react';
import { LogOut } from 'lucide-react';

const AdminHeader = ({ activeTab, onLogout }) => {
    return (
        <header className="sticky top-0 z-40 bg-[#161b22]/90 border-b border-[#30363d] backdrop-blur-xl px-6 h-[73px] flex items-center justify-between md:ml-64 transition-all">
            {/* Mobile Logo & Title */}
            <div className="flex items-center gap-3 md:hidden">
                <img src="/mano-logo.svg" alt="MANO Logo" className="h-6 w-auto" />
                <h1 className="text-sm font-bold text-[#e6edf3] tracking-tight">MANO Admin</h1>
            </div>
            {/* Desktop dashboard panel indicator */}
            <div className="hidden md:block">
                <span className="text-xs font-bold text-white uppercase tracking-widest">
                    {activeTab === 'pmc-careers' && 'PMC Careers Portal'}
                    {activeTab === 'epc-careers' && 'EPC Careers Portal'}
                    {activeTab === 'blogs' && 'Blog Posts'}
                    {activeTab === 'projects' && 'Projects'}
                    {activeTab === 'enquiries' && 'Client Enquiries'}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-[#e6edf3]">System Administrator</p>
                    <p className="text-xs text-[#58a6ff] font-medium">Session Active</p>
                </div>
                <button
                    onClick={onLogout}
                    className="bg-[#21262d] hover:bg-[#da3633] hover:text-white hover:border-[#da3633] border border-[#30363d] text-[#c9d1d9] py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 md:hidden"
                >
                    <LogOut size={14} />
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
