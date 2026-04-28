function MessageLine({ role, content }) {
    const isUser = role === "user";
    return (
        <div
            className={`max-w-[85%] rounded-sm border px-3 py-2 font-serif text-sm leading-relaxed sm:max-w-[75%] ${
                isUser
                    ? "ml-auto border-white/25 bg-white/[0.04] text-white"
                    : "mr-auto border-white/20 bg-black text-white/95"
            }`}
        >
            <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                {isUser ? "You" : "Board"}
            </span>
            <p className="whitespace-pre-wrap">{content}</p>
        </div>
    );
}

export default function ChatThread({ messages, messagesLoading, activeChatId }) {
    if (!activeChatId) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                <p className="font-serif text-xl text-white">Fresh slate</p>
                <p className="mt-2 max-w-sm font-mono text-xs leading-relaxed text-white/50">
                    Pick a thread on the left or write a question in the box below. Your words appear
                    in chalk white on black.
                </p>
            </div>
        );
    }

    if (messagesLoading && messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center px-6">
                <p className="font-mono text-sm text-white/50">Fetching lines…</p>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center px-6">
                <p className="font-mono text-sm text-white/50">This thread is empty. Say something below.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-8">
            {messages.map((m) => (
                <MessageLine key={m._id} role={m.role} content={m.content} />
            ))}
        </div>
    );
}
