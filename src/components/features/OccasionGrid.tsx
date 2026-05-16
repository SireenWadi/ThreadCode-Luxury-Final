"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ImageFilename } from "@/components/ui/ImageWithLabel";

const occasions = [
  {
    id: "interview",
    title: "Job Interview",
    subtitle: "Tailored Authority",
    description: "Precision-cut pieces that project competence. Every detail a signal, every silhouette a statement.",
    href: "/shop?occasion=JOB_INTERVIEW",
    image: "/images/occasion-interview.png",
    count: "4 curated pieces",
    number: "01",
  },
  {
    id: "gym",
    title: "Gym",
    subtitle: "Performance Aesthetics",
    description: "Technical fabrics with architectural restraint. Luxury in motion.",
    href: "/shop?occasion=GYM",
    image: "/images/occasion-gym.png",
    count: "4 curated pieces",
    number: "02",
  },
  {
    id: "dinner",
    title: "Dinner Night",
    subtitle: "Quiet Opulence",
    description: "Cashmere, silk, and considered gold. The language of effortless refinement.",
    href: "/shop?occasion=DINNER_NIGHT",
    image: "/images/occasion-dinner.png",
    count: "4 curated pieces",
    number: "03",
  },
];

function OccasionCard({ occ, index }: { occ: typeof occasions[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={occ.href} className="block group card-glow">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[3/4] mb-5"
          style={{ background: "var(--bg-tertiary)", border: "1px solid var(--glass-border)", borderRadius: "2px" }}>

          {/* Parallax image wrapper */}
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.12 }}>
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-1200 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${occ.image}')` }}
            />
          </motion.div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.75)] via-[rgba(8,8,8,0.1)] to-transparent"/>

          {/* Gold hover wash */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ background: "rgba(201,169,122,0.05)" }}
          />

          {/* Number */}
          <div className="absolute top-4 left-4 z-10">
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 5vw, 4rem)",
              fontWeight: 400,
              color: "rgba(201,169,122,0.12)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {occ.number}
            </span>
          </div>

          {/* Count Badge */}
          <div className="absolute top-4 right-4 glass px-3 py-1.5" style={{ borderRadius: "1px" }}>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-400)]">{occ.count}</span>
          </div>

          {/* Filename label */}
          <div className="absolute bottom-14 left-3 z-10">
            <ImageFilename src={occ.image} />
          </div>

          {/* Bottom hover arrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-x-4 bottom-4 glass flex items-center justify-between py-2.5 px-3"
            style={{ borderRadius: "1px" }}>
            <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--gold-light)]">Explore</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--gold)]">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--gold)] font-medium">{occ.subtitle}</div>
          <h3 className="font-serif text-xl text-[var(--silver-100)] group-hover:text-[var(--gold-light)] transition-colors duration-500">
            {occ.title}
          </h3>
          <p className="text-xs text-[var(--silver-400)] font-light leading-relaxed">{occ.description}</p>
        </div>

        {/* Arrow link */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--silver-500)] group-hover:text-[var(--gold)] transition-colors duration-500">
            Explore Collection
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-[var(--silver-500)] group-hover:text-[var(--gold)] group-hover:translate-x-1.5 transition-all duration-500">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}

export function OccasionGrid() {
  return (
    <section id="occasions" className="section-luxury relative overflow-hidden">
      <div className="bg-radial-luxury absolute inset-0 pointer-events-none"/>

      {/* Floating gold orb */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,122,0.04) 0%, transparent 70%)", filter: "blur(40px)" }}/>

      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="section-label">
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] text-[var(--silver-100)]">
            Every occasion,<br />
            <em className="gold-text-shimmer not-italic">perfectly dressed.</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {occasions.map((occ, i) => (
            <OccasionCard key={occ.id} occ={occ} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
