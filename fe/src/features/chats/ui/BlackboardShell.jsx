export default function BlackboardShell({ header, sidebar, children }) {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            {header}
            <div className="flex min-h-0 flex-1">
                {sidebar}
                <div className="relative flex min-w-0 flex-1 flex-col border-l border-white/15 bg-black">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)",
                        }}
                    />
                    <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
                </div>
            </div>
        </div>
    );
}
