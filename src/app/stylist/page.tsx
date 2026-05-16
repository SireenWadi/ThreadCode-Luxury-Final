"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import type { Product } from "@/types";

// ── Z-Index layering — Virtual Fitting Room ────────────────────────────────────
// Base Model: z-10 | BOTTOM: z-20 | TOP: z-30 | OUTERWEAR: z-40 | ACCESSORY: z-50
const CATEGORY_Z: Record<string, number> = {
  BOTTOM:    20,
  TOP:       30,
  OUTERWEAR: 40,
  FOOTWEAR:  15,
  ACCESSORY: 50,
};

// ── Overlay positions — Male proportions (calibrated to male-base.png) ─────────
// Model: full-body, shoulders ~18% from top, hips ~50%, ankles ~88%
const OVERLAY_MALE: Record<string, { top: string; left: string; width: string; height: string }> = {
  OUTERWEAR: { top: "17%",  left: "10%",  width: "80%",  height: "40%"  },
  TOP:       { top: "9%",  left: "5%",  width: "90%",  height: "55%"  },
  BOTTOM:    { top: "38%",  left: "12%",  width: "76%",  height: "50%"  },
  FOOTWEAR:  { top: "86%",  left: "19%",  width: "65%",  height: "14%" },
  ACCESSORY: { top: "43%",  left: "60%",  width: "28%",  height: "16%"  },
};

// ── Overlay positions — Female proportions (calibrated to female-base.png) ─────
// Model: full-body, shoulders ~16% from top, hips ~47%, ankles ~87%
const OVERLAY_FEMALE: Record<string, { top: string; left: string; width: string; height: string }> = {
  OUTERWEAR: { top: "17%",  left: "9%",  width: "78%",  height: "33%"  },
  TOP:       { top: "14%",  left: "15%",  width: "72%",  height: "36%"  },
  BOTTOM:    { top: "38%",  left: "12%",  width: "76%",  height: "50%"  },
  FOOTWEAR:  { top: "87%",  left: "17%",  width: "65%",  height: "14%"  },
  ACCESSORY: { top: "48%",  left: "60%",  width: "28%",  height: "16%"  },
};

// ── Slot definitions ──────────────────────────────────────────────────────────
const SLOTS: { category: keyof typeof CATEGORY_Z; label: string; hint: string }[] = [
  { category: "OUTERWEAR", label: "Outerwear / Layer", hint: "Blazers, coats, jackets"  },
  { category: "TOP",       label: "Top",               hint: "Shirts, knitwear, tees"   },
  { category: "BOTTOM",    label: "Bottom",            hint: "Trousers, shorts, skirts" },
  { category: "FOOTWEAR",  label: "Footwear",          hint: "Shoes, boots, sneakers"   },
  { category: "ACCESSORY", label: "Accessory",         hint: "Rings, watches, bags"     },
];

const OCC_LABEL: Record<string, string> = {
  JOB_INTERVIEW: "Interview",
  GYM: "Gym",
  DINNER_NIGHT: "Dinner",
};

