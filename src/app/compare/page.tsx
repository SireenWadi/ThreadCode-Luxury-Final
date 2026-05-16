"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types";

const OCCASIONS = [
  { id: "JOB_INTERVIEW", label: "Job Interview" },
  { id: "GYM", label: "Gym" },
  { id: "DINNER_NIGHT", label: "Dinner Night" },
];

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [left, setLeft] = useState<Product | null>(null);
  const [right, setRight] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const compareFields: { label: string; key: keyof Product }[] = [
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Occasion", key: "occasion" },
    { label: "Price", key: "price" },
    { label: "In Stock", key: "inStock" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
              Side by Side
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2rem,3.5vw,3rem)] text-[var(--silver-100)]">
            Compare Pieces
          </h1>
          <p className="text-sm text-[var(--silver-400)] font-light mt-2">
            Select two items to compare their attributes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            { selected: left, onSelect: setLeft, label: "Piece A" },
            { selected: right, onSelect: setRight, label: "Piece B" },
          ].map(({ selected, onSelect, label }) => (
            <div key={label}>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-500)] mb-3">
                {label}
              </p>
              <select
                className="w-full glass bg-transparent text-[var(--silver-200)] text-xs p-4 mb-4 focus:outline-none focus:border-[var(--gold)] transition-colors duration-400"
                style={{ borderRadius: "1px", border: "1px solid var(--glass-border)" }}
                value={selected?.id ?? ""}
                onChange={(e) => {
                  const p = products.find((pr) => pr.id === Number(e.target.value));
                  onSelect(p ?? null);
                }}
              >
                <option value="" className="bg-[var(--bg-secondary)]">Select a piece...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[var(--bg-secondary)]">
                    {p.brand} — {p.name}
                  </option>
                ))}
              </select>

              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="glass"
                  style={{ borderRadius: "2px" }}
                >
                  <div
                    className="aspect-[4/3] bg-cover bg-center bg-[var(--bg-tertiary)]"
                    style={{ backgroundImage: `url('${selected.imageUrl}')` }}
                  />
                  <div className="p-5">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--silver-500)]">
                      {selected.brand}
                    </p>
                    <h3 className="font-serif text-lg text-[var(--silver-100)] mt-1 mb-3">
                      {selected.name}
                    </h3>
                    <p className="text-xs text-[var(--silver-400)] font-light leading-relaxed">
                      {selected.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {left && right && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass"
            style={{ borderRadius: "2px" }}
          >
            <div className="divider-gold" />
            {compareFields.map((field, i) => (
              <div
                key={field.key}
                className={`grid grid-cols-3 gap-4 px-6 py-4 items-center ${
                  i < compareFields.length - 1 ? "border-b border-[var(--glass-border)]" : ""
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--silver-500)]">
                  {field.label}
                </p>
                <p className="text-xs text-[var(--silver-200)] font-light">
                  {field.key === "price"
                    ? `$${Number(left[field.key]).toLocaleString()}`
                    : field.key === "inStock"
                    ? left[field.key] ? "Available" : "Out of Stock"
                    : String(left[field.key]).replace(/_/g, " ")}
                </p>
                <p className="text-xs text-[var(--silver-200)] font-light">
                  {field.key === "price"
                    ? `$${Number(right[field.key]).toLocaleString()}`
                    : field.key === "inStock"
                    ? right[field.key] ? "Available" : "Out of Stock"
                    : String(right[field.key]).replace(/_/g, " ")}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
