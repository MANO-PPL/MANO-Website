import React from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Delete Item", 
    subtitle = "This action cannot be undone",
    details = null,
    isDeleting = false,
    warningText = "This will permanently remove this item from the database."
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#040d21]/80 backdrop-blur-sm z-[9999] flex items-center justify-center animate-in fade-in duration-200 p-4">
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-zoom-in">
                <div className="h-1 w-full bg-gradient-to-r from-[#da3633] to-[#f85149]" />
                <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#da3633]/15 border border-[#da3633]/30 flex items-center justify-center flex-shrink-0">
                            <Trash2 size={18} className="text-[#f85149]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#f85149]">{title}</h3>
                            <p className="text-[10px] text-[#8b949e] mt-0.5">{subtitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => !isDeleting && onClose()}
                        className="text-[#8b949e] hover:text-[#e6edf3] transition-colors cursor-pointer flex-shrink-0 mt-0.5"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="px-6 pb-5 space-y-4">
                    {details && (
                        <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 space-y-2 text-xs">
                            {details}
                        </div>
                    )}
                    <div className="bg-[#da3633]/8 border border-[#da3633]/25 rounded-xl px-4 py-3 flex items-start gap-3">
                        <AlertTriangle size={15} className="text-[#f85149] flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#8b949e] leading-relaxed">
                            {warningText}
                        </p>
                    </div>
                </div>
                <div className="px-6 py-4 bg-[#0d1117]/60 border-t border-[#30363d] flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onClose}
                        className="bg-[#21262d] hover:bg-[#30363d] disabled:opacity-50 border border-[#30363d] text-[#c9d1d9] py-2 px-5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onConfirm}
                        className="bg-[#da3633] hover:bg-[#f85149] disabled:opacity-70 disabled:cursor-not-allowed text-white py-2 px-5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-2"
                    >
                        {isDeleting ? (
                            <>
                                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={13} />
                                Yes, Delete It
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
