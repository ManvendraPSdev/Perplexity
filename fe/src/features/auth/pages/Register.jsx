import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your auth API
    console.log("Register:", form);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #000000 0%, #020818 40%, #0a1628 70%, #0d1f4a 100%)" }}>

      {/* Subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1e40af, transparent)" }} />

      <div className="relative w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
            style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)" }}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-medium tracking-tight">
            Perplexio
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>

          <h2 className="text-white text-2xl font-medium mb-1">Create account</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Start searching smarter today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                style={inputStyle}
                onFocus={e => e.target.style.border = "1px solid rgba(59,130,246,0.5)"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                style={inputStyle}
                onFocus={e => e.target.style.border = "1px solid rgba(59,130,246,0.5)"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                style={inputStyle}
                onFocus={e => e.target.style.border = "1px solid rgba(59,130,246,0.5)"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-95 mt-2"
              style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}>
              Create account
            </button>
          </form>

          <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
            By signing up you agree to our Terms of Service and Privacy Policy
          </p>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            </div>
            <div className="relative text-center">
              <span className="px-3 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>or</span>
            </div>
          </div>

          <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium transition-colors hover:underline"
              style={{ color: "#3b82f6", background: "none", border: "none", cursor: "pointer" }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}