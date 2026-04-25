import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

export default function ChatbotWidgetMobile({
    isOpen,
    setIsOpen,
    listRef,
    messages,
    loading,
    suggestedQuestions,
    sendMessage,
    input,
    setInput,
    onKeyDown
}) {
    return (
        <div className="fixed bottom-3 right-3 z-[120]">
            {/* Landscape-specific compact styles */}
            <style>{`
                @media (orientation: landscape) and (max-width: 1023px) {
                    .mano-mobile-chatbot {
                        width: 60vw !important;
                        max-width: 320px !important;
                        min-width: 180px !important;
                        height: 48vh !important;
                        max-height: 260px !important;
                        min-height: 120px !important;
                        font-size: 11px !important;
                    }
                    .mano-mobile-chatbot .mano-mobile-chatbot-header {
                        padding: 6px 10px !important;
                    }
                    .mano-mobile-chatbot .mano-mobile-chatbot-footer {
                        padding: 6px 10px !important;
                    }
                    .mano-mobile-chatbot .mano-mobile-chatbot-msg {
                        font-size: 11px !important;
                        padding: 4px 8px !important;
                    }
                    .mano-mobile-chatbot .mano-mobile-chatbot-questions button {
                        font-size: 10px !important;
                        padding: 2px 7px !important;
                    }
                }
            `}</style>
            {isOpen && (
                <>
                <div className="fixed inset-0 z-[124]" onClick={() => setIsOpen(false)} />
                <div className="mano-mobile-chatbot fixed right-3 bottom-[68px] z-[125] w-[88vw] max-w-[340px] h-[62vh] max-h-[520px] min-h-[360px] rounded-2xl border border-white/15 bg-black/50 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="mano-mobile-chatbot-header flex items-center justify-between px-3 py-2.5 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-white">
                            <Bot size={16} className="text-blue-400" />
                            <span className="text-sm font-semibold">MANO Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Close chatbot"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-2.5 py-2.5 space-y-2.5">
                        {messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`mano-mobile-chatbot-msg max-w-[92%] rounded-xl px-2.5 py-2 text-[13px] leading-relaxed ${
                                        message.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-white/10 text-gray-100 border border-white/10"
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="mano-mobile-chatbot-msg max-w-[92%] rounded-xl px-2.5 py-2 text-[13px] bg-white/10 text-gray-100 border border-white/10 flex items-center gap-1.5">
                                    <Loader2 size={12} className="animate-spin" />
                                    Thinking...
                                </div>
                            </div>
                        )}

                        <div className="mano-mobile-chatbot-questions pt-1.5">
                            <p className="text-[10px] text-gray-400 mb-1.5">Recommended questions</p>
                            <div className="flex flex-wrap gap-1.5">
                                {suggestedQuestions.map((question) => (
                                    <button
                                        key={question}
                                        type="button"
                                        onClick={() => sendMessage(question)}
                                        disabled={loading}
                                        className="text-[11px] px-2 py-1 rounded-full border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mano-mobile-chatbot-footer p-2.5 border-t border-white/10 bg-black/30">
                        <div className="flex items-center gap-1.5">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                rows={1}
                                placeholder="Ask about MANO..."
                                className="flex-1 resize-none rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 px-2.5 py-2 text-[13px] focus:outline-none focus:border-blue-500/60"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                                aria-label="Send message"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="h-11 w-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all"
                aria-label="Open chatbot"
            >
                <MessageCircle size={20} />
            </button>
        </div>
    );
}
