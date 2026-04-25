import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

export default function ChatbotWidgetDesktop({
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
        <div className="fixed bottom-6 right-6 z-[120]">
            {isOpen && (
                <>
                <div className="fixed inset-0 z-[124]" onClick={() => setIsOpen(false)} />
                <div className="fixed right-3 top-3 bottom-3 z-[125] w-[94vw] rounded-2xl border border-white/15 bg-black/45 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col sm:right-4 sm:top-4 sm:bottom-4 sm:w-[72vw] md:w-[48vw] lg:w-[30vw] xl:w-[20vw] xl:min-w-[320px] xl:max-w-[420px]">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-white">
                            <Bot size={18} className="text-blue-400" />
                            <span className="font-semibold">MANO Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Close chatbot"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-3 py-3 space-y-3">
                        {messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[86%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
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
                                <div className="max-w-[86%] rounded-xl px-3 py-2 text-sm bg-white/10 text-gray-100 border border-white/10 flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin" />
                                    Thinking...
                                </div>
                            </div>
                        )}

                        <div className="pt-2">
                            <p className="text-[11px] text-gray-400 mb-2">Recommended questions</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((question) => (
                                    <button
                                        key={question}
                                        type="button"
                                        onClick={() => sendMessage(question)}
                                        disabled={loading}
                                        className="text-xs px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-3 border-t border-white/10 bg-black/30">
                        <div className="flex items-center gap-2">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                rows={1}
                                placeholder="Ask about MANO..."
                                className="flex-1 resize-none rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-blue-500/60"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                                aria-label="Send message"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all"
                aria-label="Open chatbot"
            >
                <MessageCircle size={24} />
            </button>
        </div>
    );
}
