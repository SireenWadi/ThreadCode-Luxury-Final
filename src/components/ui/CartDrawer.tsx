"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

// ── Overlay + Drawer ──────────────────────────────────────────────────────────
export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, closeCart, removeItem, updateQuantity } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[rgba(0,0,0,0.65)] backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-[420px] flex flex-col"
            style={{
              background: "var(--bg-secondary)",
              borderLeft: "1px solid var(--glass-border)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-[var(--glass-border)]">
              <div>
                <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--gold)] mb-0.5">
                  Your Selection
                </p>
                <h2 className="font-serif text-xl text-[var(--silver-100)]">
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-2 text-sm font-sans font-light text-[var(--silver-400)]">
                      ({totalItems})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center border border-[var(--glass-border)] text-[var(--silver-400)] hover:text-[var(--silver-100)] hover:border-[var(--silver-400)] transition-all duration-300"
                style={{ borderRadius: "1px" }}
                aria-label="Close cart"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 text-center"
                  >
                    <div className="w-12 h-12 border border-[var(--glass-border)] flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[var(--silver-500)]">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                    </div>
                    <p className="font-serif text-base text-[var(--silver-400)] mb-1">Nothing here yet.</p>
                    <p className="text-xs text-[var(--silver-500)] font-light">Browse the collection to begin.</p>
                    <button onClick={closeCart} className="btn-luxury text-[9px] mt-5">
                      <Link href="/shop">View Collection</Link>
                    </button>
                  </motion.div>
                ) : (
                  items
                    .slice()
                    .sort((a, b) => b.addedAt - a.addedAt)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-4"
                      >
                        {/* Image */}
                        <div
                          className="w-[68px] h-[84px] bg-cover bg-center bg-[var(--bg-tertiary)] flex-shrink-0"
                          style={{ backgroundImage: `url('${item.imageUrl}')` }}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)] leading-none mb-1">
                            {item.brand}
                          </p>
                          <p className="text-sm text-[var(--silver-100)] font-light leading-snug mb-2">
                            {item.name}
                          </p>

                          {/* Quantity control */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 border border-[var(--glass-border)] flex items-center justify-center text-[var(--silver-400)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-xs leading-none"
                            >
                              −
                            </button>
                            <span className="text-xs text-[var(--silver-200)] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 border border-[var(--glass-border)] flex items-center justify-center text-[var(--silver-400)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-xs leading-none"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price + remove */}
                        <div className="flex flex-col items-end gap-2 pt-0.5">
                          <span className="text-sm text-[var(--gold)] font-light">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--silver-600)] hover:text-[var(--silver-300)] transition-colors duration-300"
                            aria-label="Remove"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-7 py-6 border-t border-[var(--glass-border)] space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--silver-500)]">
                    Subtotal
                  </p>
                  <p className="font-serif text-xl text-[var(--gold)]">
                    ${totalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="divider" />
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-primary w-full justify-center text-[10px]"
                >
                  Review & Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-[9px] uppercase tracking-[0.16em] text-[var(--silver-500)] hover:text-[var(--silver-300)] transition-colors duration-300 py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
