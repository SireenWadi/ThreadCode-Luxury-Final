"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    setEmail("");
    setPassword("");
    setConfirm("");
    setName("");
    setShowPassword(false);
    setShowConfirm(false);
    setSuccess(false);
  };

  if (!mounted) return null;

  return (
<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(8,8,8,0.78),
          rgba(8,8,8,0.88)
        ),
        url('/images/auth-bg.png')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "brightness(0.65) saturate(1.05)",
      transform: "scale(1.02)",
    }}
  />
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(201,169,122,0.12) 0%, transparent 60%)",
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(201,169,122,0.10) 0%, transparent 60%)",
              "radial-gradient(ellipse 80% 60% at 50% 10%, rgba(201,169,122,0.08) 0%, transparent 60%)",
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(201,169,122,0.12) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
        {/* Floating orbs */}
        {[
          { x: "15%", y: "20%", size: 300, delay: 0 },
          { x: "75%", y: "70%", size: 200, delay: 3 },
          { x: "60%", y: "15%", size: 150, delay: 6 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background:
                "radial-gradient(circle, rgba(201,169,122,0.06) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Fine noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--silver-400)] hover:text-[var(--gold-light)] transition-colors duration-500 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="group-hover:-translate-x-1 transition-transform duration-500"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.18em]">
            ThreadCode
          </span>
        </Link>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glass card */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            borderRadius: "4px",
          }}
          className="p-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-10"
          >
            <div className="font-serif text-2xl text-[var(--silver-100)] tracking-[-0.02em] mb-1">
              Thread<span style={{ color: "var(--gold)" }}>Code</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-[var(--silver-500)]">
              AI — Luxury Styling
            </div>
          </motion.div>

          {/* Mode Toggle */}
          <div
            className="flex mb-8 relative"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
              padding: "3px",
            }}
          >
            <motion.div
              layoutId="auth-tab-bg"
              className="absolute inset-y-[3px]"
              style={{
                width: "calc(50% - 3px)",
                background:
                  "linear-gradient(135deg, rgba(201,169,122,0.2), rgba(201,169,122,0.08))",
                border: "1px solid rgba(201,169,122,0.25)",
                borderRadius: "1px",
                left: mode === "login" ? "3px" : "calc(50%)",
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-2.5 relative z-10 transition-colors duration-400"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:
                    mode === m
                      ? "var(--gold-light)"
                      : "var(--silver-500)",
                  fontWeight: mode === m ? 500 : 300,
                }}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {mode === "signup" && (
                <LuxuryInput
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="Your name"
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                />
              )}

              <LuxuryInput
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your@email.com"
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />

              <LuxuryPasswordInput
                label="Password"
                value={password}
                onChange={setPassword}
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                placeholder={mode === "signup" ? "Create a password" : "Enter password"}
              />

              {mode === "signup" && (
                <LuxuryPasswordInput
                  label="Confirm Password"
                  value={confirm}
                  onChange={setConfirm}
                  show={showConfirm}
                  onToggle={() => setShowConfirm(!showConfirm)}
                  placeholder="Confirm your password"
                />
              )}

              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[10px] text-[var(--silver-500)] hover:text-[var(--gold-light)] transition-colors duration-400 tracking-[0.1em]"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || success}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-2 relative overflow-hidden"
                style={{
                  height: 48,
                  background: success
                    ? "linear-gradient(135deg, rgba(100,200,120,0.3), rgba(80,180,100,0.15))"
                    : "linear-gradient(135deg, rgba(201,169,122,0.3) 0%, rgba(168,133,80,0.2) 100%)",
                  border: `1px solid ${success ? "rgba(100,200,120,0.4)" : "rgba(201,169,122,0.4)"}`,
                  borderRadius: "2px",
                  color: success ? "rgba(100,200,120,0.9)" : "var(--gold-light)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.5s ease",
                }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <LoadingDots />
                    </motion.div>
                  ) : success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Welcome to ThreadCode
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Shimmer effect */}
                {!loading && !success && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(201,169,122,0.1), transparent)",
                      transform: "translateX(-100%)",
                    }}
                    animate={{ transform: ["translateX(-100%)", "translateX(100%)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}
              </motion.button>

              {mode === "signup" && (
                <p className="text-center text-[9px] text-[var(--silver-500)] leading-relaxed mt-4 tracking-wide">
                  By creating an account, you agree to our{" "}
                  <span className="text-[var(--gold)] cursor-pointer hover:text-[var(--gold-light)] transition-colors">
                    Privacy Policy
                  </span>{" "}
                  &{" "}
                  <span className="text-[var(--gold)] cursor-pointer hover:text-[var(--gold-light)] transition-colors">
                    Terms of Service
                  </span>
                </p>
              )}
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-600)] whitespace-nowrap" style={{ color: "rgba(154,154,146,0.5)" }}>
              or continue with
            </span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: "Google",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="rgba(201,169,122,0.6)"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="rgba(201,169,122,0.5)"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="rgba(201,169,122,0.4)"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="rgba(201,169,122,0.55)"/>
                  </svg>
                ),
              },
              {
                name: "Apple",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(201,169,122,0.6)">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                ),
              },
            ].map((provider) => (
              <motion.button
                key={provider.name}
                whileHover={{ scale: 1.02, borderColor: "rgba(201,169,122,0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 py-3 transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "2px",
                  color: "var(--silver-400)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {provider.icon}
                {provider.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Below card */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-6 text-[10px] text-[var(--silver-500)] tracking-wider"
        >
          {mode === "login" ? "New to ThreadCode? " : "Already a member? "}
          <button
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            className="transition-colors duration-400"
            style={{ color: "var(--gold)" }}
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function LuxuryInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        className="block mb-1.5"
        style={{
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: focused ? "var(--gold-light)" : "var(--silver-500)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center transition-all duration-400"
        style={{
          background: focused
            ? "rgba(201,169,122,0.04)"
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${focused ? "rgba(201,169,122,0.35)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "2px",
        }}
      >
        <div
          className="absolute left-3.5"
          style={{ color: focused ? "var(--gold)" : "var(--silver-500)", transition: "color 0.3s" }}
        >
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent pl-10 pr-4 py-3.5 outline-none"
          style={{
            fontSize: "12px",
            color: "var(--silver-200)",
            letterSpacing: "0.02em",
          }}
          autoComplete={type === "email" ? "email" : "off"}
        />
      </div>
    </div>
  );
}

function LuxuryPasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        className="block mb-1.5"
        style={{
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: focused ? "var(--gold-light)" : "var(--silver-500)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center transition-all duration-400"
        style={{
          background: focused
            ? "rgba(201,169,122,0.04)"
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${focused ? "rgba(201,169,122,0.35)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "2px",
        }}
      >
        <div className="absolute left-3.5" style={{ color: focused ? "var(--gold)" : "var(--silver-500)", transition: "color 0.3s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent pl-10 pr-11 py-3.5 outline-none"
          style={{
            fontSize: "12px",
            color: "var(--silver-200)",
            letterSpacing: show ? "0.02em" : "0.1em",
          }}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 transition-colors duration-300"
          style={{ color: show ? "var(--gold)" : "var(--silver-500)" }}
        >
          {show ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 5, height: 5, background: "var(--gold)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
