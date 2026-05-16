"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCartFly } from "@/context/CartFlyContext";
import { ImageWithLabel } from "./ImageWithLabel";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { isInCart, addItem } = useCart();
  const { triggerFly } = useCartFly();
  const cardRef = useRef<HTMLDivElement>(null);
  const inCart = isInCart(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(product);
    triggerFly([{
      imageUrl: product.imageUrl,
      label: product.name,
      sourceEl: cardRef.current ?? undefined,
    }]);
  }

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onQuickView?.(product)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden aspect-[3/4] mb-4 product-card-image-wrap"
        style={{
          background: "#0e0e0e",
          border: "1px solid var(--glass-border)",
          borderRadius: "1px",
        }}
      >
        {/* Gradient glow */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%,rgba(201,169,122,0.05) 0%,transparent 70%)" }}/>

        {/* Image with filename label on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-4 z-[2]"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWithLabel
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full"
            style={{ objectFit: "contain", objectPosition: "center", mixBlendMode: "screen" }}
            draggable={false}
            labelPosition="bottom-right"
          />
        </motion.div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.6)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[3]"/>

        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 30%, rgba(201,169,122,0.04) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={hovered ? { backgroundPosition: ["0% 0%", "200% 200%"] } : {}}
          transition={{ duration: 1.2, ease: "linear" }}
        />

        {/* Quick view CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-4 bottom-4 glass flex items-center justify-between py-2.5 px-3 gap-2 z-[5]"
          style={{ borderRadius: "1px" }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--silver-300)]">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--silver-200)]">Quick View</span>
          </div>
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 px-2 py-1 transition-all duration-300"
            style={{
              fontSize: 8,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: inCart ? "var(--gold)" : "var(--silver-400)",
              border: `1px solid ${inCart ? "rgba(201,169,122,0.3)" : "rgba(255,255,255,0.08)"}`,
              background: inCart ? "rgba(201,169,122,0.06)" : "transparent",
              borderRadius: 1,
            }}
          >
            {inCart ? (
              <><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Added</>
            ) : (
              <><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg> Add</>
            )}
          </motion.button>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 glass px-2.5 py-1 z-[4]" style={{ borderRadius: "1px" }}>
          <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--silver-400)]">
            {product.category.replace("_", " ")}
          </span>
        </div>

        {/* In Cart indicator */}
        {inCart && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-5 h-5 bg-[var(--gold)] flex items-center justify-center z-[4]"
            style={{ borderRadius: "1px" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--bg-primary)]">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </motion.div>
        )}

        {/* Tech-spec tag strip */}
        {hovered && product.tags && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 bottom-[52px] glass px-3 py-2 z-[4]"
            style={{ borderRadius: 0 }}>
            <p className="text-[8px] font-mono text-[var(--gold)] uppercase tracking-[0.2em] mb-0.5">Spec</p>
            <p className="text-[8px] font-mono text-[var(--silver-500)] leading-relaxed truncate">
              {product.tags.split(",").slice(0, 5).map((t) => `#${t.trim()}`).join("  ")}
            </p>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="text-[8px] uppercase tracking-[0.2em] text-[var(--silver-500)]">{product.brand}</div>
        <h3 className="text-sm font-light text-[var(--silver-200)] group-hover:text-[var(--silver-100)] transition-colors duration-400 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-sm text-[var(--gold)] font-light">${product.price.toLocaleString()}</span>
          <span className={`text-[8px] uppercase tracking-[0.14em] transition-colors duration-400 ${
            inCart ? "text-[var(--gold)]" : "text-[var(--silver-500)] group-hover:text-[var(--gold)]"
          }`}>
            {inCart ? "In Cart" : product.occasion.replace(/_/g, " ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
