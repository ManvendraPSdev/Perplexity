export default function ChatSidebar({
    chats,
    activeChatId,
    listLoading,
    onSelect,
    onNew,
    onDelete,
}) {
    return (
        <aside className="flex w-full max-w-[280px] shrink-0 flex-col border-r border-white/15 bg-black sm:max-w-xs">
            <div className="flex items-center justify-between border-b border-white/15 px-3 py-3 sm:px-4">
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-white/55">Threads</p>
                <button
                    type="button"
                    onClick={onNew}
                    className="rounded border border-dashed border-white/35 px-2 py-1 font-mono text-[11px] text-white/90 hover:border-white hover:bg-white/5"
                >
                    + New
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-2">
                {listLoading ? (
                    <p className="px-2 py-3 font-mono text-xs text-white/50">Loading…</p>
                ) : chats.length === 0 ? (
                    <p className="px-2 py-3 font-mono text-xs leading-relaxed text-white/45">
                        No lines yet. Start a new thread below the rail.
                    </p>
                ) : (
                    <ul className="space-y-1">
                        {chats.map((c) => {
                            const id = String(c._id);
                            const active = activeChatId && String(activeChatId) === id;
                            return (
                                <li key={id}>
                                    <div
                                        className={`group flex items-stretch rounded border ${
                                            active
                                                ? "border-white/40 bg-white/[0.06]"
                                                : "border-transparent hover:border-white/20 hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onSelect(id)}
                                            className="min-w-0 flex-1 px-3 py-2.5 text-left"
                                        >
                                            <span className="block truncate font-serif text-sm text-white">
                                                {c.title || "Untitled"}
                                            </span>
                                            <span className="mt-0.5 block font-mono text-[10px] text-white/40">
                                                {id.slice(-6)}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(id);
                                            }}
                                            className="border-l border-white/10 px-2 font-mono text-[10px] text-white/40 hover:bg-white/10 hover:text-white"
                                            aria-label="Delete thread"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </nav>
        </aside>
    );
}
