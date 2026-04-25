"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hits GET /api/track?type=signup → pageViewCounter.inc({ page: "signup" })
    fetch("/api/track?type=signup").catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ← was missing; req.json() fails without it
        body: JSON.stringify({
          email: formData.get("email"),
          password,
        }),
      });

      if (res.ok) {
        window.location.href = "/auth/signin";
      } else {
        const data = await res.json();
        setError(data.error || "Signup failed. Please try again.");
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

        /* ── Right (form) comes first visually on signup ─ */
        .auth-form-side {
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          order: 1;
        }
        .auth-form-side.in {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Left decorative panel ───────────────────────── */
        .auth-deco-side {
          position: relative;
          overflow: hidden;
          background: #0c0c0c;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          order: 2;
        }
        .auth-deco-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .auth-deco-glow {
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%);
          pointer-events: none;
        }
        .auth-deco-glow2 {
          position: absolute;
          top: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%);
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
        .auth-deco-content {
          position: relative;
          z-index: 2;
        }
        .auth-deco-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2vw, 2rem);
          color: #f0ebe0;
          font-weight: 400;
          line-height: 1.45;
          margin-bottom: 2rem;
        }
        .auth-deco-content h2 em {
          color: #d4af37;
          font-style: italic;
        }
        .perks {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .perk {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .perk-icon {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
          margin-top: 1px;
          background: rgba(212,175,55,0.05);
        }
        .perk-text strong {
          display: block;
          font-size: 0.82rem;
          color: #f0ebe0;
          font-weight: 500;
          margin-bottom: 0.15rem;
        }
        .perk-text span {
          font-size: 0.75rem;
          color: rgba(240,235,224,0.35);
          font-weight: 300;
          line-height: 1.5;
        }

        /* ── Card ───────────────────────────────────────── */
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
          width: 5px; height: 5px;
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
          font-size: 2.4rem;
          font-weight: 600;
          color: #f0ebe0;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        .auth-sub {
          font-size: 0.865rem;
          color: rgba(240,235,224,0.38);
          font-weight: 300;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        /* fields */
        .field { margin-bottom: 1.05rem; }
        .field label {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,235,224,0.42);
          margin-bottom: 0.45rem;
        }
        .field-wrap { position: relative; }
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
          margin-top: 1.5rem;
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

        .terms {
          font-size: 0.72rem;
          color: rgba(240,235,224,0.25);
          line-height: 1.6;
          margin-top: 1rem;
          text-align: center;
        }
        .terms a {
          color: rgba(212,175,55,0.6);
          text-decoration: none;
        }
        .terms a:hover { color: #d4af37; }

        .auth-footer {
          text-align: center;
          font-size: 0.8rem;
          color: rgba(240,235,224,0.3);
          margin-top: 1.5rem;
        }
        .auth-footer a {
          color: #d4af37;
          text-decoration: none;
          font-weight: 500;
        }
        .auth-footer a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .auth-root { grid-template-columns: 1fr; }
          .auth-deco-side { display: none; }
          .auth-form-side { background: #0c0c0c; min-height: 100vh; order: 1; }
        }
      `}</style>

      <div className="auth-root">
        {/* ── Form side (left on signup) ── */}
        <div className={`auth-form-side ${mounted ? "in" : ""}`}>
          <div className="auth-card">
            <div className="auth-pill">
              <span className="auth-pill-dot" />
              New member
            </div>

            <h1 className="auth-title">Create your<br />account</h1>
            <p className="auth-sub">Join thousands of shoppers and discover your style.</p>

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
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                  <span className="field-underline" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="confirm">Confirm password</label>
                <div className="field-wrap">
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    placeholder="Repeat your password"
                    required
                    autoComplete="new-password"
                  />
                  <span className="field-underline" />
                </div>
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? <span className="spinner" /> : null}
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p className="terms">
              By signing up you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </p>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link href="/auth/signin">Sign in →</Link>
            </div>
          </div>
        </div>

        {/* ── Decorative side (right on signup) ── */}
        <div className="auth-deco-side">
          <div className="auth-deco-grid" />
          <div className="auth-deco-glow" />
          <div className="auth-deco-glow2" />

          <div className="auth-logo">Shopco</div>

          <div className="auth-deco-content">
            <h2>
              Join the community<br />
              and unlock <em>exclusive</em><br />
              member benefits.
            </h2>
            <div className="perks">
              <div className="perk">
                <div className="perk-icon">✦</div>
                <div className="perk-text">
                  <strong>Early access</strong>
                  <span>Shop new arrivals before anyone else.</span>
                </div>
              </div>
              <div className="perk">
                <div className="perk-icon">◈</div>
                <div className="perk-text">
                  <strong>Member discounts</strong>
                  <span>Exclusive deals only for registered members.</span>
                </div>
              </div>
              <div className="perk">
                <div className="perk-icon">⊕</div>
                <div className="perk-text">
                  <strong>Order tracking</strong>
                  <span>Track every order right from your dashboard.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}