"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hits GET /api/track?type=signin → pageViewCounter.inc({ page: "signin" })
    fetch("/api/track?type=signin").catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ← was missing; req.json() fails without it
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (res.ok) {
        window.location.href = "/";
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Left decorative panel ───────────────────────── */
        .auth-left {
          position: relative;
          overflow: hidden;
          background: #0c0c0c;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
        }
        .auth-left-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .auth-left-glow {
          position: absolute;
          top: -100px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .auth-left-glow2 {
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%);
          pointer-events: none;
        }
        .auth-logo {
          position: relative;
          z-index: 2;
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          color: #d4af37;
          letter-spacing: 0.04em;
        }
        .auth-left-bottom {
          position: relative;
          z-index: 2;
        }
        .auth-left-bottom blockquote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          color: #f0ebe0;
          line-height: 1.45;
          font-weight: 400;
          margin-bottom: 1.25rem;
        }
        .auth-left-bottom blockquote em {
          color: #d4af37;
          font-style: italic;
        }
        .auth-left-bottom cite {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,235,224,0.35);
          font-style: normal;
        }
        .auth-left-dots {
          position: absolute;
          bottom: 3rem;
          right: 3rem;
          display: grid;
          grid-template-columns: repeat(5, 6px);
          gap: 8px;
        }
        .auth-left-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(212,175,55,0.2);
          display: block;
        }
        .auth-left-dots span:nth-child(7),
        .auth-left-dots span:nth-child(13) {
          background: rgba(212,175,55,0.5);
        }

        /* ── Right form panel ────────────────────────────── */
        .auth-right {
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .auth-right.in {
          opacity: 1;
          transform: translateX(0);
        }
        .auth-card {
          width: 100%;
          max-width: 380px;
        }

        .auth-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 999px;
          padding: 0.3rem 0.85rem;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 1.25rem;
        }
        .auth-pill-dot {
          width: 5px;
          height: 5px;
          background: #d4af37;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .auth-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          font-weight: 600;
          color: #f0ebe0;
          line-height: 1.15;
          margin-bottom: 0.5rem;
        }
        .auth-sub {
          font-size: 0.865rem;
          color: rgba(240,235,224,0.38);
          font-weight: 300;
          margin-bottom: 2.25rem;
          line-height: 1.6;
        }

        /* fields */
        .field { margin-bottom: 1.1rem; }
        .field label {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,235,224,0.42);
          margin-bottom: 0.45rem;
        }
        .field-wrap {
          position: relative;
        }
        .field-wrap input {
          width: 100%;
          background: rgba(240,235,224,0.035);
          border: 1px solid rgba(240,235,224,0.08);
          border-radius: 5px;
          padding: 0.82rem 1rem;
          font-size: 0.92rem;
          color: #f0ebe0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-wrap input:focus {
          border-color: rgba(212,175,55,0.45);
          background: rgba(212,175,55,0.03);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.06);
        }
        .field-wrap input::placeholder { color: rgba(240,235,224,0.18); }
        .field-wrap input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #0d0d0d inset;
          -webkit-text-fill-color: #f0ebe0;
        }
        .field-underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #d4af37;
          transition: width 0.3s ease;
        }
        .field-wrap:focus-within .field-underline { width: calc(100% - 2px); }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -0.3rem;
          margin-bottom: 1.6rem;
        }
        .forgot-row a {
          font-size: 0.76rem;
          color: rgba(212,175,55,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-row a:hover { color: #d4af37; }

        .btn {
          width: 100%;
          padding: 0.88rem;
          background: #d4af37;
          color: #080808;
          border: none;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }
        .btn:hover:not(:disabled) {
          background: #c9a227;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,175,55,0.25);
        }
        .btn:active:not(:disabled) { transform: translateY(0); }
        .btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(8,8,8,0.25);
          border-top-color: #080808;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-box {
          background: rgba(220,53,69,0.08);
          border: 1px solid rgba(220,53,69,0.25);
          border-radius: 5px;
          padding: 0.7rem 0.9rem;
          font-size: 0.8rem;
          color: #ff6b7a;
          margin-bottom: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .error-box::before { content: '⚠'; font-size: 0.9rem; }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin: 1.6rem 0 1.25rem;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(240,235,224,0.07);
        }
        .divider span {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: rgba(240,235,224,0.2);
          white-space: nowrap;
        }

        .auth-footer {
          text-align: center;
          font-size: 0.8rem;
          color: rgba(240,235,224,0.3);
        }
        .auth-footer a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 500;
        }
        .auth-footer a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .auth-root { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { background: #0c0c0c; min-height: 100vh; }
        }
      `}</style>

      <div className="auth-root">
        {/* ── Left panel ── */}
        <div className="auth-left">
          <div className="auth-left-grid" />
          <div className="auth-left-glow" />
          <div className="auth-left-glow2" />

          <div className="auth-logo">Shopco</div>

          <div className="auth-left-bottom">
            <blockquote>
              Style is a way to say<br />
              <em>who you are</em> without<br />
              having to speak.
            </blockquote>
            <cite>— Rachel Zoe</cite>
          </div>

          <div className="auth-left-dots">
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={`auth-right ${mounted ? "in" : ""}`}>
          <div className="auth-card">
            <div className="auth-pill">
              <span className="auth-pill-dot" />
              Welcome back
            </div>

            <h1 className="auth-title">Sign in<br />to your account</h1>
            <p className="auth-sub">Enter your credentials below to continue shopping.</p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="field-wrap">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                  <span className="field-underline" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="field-wrap">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <span className="field-underline" />
                </div>
              </div>

              <div className="forgot-row">
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? <span className="spinner" /> : null}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className="divider"><span>or</span></div>

            <div className="auth-footer">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Create one →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}