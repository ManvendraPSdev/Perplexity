export default function ChatHeader({ title, userLabel, onSignOut }) {
    return (
        <header className="z-20 flex shrink-0 items-center justify-between border-b border-white/15 bg-black px-4 py-3 sm:px-6">
            <div>
                <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-white/60">
                    Perplexio
                </p>
                <h1 className="font-serif text-lg font-medium tracking-tight text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                {userLabel ? (
                    <span className="hidden max-w-[140px] truncate font-mono text-xs text-white/70 sm:inline">
                        {userLabel}
                    </span>
                ) : null}
                <button
                    type="button"
                    onClick={onSignOut}
                    className="rounded border border-white/25 bg-black px-3 py-1.5 font-mono text-xs text-white transition hover:bg-white hover:text-black"
                >
                    Sign out
                </button>
            </div>
        </header>
    );
}
