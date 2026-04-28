import { useState } from "react";

export default function ChatComposer({ disabled, sending, onSend }) {
    const [value, setValue] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const text = value.trim();
        if (!text || disabled || sending) return;
        setValue("");
        try {
            await onSend(text);
        } catch {
            setValue(text);
        }
    };

    return (
        <form
            onSubmit={submit}
            className="shrink-0 border-t border-white/15 bg-black px-4 py-4 sm:px-8"
        >
            <label className="sr-only" htmlFor="board-input">
                Message
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <textarea
                    id="board-input"
                    rows={2}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Write on the board…"
                    disabled={disabled || sending}
                    className="min-h-[52px] flex-1 resize-y rounded border border-white/25 bg-black px-3 py-2 font-serif text-sm text-white placeholder:text-white/35 focus:border-white focus:outline-none disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={disabled || sending || !value.trim()}
                    className="shrink-0 rounded border border-white bg-white px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:border-white/25 disabled:bg-transparent disabled:text-white/40"
                >
                    {sending ? "Sending…" : "Send"}
                </button>
            </div>
        </form>
    );
}
