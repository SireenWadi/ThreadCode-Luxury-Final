"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=4")
      .then((r) => r.json())
      .then((data) => { setProducts(data.products ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-luxury relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px divider-gold opacity-40 pointer-events-none"/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(201,169,122,0.04) 0%, transparent 70%)" }}/>

      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <div className="section-label"><span>Featured Pieces</span></div>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-[var(--silver-100)]">
              Objects of distinction
            </h2>
          </div>
          <Link href="/shop"
            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[var(--silver-400)] hover:text-[var(--gold-light)] transition-colors duration-500 link-underline">
            View All
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }} className="space-y-3">
                  <div className="aspect-[3/4] skeleton"/>
                  <div className="h-2.5 skeleton w-1/3"/>
                  <div className="h-3 skeleton w-3/4"/>
                  <div className="h-2.5 skeleton w-1/2"/>
                </motion.div>
              ))
            : products.map((product, i) => (
                <motion.div key={product.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                  <ProductCard product={product} />
                </motion.div>
              ))
          }
        </div>

        {!loading && products.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-[var(--silver-400)] text-sm font-light">
              Connect your database to load curated pieces.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
