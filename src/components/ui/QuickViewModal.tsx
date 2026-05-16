"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

// ── Occasion + Category Labels ────────────────────────────────────────────────
const OCC_LABEL: Record<string, string> = {
  JOB_INTERVIEW: "Job Interview",
  GYM: "Gym",
  DINNER_NIGHT: "Dinner Night",
};

const CAT_LABEL: Record<string, string> = {
  TOP: "Top",
  BOTTOM: "Bottom",
  OUTERWEAR: "Outerwear",
  FOOTWEAR: "Footwear",
  ACCESSORY: "Accessory",
};

// ── Infer fabric from tags ────────────────────────────────────────────────────
function inferFabric(tags: string, name: string): string {
  const t = (tags + " " + name).toLowerCase();
  if (t.includes("cashmere"))  return "Pure Cashmere";
  if (t.includes("merino"))    return "Merino Wool";
  if (t.includes("silk"))      return "Heavyweight Silk";
  if (t.includes("wool"))      return "Virgin Wool";
  if (t.includes("cotton"))    return "Egyptian Cotton";
  if (t.includes("leather"))   return "Full-Grain Leather";
  if (t.includes("velvet"))    return "Italian Velvet";
  if (t.includes("satin"))     return "Satin Weave";
  if (t.includes("fleece"))    return "Terry Fleece";
  if (t.includes("knit"))      return "Engineered Knit";
  if (t.includes("nylon"))     return "Merino-Nylon";
  if (t.includes("gold"))      return "18k Yellow Gold";
  if (t.includes("silver"))    return "Sterling Silver";
  if (t.includes("titanium"))  return "Grade 5 Titanium";
  if (t.includes("modal"))     return "Modal-Cotton";
  return "Premium Textile";
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function QuickViewModal({ product, onClose }: QuickViewProps) {
  const { addItem, isInCart } = useCart();
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<"main" | "detail">("main");
  const [detailZoomed, setDetailZoomed] = useState(false);
  const [detailMousePos, setDetailMousePos] = useState({ x: 50, y: 50 });
  const mainImgRef = useRef<HTMLDivElement>(null);
  const detailImgRef = useRef<HTMLDivElement>(null);

  const inCart = product ? isInCart(product.id) : false;
  const hasDetail = !!product?.detailImageUrl;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  // Reset state when product changes
  useEffect(() => {
    setAdded(false);
    setZoomed(false);
    setDetailZoomed(false);
    setActiveImage("main");
  }, [product?.id]);

  function handleMainMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!mainImgRef.current) return;
    const rect = mainImgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  function handleDetailMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!detailImgRef.current) return;
    const rect = detailImgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDetailMousePos({ x, y });
  }

  function handleAddToCart() {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const fabric = product ? inferFabric(product.tags, product.name) : "";

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="qv-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-[rgba(0,0,0,0.82)] backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="qv-modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-[920px] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--glass-border)",
                borderRadius: "2px",
                maxHeight: "92vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Left: Images ── */}
              <div className="flex flex-col">
                {/* Main image with zoom */}
                <div
                  ref={mainImgRef}
                  className="relative overflow-hidden select-none"
                  style={{
                    height: hasDetail ? "68%" : "100%",
                    minHeight: "300px",
                    cursor: activeImage === "main" ? "zoom-in" : "default",
                    flex: hasDetail ? "0 0 68%" : "1",
                    background: "#111",
                  }}
                  onMouseEnter={() => setZoomed(true)}
                  onMouseLeave={() => setZoomed(false)}
                  onMouseMove={handleMainMouseMove}
                >
                  {/* Checkerboard bg (transparent PNG indicator) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "linear-gradient(45deg, var(--bg-tertiary) 25%, transparent 25%), linear-gradient(-45deg, var(--bg-tertiary) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--bg-tertiary) 75%), linear-gradient(-45deg, transparent 75%, var(--bg-tertiary) 75%)",
                      backgroundSize: "16px 16px",
                      backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                      opacity: 0.3,
                    }}
                  />

                  {/* Main garment image */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: zoomed ? 1.6 : 1 }}
                    style={{
                      transformOrigin: zoomed
                        ? `${mousePos.x}% ${mousePos.y}%`
                        : "50% 50%",
                    }}
                    transition={{ duration: zoomed ? 0.1 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        mixBlendMode: "screen",
                      }}
                      draggable={false}
                    />
                  </motion.div>

                  {/* Category badge */}
                  <div
                    className="absolute top-4 left-4 glass px-3 py-1.5 z-10"
                    style={{ borderRadius: "1px" }}
                  >
                    <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--silver-400)]">
                      {CAT_LABEL[product.category] ?? product.category}
                    </span>
                  </div>

                  {/* Zoom hint */}
                  <AnimatePresence>
                    {!zoomed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-4 right-4 glass px-2.5 py-1.5 flex items-center gap-1.5 z-10"
                        style={{ borderRadius: "1px" }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--silver-500)]">
                          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                        </svg>
                        <span className="text-[8px] uppercase tracking-[0.14em] text-[var(--silver-500)]">
                          Hover to inspect
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Detail image with deep zoom */}
                {hasDetail && (
                  <div
                    ref={detailImgRef}
                    className="relative overflow-hidden select-none border-t border-[var(--glass-border)]"
                    style={{
                      flex: "1",
                      minHeight: "120px",
                      cursor: "zoom-in",
                      background: "var(--bg-tertiary)",
                    }}
                    onMouseEnter={() => setDetailZoomed(true)}
                    onMouseLeave={() => setDetailZoomed(false)}
                    onMouseMove={handleDetailMouseMove}
                  >
                    {/* Label */}
                    <div
                      className="absolute top-2 left-3 glass px-2 py-1 z-10"
                      style={{ borderRadius: "1px" }}
                    >
                      <span className="text-[7px] uppercase tracking-[0.2em] text-[var(--gold)]">
                        Fabric Detail
                      </span>
                    </div>

                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: detailZoomed ? 2.2 : 1 }}
                      style={{
                        transformOrigin: detailZoomed
                          ? `${detailMousePos.x}% ${detailMousePos.y}%`
                          : "50% 50%",
                      }}
                      transition={{
                        duration: detailZoomed ? 0.08 : 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <img
                        src={product.detailImageUrl}
                        alt={`${product.name} fabric detail`}
                        className="w-full h-full"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        draggable={false}
                      />
                    </motion.div>

                    {/* Microscope icon */}
                    <AnimatePresence>
                      {!detailZoomed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-2 right-3 glass px-2 py-1 flex items-center gap-1 z-10"
                          style={{ borderRadius: "1px" }}
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--silver-500)]">
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                          </svg>
                          <span className="text-[7px] uppercase tracking-[0.12em] text-[var(--silver-500)]">
                            Deep zoom
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* ── Right: Details ── */}
              <div className="flex flex-col overflow-y-auto px-8 py-8">
                {/* Close button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={onClose}
                    className="w-8 h-8 border border-[var(--glass-border)] flex items-center justify-center text-[var(--silver-500)] hover:text-[var(--silver-100)] hover:border-[var(--silver-400)] transition-all duration-300"
                    style={{ borderRadius: "1px" }}
                    aria-label="Close"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Brand + occasion */}
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--gold)]">
                    {product.brand}
                  </p>
                  <span className="w-px h-3 bg-[var(--glass-border)]" />
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--silver-500)]">
                    {OCC_LABEL[product.occasion] ?? product.occasion}
                  </p>
                </div>

                {/* Name */}
                <h2 className="font-serif text-[1.65rem] text-[var(--silver-100)] leading-[1.1] mb-5">
                  {product.name}
                </h2>

                {/* Price */}
                <p className="font-serif text-3xl text-[var(--gold)] mb-6">
                  ${product.price.toLocaleString()}
                </p>

                {/* Divider */}
                <div className="divider mb-6" />

                {/* Description */}
                <p className="text-sm text-[var(--silver-300)] font-light leading-relaxed mb-7">
                  {product.description}
                </p>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3 mb-7">
                  {[
                    { label: "Material", value: fabric },
                    { label: "Category", value: CAT_LABEL[product.category] ?? product.category },
                    { label: "Occasion", value: OCC_LABEL[product.occasion] },
                    { label: "For", value: product.gender === "unisex" ? "Men & Women" : product.gender === "men" ? "Men" : "Women" },
                    { label: "Availability", value: product.inStock ? "In Stock" : "Sold Out" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="glass px-3 py-2.5"
                      style={{ borderRadius: "1px" }}
                    >
                      <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)] mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs text-[var(--silver-200)] font-light">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Style tags */}
                {product.styleTags && (
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {product.styleTags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] uppercase tracking-[0.14em] text-[var(--gold)] border border-[rgba(201,169,122,0.2)] px-2.5 py-1"
                        style={{ borderRadius: "1px" }}
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto space-y-3">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center gap-3 py-4 text-[10px] uppercase tracking-[0.16em] font-medium transition-all duration-500 ${
                      added
                        ? "bg-[rgba(201,169,122,0.15)] border border-[var(--gold)] text-[var(--gold)]"
                        : product.inStock
                        ? "btn-primary"
                        : "opacity-40 cursor-not-allowed btn-luxury"
                    }`}
                    whileTap={{ scale: 0.99 }}
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Added to Cart
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                          </svg>
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {inCart && !added && (
                    <p className="text-center text-[8px] uppercase tracking-[0.16em] text-[var(--gold)] opacity-70">
                      Already in your cart
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