// ── Compatibility Engine ──────────────────────────────────────────────────────
function calcCompatibility(items: Product[]): { score: number; grade: string; advice: string; color: string } {
  if (items.length === 0) return { score: 0, grade: "—", advice: "Select pieces from the sidebar to begin.", color: "var(--silver-500)" };

  const occasions    = new Set(items.map((i) => i.occasion));
  const categories   = items.map((i) => i.category);
  const hasTop       = categories.includes("TOP");
  const hasBottom    = categories.includes("BOTTOM");
  const hasFootwear  = categories.includes("FOOTWEAR");
  const hasOuter     = categories.includes("OUTERWEAR");
  const hasAccessory = categories.includes("ACCESSORY");

  if (occasions.size > 1) {
    return { score: 28, grade: "D", advice: "Occasions clash — align every piece to one context.", color: "var(--silver-500)" };
  }

  let score = 35;
  if (hasTop)                 score += 10;
  if (hasBottom)              score += 12;
  if (hasTop && hasBottom)    score += 8;
  if (hasFootwear)            score += 12;
  if (hasOuter)               score += 8;
  if (hasAccessory)           score += 5;
  if (items.length >= 4)      score += 5;
  if (items.length >= 5)      score += 5;

  const allTags = items.flatMap((i) => i.styleTags.split(",").map((t) => t.trim()).filter(Boolean));
  const freq: Record<string, number> = {};
  allTags.forEach((t) => { freq[t] = (freq[t] ?? 0) + 1; });
  const maxFreq = Math.max(0, ...Object.values(freq));
  if (maxFreq >= 3) score += 5;
  else if (maxFreq >= 2) score += 3;

  score = Math.min(score, 100);

  const grade = score >= 90 ? "S" : score >= 78 ? "A" : score >= 62 ? "B" : score >= 46 ? "C" : "D";
  const color = score >= 80 ? "var(--gold)" : score >= 60 ? "var(--silver-300)" : "var(--silver-500)";

  const advices: Record<string, string> = {
    1: "One piece selected. Add a bottom and top to establish the foundation.",
    2: !hasFootwear ? "Footwear will ground the look and complete the visual weight." : "An outer layer adds dimension — consider a blazer or coat.",
    3: hasTop && hasBottom && hasFootwear ? "Excellent foundation. An accessory or layer will complete the composition." : "A few key pieces are missing — check the outfit checklist.",
    4: "Well-balanced outfit. Style coherence is strong. Fine-tune with accessories.",
    5: "Complete look. All zones considered. The outfit speaks with one voice.",
  };

  return { score, grade, color, advice: advices[Math.min(items.length, 5)] ?? "Polished selection." };
}

// ── Score Ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score, grade, color }: { score: number; grade: string; color: string }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[84px] h-[84px] flex items-center justify-center">
        <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
          <circle cx="42" cy="42" r={r} fill="none" stroke="var(--glass-border)" strokeWidth="2.5" />
          <motion.circle
            cx="42" cy="42" r={r}
            fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={circ}
            animate={{ strokeDashoffset: circ - (score / 100) * circ }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-serif text-2xl leading-none"
            style={{ color }}
            key={grade}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {grade}
          </motion.span>
          <span className="text-[7px] text-[var(--silver-500)] mt-0.5">{score}/100</span>
        </div>
      </div>
    </div>
  );
}

