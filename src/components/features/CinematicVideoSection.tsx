"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function CinematicVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: video moves slightly opposite to scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Scale up as you scroll into view
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.04, 1.08]);

  useEffect(() => {
    if (videoRef.current && isInView) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  const lines = [
    { text: "Dressed by Intelligence.", delay: 0.2 },
    { text: "Worn with Intention.", delay: 0.5 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "90vh", minHeight: 600 }}
    >
      {/* ─── Video Layer ──────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "opacity 1.5s ease" }}
          // Fallback: use a fashion-themed free video. In production, replace with actual asset.
          src="/videos/cinematic-fashion.mp4"
          poster="/images/cinematic-poster.png"
        />

        {/* Fallback gradient if video fails */}
        {!videoLoaded && (
          <div
            className="absolute inset-0"
            style={{
              
            }}
          />
        )}
      </motion.div>

      {/* ─── Gradient Overlays ────────────────────────────────────────────────── */}
      {/* Top vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, transparent 25%, transparent 55%, rgba(8,8,8,0.85) 100%)",
        }}
      />
      {/* Side vignettes */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,8,8,0.35) 0%, transparent 20%, transparent 80%, rgba(8,8,8,0.35) 100%)",
        }}
      />
      {/* Gold tone wash */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,122,0.04) 0%, transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* ─── Decorative Lines ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-12 left-0 right-0 z-[5] pointer-events-none"
        style={{ transformOrigin: "left" }}
      >
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,122,0.25) 20%, rgba(201,169,122,0.15) 80%, transparent)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-0 right-0 z-[5] pointer-events-none"
        style={{ transformOrigin: "right" }}
      >
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,122,0.15) 20%, rgba(201,169,122,0.25) 80%, transparent)",
          }}
        />
      </motion.div>

      {/* ─── Overlay Text ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[6] flex flex-col items-center justify-center text-center px-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div
            style={{
              width: 40,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, var(--gold))",
            }}
          />
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            The ThreadCode Vision
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background:
                "linear-gradient(90deg, var(--gold), transparent)",
            }}
          />
        </motion.div>

        {/* Main headline — staggered lines */}
        <div className="space-y-2 mb-6">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  isInView
                    ? { y: "0%", opacity: 1 }
                    : { y: "110%", opacity: 0 }
                }
                transition={{
                  duration: 1.1,
                  delay: line.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.4rem, 6vw, 5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "var(--silver-100)",
                  textShadow: "0 2px 40px rgba(0,0,0,0.6)",
                }}
              >
                {line.text}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
            color: "var(--silver-400)",
            letterSpacing: "0.04em",
            fontWeight: 300,
            maxWidth: 440,
            lineHeight: 1.7,
            textShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}
        >
          Where artificial intelligence meets authentic style.
          <br />
          Every outfit, a quiet statement.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/stylist"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 inline-flex items-center gap-3 group"
          style={{
            padding: "12px 28px",
            border: "1px solid rgba(201,169,122,0.35)",
            background: "rgba(201,169,122,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold-light)",
            textDecoration: "none",
            borderRadius: "1px",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
          whileHover={{
            background: "rgba(201,169,122,0.14)",
            borderColor: "rgba(201,169,122,0.5)",
            y: -2,
          }}
        >
          Enter the Stylist
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.4 }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </motion.a>
      </div>

      {/* ─── Corner Accents ───────────────────────────────────────────────────── */}
      {[
        { top: 32, left: 32, origin: "top left" },
        { top: 32, right: 32, origin: "top right" },
        { bottom: 32, left: 32, origin: "bottom left" },
        { bottom: 32, right: 32, origin: "bottom right" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-[5] pointer-events-none"
          style={{ ...pos, width: 24, height: 24 } as React.CSSProperties}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d={
                i === 0
                  ? "M0 10 V0 H10"
                  : i === 1
                  ? "M24 10 V0 H14"
                  : i === 2
                  ? "M0 14 V24 H10"
                  : "M24 14 V24 H14"
              }
              stroke="rgba(201,169,122,0.35)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}

      {/* ─── Film grain overlay ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035,
        }}
        animate={{ opacity: [0.03, 0.04, 0.03] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
      />
    </section>
  );
}
