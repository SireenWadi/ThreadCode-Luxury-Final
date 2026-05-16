"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export function BeforeAfterSection() {
  const [sliderX, setSliderX] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95);
    setSliderX(pct);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging.current) handleMove(e.clientX);
    },
    [handleMove]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="bg-radial-luxury absolute inset-0 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-5 h-px bg-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
              The ThreadCode Difference
            </span>
            <div className="w-5 h-px bg-[var(--gold)]" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] text-[var(--silver-100)]">
            Before & After
          </h2>
          <p className="text-sm text-[var(--silver-400)] font-light mt-3 max-w-sm mx-auto">
            Drag to reveal the transformation. The same person. An entirely
            different presence.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative aspect-[4/5] overflow-hidden cursor-ew-resize select-none"
            onMouseDown={() => (dragging.current = true)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
          >
            {/* Before (left) */}
            <div className="absolute inset-0">
              <div
                className="w-full h-full bg-cover bg-center bg-[var(--bg-tertiary)]"
                style={{ backgroundImage: "url('/images/before-outfit.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,12,0.5)] to-transparent" />
              <div
                className="absolute bottom-6 left-6 glass px-3 py-2"
                style={{ borderRadius: "1px" }}
              >
                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-400)]">
                  Before
                </span>
              </div>
            </div>

            {/* After (right) — clipped */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-[var(--bg-secondary)]"
                style={{ backgroundImage: "url('/images/after-outfit.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,12,0.4)] to-transparent" />
              <div
                className="absolute bottom-6 right-6 glass px-3 py-2"
                style={{ borderRadius: "1px", borderColor: "var(--gold)" }}
              >
                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">
                  ThreadCode
                </span>
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute inset-y-0 w-px bg-[var(--gold)] pointer-events-none"
              style={{ left: `${sliderX}%` }}
            />

            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--gold)] flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderX}%` }}
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
                <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          {/* Labels below */}
          <div className="flex items-center justify-between mt-5 px-2">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-500)]">
                Generic
              </p>
              <p className="text-xs text-[var(--silver-400)] font-light">
                Undifferentiated. Forgettable.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">
                ThreadCode
              </p>
              <p className="text-xs text-[var(--silver-400)] font-light">
                Curated. Considered. Yours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