// ── Virtual Fitting Model ─────────────────────────────────────────────────────
function VirtualFittingModel({
  canvasItems,
  gender,
  onItemClick,
}: {
  canvasItems: Product[];
  gender: "men" | "women";
  onItemClick: (product: Product) => void;
}) {
  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "0.55 / 1",
        maxWidth: "340px",
        margin: "0 auto",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(201,169,122,0.07) 0%, transparent 70%)",
          borderRadius: "2px",
          zIndex: 5,
        }}
      />

      {/* Base model image — z-10 — photo-realistic PNG */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 10,
          borderRadius: "2px",
          overflow: "hidden",
          // Dark bg is REQUIRED for mix-blend-mode: screen to work on garments
          background: "#111",
        }}
      >
        <img
          src={gender === "women" ? "/images/female-base.png" : "/images/male-base.png"}
          alt={`${gender} base model`}
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
          }}
          draggable={false}
        />
      </div>

      {/* Fallback silhouette shown only if model image fails to load */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 9, opacity: 0.06 }}
      >
        <svg viewBox="0 0 160 420" width="70%" fill="currentColor" className="text-[var(--silver-100)]">
          <ellipse cx="80" cy="32" rx="28" ry="28" />
          <path d="M52 68 C32 80 24 120 24 155 L52 155 L44 230 L116 230 L108 155 L136 155 C136 120 128 80 108 68 Z" />
          <path d="M50 228 L38 370 L68 370 L80 290 L92 370 L122 370 L110 228 Z" />
        </svg>
      </div>

      {/* Clothing overlays — Framer Motion fade-and-scale entry */}
      <AnimatePresence>
        {canvasItems.map((item) => {
          const overlayMap = gender === "women" ? OVERLAY_FEMALE : OVERLAY_MALE;
          const pos   = overlayMap[item.category];
          const zIdx  = CATEGORY_Z[item.category] ?? 30;
          if (!pos) return null;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute group cursor-pointer"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.width,
                height: pos.height,
                zIndex: zIdx,
              }}
              onClick={() => onItemClick(item)}
              title={`${item.name} — click to inspect`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  // PNG has black background → screen blend makes black transparent
                  mixBlendMode: "screen",
                  transition: "filter 0.3s ease",
                }}
                draggable={false}
              />

              {/* Hover ring */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  outline: "1px solid rgba(201,169,122,0.5)",
                  outlineOffset: "2px",
                }}
              />

              {/* Category label */}
              <div
                className="absolute -bottom-5 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: zIdx + 1 }}
              >
                <span
                  className="text-[7px] uppercase tracking-[0.18em] text-[var(--gold)] glass px-2 py-0.5"
                  style={{ borderRadius: "1px" }}
                >
                  {item.name.slice(0, 18)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Empty-state watermark */}
      {canvasItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-6 inset-x-0 text-center pointer-events-none"
          style={{ zIndex: 60 }}
        >
          <p className="text-[8px] uppercase tracking-[0.22em] text-[var(--silver-500)]">
            Select pieces to dress the model
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function StylistPage() {
  const { addItems } = useCart();
  const [products, setProducts]       = useState<Product[]>([]);
  const [canvasItems, setCanvasItems] = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [activeFilter, setActiveFilter] = useState("");
  const [quickView, setQuickView]     = useState<Product | null>(null);
  const [outfitAdded, setOutfitAdded] = useState(false);
  const [gender, setGender]           = useState<"men" | "women">("men");

  const { score, grade, advice, color } = calcCompatibility(canvasItems);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ gender });
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products ?? []);
        setCanvasItems([]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gender]);

  const toggleItem = useCallback((product: Product) => {
    setCanvasItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev.filter((i) => i.category !== product.category), product];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setCanvasItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  function handleAddOutfitToCart() {
    if (canvasItems.length === 0) return;
    addItems(canvasItems);
    setOutfitAdded(true);
    setTimeout(() => setOutfitAdded(false), 2500);
  }

  const visibleProducts = activeFilter
    ? products.filter((p) => p.occasion === activeFilter)
    : products;

  const occCounts = products.reduce((acc, p) => {
    acc[p.occasion] = (acc[p.occasion] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const outfitTotal = canvasItems.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />

      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-px bg-[var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Virtual Fitting Room</span>
            </div>
            <h1 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-[var(--silver-100)]">
              Styling Canvas
            </h1>
            <p className="text-xs text-[var(--silver-400)] font-light mt-1">
              Click pieces to dress the model. Garments layer in correct order. Click on-model items to inspect.
            </p>

            {/* Gender Toggle */}
            <div className="flex items-center gap-3 mt-5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-500)]">Model</span>
              <div
                className="flex glass overflow-hidden"
                style={{ borderRadius: "2px" }}
              >
                {(["men", "women"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-5 py-2 text-[9px] uppercase tracking-[0.18em] font-medium transition-all duration-500 relative ${
                      gender === g
                        ? "text-[var(--bg-primary)]"
                        : "text-[var(--silver-400)] hover:text-[var(--silver-200)]"
                    }`}
                    style={{
                      background: gender === g
                        ? "linear-gradient(135deg, var(--gold-dark), var(--gold))"
                        : "transparent",
                    }}
                  >
                    {g === "men" ? (
                      <span className="flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="5" r="3" />
                          <path d="M12 8v13M8 14h8" />
                        </svg>
                        Men
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="7" r="4" />
                          <path d="M12 11v10M9 18l3 3 3-3" />
                        </svg>
                        Women
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <span className="text-[8px] text-[var(--silver-500)] font-light">
                Wardrobe updates automatically
              </span>
            </div>
          </motion.div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_260px] gap-5 items-start">

            {/* ── Col 1: Sidebar ── */}
            <div>
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-1 mb-3">
                {[
                  { id: "", label: `All (${products.length})` },
                  ...Object.entries(OCC_LABEL).map(([id, label]) => ({
                    id,
                    label: `${label} (${occCounts[id] ?? 0})`,
                  })),
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveFilter(id)}
                    className={`text-[8px] uppercase tracking-[0.12em] px-2.5 py-1.5 border transition-all duration-300 ${
                      activeFilter === id
                        ? "border-[var(--gold)] text-[var(--gold)]"
                        : "border-[var(--glass-border)] text-[var(--silver-500)] hover:border-[var(--silver-400)]"
                    }`}
                    style={{ borderRadius: "1px" }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Product list */}
              <div className="space-y-1.5 max-h-[680px] overflow-y-auto pr-0.5">
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-16 bg-[var(--bg-tertiary)] animate-pulse" style={{ borderRadius: "1px" }} />
                    ))
                  : visibleProducts.map((product) => {
                      const onCanvas = canvasItems.some((i) => i.id === product.id);
                      return (
                        <motion.div
                          key={product.id}
                          layout
                          className={`glass glass-hover flex items-center gap-2.5 p-2.5 group cursor-pointer transition-all duration-400 ${
                            onCanvas ? "border-[var(--gold)] bg-[rgba(201,169,122,0.04)]" : ""
                          }`}
                          style={{ borderRadius: "1px" }}
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Thumbnail — grounded background for transparent PNG */}
                          <div
                            className="w-9 h-11 flex-shrink-0 cursor-zoom-in flex items-center justify-center overflow-hidden"
                            style={{
                              background: "var(--bg-secondary)",
                              border: "1px solid var(--glass-border)",
                              borderRadius: "1px",
                            }}
                            onClick={(e) => { e.stopPropagation(); setQuickView(product); }}
                          >
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full"
                              style={{ objectFit: "contain", objectPosition: "center", mixBlendMode: "screen" }}
                              draggable={false}
                            />
                          </div>

                          {/* Info */}
                          <div
                            className="flex-1 min-w-0"
                            onClick={() => toggleItem(product)}
                          >
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <p className="text-[7px] uppercase tracking-[0.14em] text-[var(--silver-500)] leading-none">{product.brand}</p>
                              {product.gender !== "unisex" && (
                                <span className="text-[6px] uppercase tracking-[0.1em] text-[var(--gold)] opacity-60">{product.gender}</span>
                              )}
                            </div>
                            <p className="text-[10px] text-[var(--silver-200)] truncate font-light">{product.name}</p>
                            <p className="text-[9px] text-[var(--gold)] mt-0.5">${product.price.toLocaleString()}</p>
                          </div>

                          {/* Toggle button */}
                          <button
                            onClick={() => toggleItem(product)}
                            className={`w-6 h-6 flex-shrink-0 border flex items-center justify-center transition-all duration-300 ${
                              onCanvas
                                ? "border-[var(--gold)] bg-[var(--gold)]"
                                : "border-[var(--glass-border)] group-hover:border-[var(--silver-400)]"
                            }`}
                            style={{ borderRadius: "1px" }}
                          >
                            {onCanvas ? (
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--bg-primary)]">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            ) : (
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--silver-500)]">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            )}
                          </button>
                        </motion.div>
                      );
                    })}
              </div>
            </div>

            {/* ── Col 2: Virtual Fitting Canvas ── */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[400px] mx-auto">
                {/* Active chips row */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-4 min-h-[26px]">
                  <AnimatePresence>
                    {canvasItems.map((item) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 glass px-2 py-1 group"
                        style={{ borderRadius: "1px", borderColor: "var(--gold)" }}
                      >
                        <span className="text-[7px] uppercase tracking-[0.14em] text-[var(--gold)]">
                          {item.category.slice(0, 3)}
                        </span>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--silver-500)] group-hover:text-[var(--silver-200)]">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>

                {/* The Model */}
                <VirtualFittingModel
                  canvasItems={canvasItems}
                  gender={gender}
                  onItemClick={(product) => setQuickView(product)}
                />

                {/* Slot checklist below model */}
                <div className="mt-5 grid grid-cols-5 gap-1">
                  {SLOTS.map((slot) => {
                    const filled = canvasItems.some((i) => i.category === slot.category);
                    return (
                      <div key={slot.category} className="flex flex-col items-center gap-1">
                        <div className={`w-full h-0.5 transition-all duration-700 ${filled ? "bg-[var(--gold)]" : "bg-[var(--glass-border)]"}`} />
                        <span className={`text-[7px] uppercase tracking-[0.12em] transition-colors duration-500 ${filled ? "text-[var(--gold)]" : "text-[var(--silver-600)]"}`}>
                          {slot.label.split(" / ")[0].slice(0, 5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Col 3: Intelligence Panel ── */}
            <div className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-500)]">Style Intelligence</p>

              {/* Score Ring */}
              <div className="glass p-5 flex flex-col items-center gap-3" style={{ borderRadius: "2px" }}>
                <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)] self-start">Compatibility</p>
                <ScoreRing score={score} grade={grade} color={color} />
              </div>

              {/* Advice */}
              <div className="glass p-4" style={{ borderRadius: "2px" }}>
                <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)] mb-2">Stylist Note</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={advice}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs text-[var(--silver-300)] font-light leading-relaxed"
                  >
                    {advice}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Outfit Checklist */}
              <div className="glass p-4" style={{ borderRadius: "2px" }}>
                <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)] mb-3">Outfit Checklist</p>
                <div className="space-y-2">
                  {SLOTS.map((slot) => {
                    const item = canvasItems.find((i) => i.category === slot.category);
                    return (
                      <div key={slot.category} className="flex items-center gap-2.5">
                        <div className={`w-3 h-3 border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          item ? "border-[var(--gold)] bg-[var(--gold)]" : "border-[var(--glass-border)]"
                        }`}>
                          {item && (
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--bg-primary)]">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-[9px] transition-colors duration-400 block truncate ${item ? "text-[var(--silver-200)]" : "text-[var(--silver-500)]"}`}>
                            {item ? item.name : slot.label}
                          </span>
                          {item && (
                            <span className="text-[7px] text-[var(--silver-500)]">${item.price.toLocaleString()}</span>
                          )}
                        </div>
                        {item && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--silver-600)] hover:text-[var(--silver-300)] transition-colors flex-shrink-0"
                          >
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total + Buy Full Outfit */}
              <AnimatePresence>
                {canvasItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="glass p-4 space-y-3"
                    style={{ borderRadius: "2px" }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)]">Outfit Total</p>
                      <p className="font-serif text-lg text-[var(--gold)]">${outfitTotal.toLocaleString()}</p>
                    </div>
                    <p className="text-[7px] text-[var(--silver-500)]">
                      {canvasItems.length} piece{canvasItems.length !== 1 ? "s" : ""} selected
                    </p>

                    {/* Buy Full Outfit button */}
                    <motion.button
                      onClick={handleAddOutfitToCart}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center justify-center gap-2 py-3 text-[9px] uppercase tracking-[0.16em] transition-all duration-500 ${
                        outfitAdded
                          ? "bg-[rgba(201,169,122,0.12)] border border-[var(--gold)] text-[var(--gold)]"
                          : "btn-primary"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {outfitAdded ? (
                          <motion.span key="added" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                            Full Outfit Added
                          </motion.span>
                        ) : (
                          <motion.span key="add" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            Buy Full Outfit
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <button
                      onClick={() => setCanvasItems([])}
                      className="w-full text-center text-[8px] uppercase tracking-[0.14em] text-[var(--silver-500)] hover:text-[var(--silver-300)] transition-colors duration-300"
                    >
                      Clear Canvas
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
