import React, { useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { initializedSocketConnection } from "../services/chat.socket";

const menuIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
    <path d="M4 7H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M7 12H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M10 17H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const searchIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-zinc-500">
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const micIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-zinc-300">
    <rect x="9" y="4" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6 11.5C6 14.5376 8.46243 17 11.5 17H12.5C15.5376 17 18 14.5376 18 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M12 17V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-black/65 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-5 py-4">
        <p className="text-[11px] font-bold tracking-[0.25em] text-white">LUMINA</p>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-zinc-900/70 p-2 transition-all duration-300 hover:scale-105 hover:border-white/20"
          aria-label="Open menu"
        >
          {menuIcon}
        </button>
      </div>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="rounded-full border border-zinc-800/90 bg-zinc-900/90 px-4 py-3 shadow-lg transition-all duration-300 focus-within:border-purple-400/80 focus-within:shadow-[0_0_35px_rgba(139,92,246,0.25)]">
      <div className="flex items-center gap-3">
        {searchIcon}
        <input
          type="text"
          placeholder="Ask anything..."
          className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
        />
        <button type="button" className="rounded-full p-1.5 transition-all duration-300 hover:scale-105">
          {micIcon}
        </button>
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-2 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40"
          aria-label="Submit search"
        >
          {arrowIcon}
        </button>
      </div>
    </div>
  );
}

function SuggestionChips() {
  const suggestions = ["Quantum Computing", "AI Trends", "Mars Exploration"];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {suggestions.map((chip) => (
        <button
          key={chip}
          type="button"
          className="rounded-full border border-zinc-700/60 bg-zinc-900/75 px-3 py-1.5 text-[11px] text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

function ResponseCard() {
  return (
    <article className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Quantum Supremacy Breakdown</h3>
        <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-2 py-1 text-[10px] font-medium tracking-wide text-purple-300">
          DEEP DIVE
        </span>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-zinc-400">
        Recent breakthroughs suggest quantum processors can now exceed classical systems in narrowly
        defined benchmarks, accelerating simulation and optimization workflows.
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-zinc-500">SOURCES</span>
        <span className="rounded-full border border-zinc-700/70 bg-zinc-800/80 px-2 py-1 text-[10px] text-zinc-300">
          Nature
        </span>
        <span className="rounded-full border border-zinc-700/70 bg-zinc-800/80 px-2 py-1 text-[10px] text-zinc-300">
          arXiv
        </span>
      </div>
    </article>
  );
}

function FeatureCard({ title, description, visual = false }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl">
      {visual ? (
        <div className="mb-4 h-24 rounded-xl bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.45),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(99,102,241,0.35),transparent_40%),linear-gradient(135deg,#111,#1b1b2f)]" />
      ) : (
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/12 text-purple-300">
          ✦
        </div>
      )}
      <h4 className="mb-2 text-sm font-semibold text-white">{title}</h4>
      <p className="text-xs leading-relaxed text-zinc-400">{description}</p>
      <div className="mt-3 flex justify-end">
        <span className="rounded-full border border-zinc-700/70 bg-zinc-900 p-1.5 text-zinc-300">{arrowIcon}</span>
      </div>
    </article>
  );
}

function Footer() {
  const links = ["Research", "Privacy API", "System Status"];
  return (
    <footer className="border-t border-white/10 pt-8 pb-6">
      <p className="text-center text-[11px] font-bold tracking-[0.25em] text-white">LUMINA</p>
      <p className="mt-2 text-center text-[10px] text-zinc-500">© 2026 Lumina AI. All rights reserved.</p>
      <div className="mt-4 flex items-center justify-center gap-3">
        {links.map((link) => (
          <button key={link} type="button" className="text-[10px] text-zinc-400 transition-colors hover:text-zinc-200">
            {link}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-7 w-7 rounded-full border border-zinc-700 bg-zinc-900" />
        <span className="h-7 w-7 rounded-full border border-zinc-700 bg-zinc-900" />
        <span className="h-7 w-7 rounded-full border border-zinc-700 bg-zinc-900" />
      </div>
    </footer>
  );
}

export default function HomePage() {

  const chat = useChat()

  useEffect(()=>{
    chat.initializedSocketConnection()
  } , [])

  const featureBlocks = [
    {
      title: "Real-time answers",
      description: "Live synthesis across trusted data sources with immediate contextual follow-up.",
    },
    {
      title: "Verified sources",
      description: "Every claim links back to origin material so you can validate in one tap.",
    },
    {
      title: "Multi-modal search",
      description: "Blend text, visual cues, and snippets to unlock richer research workflows.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-md px-5 pb-10 pt-6">
        <section className="space-y-5 text-center">
          <div className="mx-auto inline-flex rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1 text-[10px] font-medium tracking-[0.1em] text-zinc-400">
            V2.0 ARCHITECTURAL INTELLIGENCE
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-white">
            Ask Anything.
            <br />
            Get Intelligent Answers.
          </h1>
          <p className="mx-auto max-w-[320px] text-xs leading-relaxed text-zinc-400">
            Your AI-powered knowledge engine, built for deep research and rapid discovery.
          </p>
        </section>

        <section className="mt-7 space-y-4">
          <SearchBar />
          <SuggestionChips />
        </section>

        <section className="mt-6 space-y-4">
          <ResponseCard />
          <FeatureCard
            title="Real-time Synthesis"
            description="Instantly combine the latest findings into concise, high-signal summaries for faster decisions."
          />
          <FeatureCard
            title="Visual Search Engine"
            description="Analyze maps and visual contexts to uncover related signals your text queries might miss."
            visual
          />
          <FeatureCard
            title="Source Verification"
            description="Cross-check claims against primary references with traceable confidence markers."
          />
        </section>

        <section className="mt-9 space-y-5">
          <h2 className="text-center text-sm font-semibold text-zinc-100">Built for the future</h2>
          <div className="space-y-4">
            {featureBlocks.map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-zinc-900/70 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300">
                  ✧
                </div>
                <h3 className="text-sm font-medium text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <article className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-900/40 p-5 shadow-lg shadow-purple-500/20">
            <h3 className="text-lg font-semibold text-white">Start exploring the future of search</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-300">
              Discover hidden insight patterns across datasets and move from questions to decisions in
              seconds.
            </p>
            <button
              type="button"
              className="mt-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Try Now
            </button>
          </article>
        </section>

        <Footer />
      </main>
    </div>
  );
}
