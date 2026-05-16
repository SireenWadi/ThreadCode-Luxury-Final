"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LuxuryLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 600);
          return 100;
        }
        // Accelerate toward end
        const increment = p < 60 ? 3 : p < 85 ? 2 : 1;
        return Math.min(p + increment, 100);
      });
    }, 28);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: "#080808" }}
        >
          {/* Animated gradient orb */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,169,122,0.08) 0%, transparent 70%)",
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,122,0.12) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,169,122,0.08) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--silver-100)",
              }}
            >
              Thread
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #d4b896 0%, #c9a97a 50%, #a88550 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Code
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, var(--gold), transparent)",
                marginTop: 8,
                transformOrigin: "center",
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--silver-500)",
                marginTop: 6,
              }}
            >
              AI — Luxury Styling
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ width: 160, position: "relative" }}
          >
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))",
                  width: `${progress}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 10,
                textAlign: "center",
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "rgba(154,154,146,0.5)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {progress}
            </div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 2,
                height: 2,
                background: "var(--gold)",
                left: `${15 + i * 14}%`,
                top: `${30 + Math.sin(i * 1.2) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
