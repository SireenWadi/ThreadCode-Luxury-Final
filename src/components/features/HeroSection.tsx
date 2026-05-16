"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MISSIONS = [
  {
    id: "interview",
    label: "Job Interview",
    sub: "Command the room before you speak.",
    href: "/quiz?occasion=JOB_INTERVIEW",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    id: "gym",
    label: "Gym",
    sub: "Performance elevated to artistry.",
    href: "/quiz?occasion=GYM",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4" />
      </svg>
    ),
  },
  {
    id: "dinner",
    label: "Dinner Night",
    sub: "An entrance. A lasting impression.",
    href: "/quiz?occasion=DINNER_NIGHT",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-animated-gradient">
      {/* ─── Floating Gold Particles ────────────────────────────────────────── */}
      {[
        { size: 2, x: "15%", y: "30%", dur: 7, delay: 0 },
        { size: 1.5, x: "45%", y: "20%", dur: 9, delay: 1.5 },
        { size: 2.5, x: "70%", y: "60%", dur: 6, delay: 0.8 },
        { size: 1, x: "85%", y: "35%", dur: 11, delay: 2 },
        { size: 3, x: "30%", y: "75%", dur: 8, delay: 3 },
        { size: 1.5, x: "60%", y: "80%", dur: 10, delay: 1 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-[2]"
          style={{ left: p.x, top: p.y, width: p.size * 2, height: p.size * 2, background: "var(--gold)", opacity: 0.3 }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ─── Layer 1: Background Image ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cinematic-hero.png')" }}
      />

      {/* ─── Layer 2: Cinematic Video Overlay ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
        className="absolute inset-0 z-[1]"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/cinematic-hero.png"
        >
          <source src="/videos/fashion-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ─── Layer 3: Soft Gradient Overlay ────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[rgba(12,12,12,0.90)] via-[rgba(12,12,12,0.55)] to-[rgba(12,12,12,0.15)]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[rgba(12,12,12,0.80)] via-transparent to-transparent" />

      {/* ─── Content Layer ─────────────────────────────────────────────────── */}
      <div className="relative z-[3] h-full max-w-[1400px] mx-auto px-8 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
          {/* Left: Mission Selection Panel */}
          <div>
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-5 h-px bg-[var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[var(--gold)]">
                AI Fashion Intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] text-[var(--silver-100)] leading-[1.04] mb-5"
            >
              Dress with
              <br />
              <em className="gold-text not-italic">intention.</em>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="text-sm font-light text-[var(--silver-400)] leading-relaxed max-w-sm mb-10"
            >
              ThreadCode reads the room before you enter it. Select your
              occasion, share your proportions, and receive a curated capsule
              worthy of a stylist's eye.
            </motion.p>

            {/* Mission Cards */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.65}
              className="space-y-3"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--silver-500)] mb-4">
                Select your occasion
              </p>
              {MISSIONS.map((mission, i) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.75 + i * 0.12,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={mission.href}
                    className="glass glass-hover flex items-center gap-4 p-4 group"
                    style={{ borderRadius: "2px" }}
                  >
                    <div className="w-9 h-9 flex items-center justify-center border border-[var(--glass-border)] group-hover:border-[var(--gold)] text-[var(--silver-400)] group-hover:text-[var(--gold-light)] transition-all duration-500">
                      {mission.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-[0.14em] font-medium text-[var(--silver-200)] group-hover:text-[var(--gold-light)] transition-colors duration-500 leading-none mb-1">
                        {mission.label}
                      </div>
                      <div className="text-[11px] text-[var(--silver-500)] font-light">
                        {mission.sub}
                      </div>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[var(--silver-500)] group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all duration-500"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1.1}
              className="flex items-center gap-4 mt-8"
            >
              <Link href="/quiz" className="btn-primary text-[11px]">
                Begin Full Quiz
              </Link>
              <Link
                href="/stylist"
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--silver-400)] hover:text-[var(--gold-light)] transition-colors duration-500 flex items-center gap-2"
              >
                Open Stylist Canvas
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right: Cinematic copy / accent — visible on desktop only */}
          <div className="hidden lg:flex flex-col items-end justify-end h-full pb-16 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.5 }}
              className="text-right"
            >
              <p className="font-serif italic text-[var(--silver-300)] text-lg leading-snug">
                "Style is knowing who you are,
                <br />
                what you want to say,
                <br />
                and not giving a damn."
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)] mt-3">
                Gore Vidal
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 h-px origin-right"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--gold-dark), var(--gold))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--silver-500)]">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--gold)]"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
