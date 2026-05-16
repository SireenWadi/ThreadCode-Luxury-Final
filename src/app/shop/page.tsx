"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import type { Product } from "@/types";

const OCCASIONS = [
  { id: "", label: "All" },
  { id: "JOB_INTERVIEW", label: "Job Interview" },
  { id: "GYM", label: "Gym" },
  { id: "DINNER_NIGHT", label: "Dinner Night" },
];

const CATEGORIES = [
  { id: "", label: "All" },
  { id: "TOP", label: "Tops" },
  { id: "BOTTOM", label: "Bottoms" },
  { id: "OUTERWEAR", label: "Outerwear" },
  { id: "FOOTWEAR", label: "Footwear" },
  { id: "ACCESSORY", label: "Accessories" },
];

const STYLE_TAGS = ["Minimalist", "Bold", "Monochrome", "Earth Tones", "Structured", "Relaxed Fit"];

const GENDER_OPTIONS = [
  { id: "", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
];

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[9px] uppercase tracking-[0.14em] border transition-all duration-400 ${
        active
          ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,169,122,0.04)]"
          : "border-[var(--glass-border)] text-[var(--silver-400)] hover:border-[var(--silver-400)] hover:text-[var(--silver-200)]"
      }`}
      style={{ borderRadius: "1px" }}
    >
      {children}
    </button>
  );
}

function QuizBanner({ shape, prefs, onClear }: { shape: string; prefs: string[]; onClear: () => void }) {
  if (!shape && prefs.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border-[var(--gold)] p-4 mb-8 flex items-center justify-between flex-wrap gap-3"
      style={{ borderRadius: "2px" }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--gold)]">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">AI-curated for you</span>
        </div>
        {shape && (
          <span className="glass text-[9px] text-[var(--silver-300)] px-2.5 py-1" style={{ borderRadius: "1px" }}>
            {shape.charAt(0).toUpperCase() + shape.slice(1).replace(/([A-Z])/g, " $1")} shape
          </span>
        )}
        {prefs.map((p) => (
          <span key={p} className="glass text-[9px] text-[var(--silver-300)] px-2.5 py-1" style={{ borderRadius: "1px" }}>
            {p}
          </span>
        ))}
      </div>
      <button
        onClick={onClear}
        className="text-[9px] uppercase tracking-[0.14em] text-[var(--silver-500)] hover:text-[var(--silver-300)] transition-colors flex items-center gap-1.5"
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        Clear
      </button>
    </motion.div>
  );
}

function ShopInner() {
  const searchParams = useSearchParams();
  const urlOccasion  = searchParams.get("occasion") ?? "";
  const urlShape     = searchParams.get("shape") ?? "";
  const urlPrefs     = searchParams.get("prefs") ?? "";

  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [occasion, setOccasion]   = useState(urlOccasion);
  const [category, setCategory]   = useState("");
  const [bodyShape, setBodyShape] = useState(urlShape);
  const [activePrefs, setActivePrefs] = useState<string[]>(
    urlPrefs ? decodeURIComponent(urlPrefs).split(",").filter(Boolean) : []
  );
  const [gender, setGender] = useState("");  // "" | "men" | "women"

  const fromQuiz = !!(urlShape || urlPrefs);

  function togglePref(pref: string) {
    setActivePrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  }

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (occasion)           params.set("occasion", occasion);
    if (category)           params.set("category", category);
    if (bodyShape)          params.set("shape", bodyShape);
    if (activePrefs.length) params.set("prefs", activePrefs.join(","));
    if (gender)             params.set("gender", gender);

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((d) => { setProducts(d.products ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [occasion, category, bodyShape, activePrefs, gender]);

  return (
    <>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />

      {fromQuiz && (
        <QuizBanner
          shape={bodyShape}
          prefs={activePrefs}
          onClear={() => { setBodyShape(""); setActivePrefs([]); }}
        />
      )}

      {/* Filters */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--silver-500)] w-20 flex-shrink-0">Occasion</span>
          {OCCASIONS.map((o) => (
            <FilterPill key={o.id} active={occasion === o.id} onClick={() => setOccasion(o.id)}>{o.label}</FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--silver-500)] w-20 flex-shrink-0">Category</span>
          {CATEGORIES.map((c) => (
            <FilterPill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>{c.label}</FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--silver-500)] w-20 flex-shrink-0">Style</span>
          {STYLE_TAGS.map((tag) => (
            <FilterPill key={tag} active={activePrefs.includes(tag)} onClick={() => togglePref(tag)}>{tag}</FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--silver-500)] w-20 flex-shrink-0">Gender</span>
          {GENDER_OPTIONS.map((g) => (
            <FilterPill key={g.id} active={gender === g.id} onClick={() => setGender(g.id)}>{g.label}</FilterPill>
          ))}
        </div>
      </div>

      <div className="divider mb-8" />

      <motion.p
        key={products.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[9px] uppercase tracking-[0.18em] text-[var(--silver-500)] mb-8"
      >
        {loading ? "Curating..." : `${products.length} piece${products.length !== 1 ? "s" : ""}`}
      </motion.p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] bg-[var(--bg-tertiary)] animate-pulse" />
              <div className="h-2.5 bg-[var(--bg-tertiary)] animate-pulse w-2/3" />
              <div className="h-2.5 bg-[var(--bg-tertiary)] animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 glass"
          style={{ borderRadius: "2px" }}
        >
          <p className="font-serif text-xl text-[var(--silver-400)] mb-2">No pieces found</p>
          <p className="text-xs text-[var(--silver-500)] font-light mb-6">Try adjusting your filters.</p>
          <button
            onClick={() => { setOccasion(""); setCategory(""); setBodyShape(""); setActivePrefs([]); setGender(""); }}
            className="btn-luxury text-[9px]"
          >
            Show All Pieces
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} onQuickView={setQuickView} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">The Collection</span>
          </div>
          <h1 className="font-serif text-[clamp(2rem,3.5vw,3rem)] text-[var(--silver-100)]">Curated Luxury</h1>
        </motion.div>
        <Suspense fallback={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-[var(--bg-tertiary)] animate-pulse" />
                <div className="h-2.5 bg-[var(--bg-tertiary)] animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        }>
          <ShopInner />
        </Suspense>
      </div>
    </div>
  );
}
