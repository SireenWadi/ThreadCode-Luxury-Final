"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[900px] mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Selection</span>
          </div>
          <div className="flex items-end justify-between">
            <h1 className="font-serif text-[clamp(2rem,3.5vw,3rem)] text-[var(--silver-100)]">
              Your Cart
            </h1>
            {totalItems > 0 && (
              <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--silver-500)]">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 glass"
              style={{ borderRadius: "2px" }}
            >
              <div className="w-14 h-14 border border-[var(--glass-border)] flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[var(--silver-500)]">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="font-serif text-xl text-[var(--silver-400)] mb-2">Your cart is empty.</p>
              <p className="text-xs text-[var(--silver-500)] font-light mb-8">
                Explore the collection or use the Stylist to build your look.
              </p>
              <div className="flex items-center gap-3 justify-center">
                <Link href="/shop" className="btn-primary text-[10px]">Browse the Collection</Link>
                <Link href="/stylist" className="btn-luxury text-[10px]">Open Stylist</Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Items list */}
              <div className="space-y-3 mb-8">
                <AnimatePresence initial={false}>
                  {items
                    .slice()
                    .sort((a, b) => b.addedAt - a.addedAt)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -32, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="glass glass-hover flex items-center gap-5 p-4"
                        style={{ borderRadius: "2px" }}
                      >
                        {/* Image */}
                        <div
                          className="w-16 h-20 bg-cover bg-center bg-[var(--bg-tertiary)] flex-shrink-0"
                          style={{ backgroundImage: `url('${item.imageUrl}')` }}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--silver-500)] mb-0.5">{item.brand}</p>
                          <p className="text-sm text-[var(--silver-100)] font-light leading-snug mb-1">{item.name}</p>
                          <p className="text-[9px] text-[var(--silver-500)] uppercase tracking-[0.12em]">
                            {item.category} · {item.occasion.replace(/_/g, " ")}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 border border-[var(--glass-border)] flex items-center justify-center text-[var(--silver-400)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm text-[var(--silver-200)] w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-[var(--glass-border)] flex items-center justify-center text-[var(--silver-400)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0 min-w-[80px]">
                          <p className="text-base text-[var(--gold)] font-light">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[9px] text-[var(--silver-500)]">
                              ${item.price.toLocaleString()} each
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-[var(--silver-500)] hover:text-[var(--silver-200)] border border-transparent hover:border-[var(--glass-border)] transition-all duration-300 flex-shrink-0"
                          style={{ borderRadius: "1px" }}
                          aria-label="Remove item"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="glass p-6" style={{ borderRadius: "2px" }}>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[var(--silver-400)] font-light uppercase tracking-[0.14em]">Subtotal</p>
                    <p className="text-sm text-[var(--silver-200)]">${totalPrice.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[var(--silver-400)] font-light uppercase tracking-[0.14em]">Shipping</p>
                    <p className="text-xs text-[var(--silver-500)]">Calculated at checkout</p>
                  </div>
                </div>
                <div className="divider-gold mb-5" />
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm uppercase tracking-[0.14em] text-[var(--silver-200)]">Total</p>
                  <p className="font-serif text-2xl text-[var(--gold)]">${totalPrice.toLocaleString()}</p>
                </div>
                <Link href="/checkout" className="btn-primary w-full justify-center text-[10px]">
                  Proceed to Checkout
                </Link>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href="/shop"
                    className="text-[9px] uppercase tracking-[0.14em] text-[var(--silver-500)] hover:text-[var(--silver-300)] transition-colors duration-300"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-[9px] uppercase tracking-[0.14em] text-[var(--silver-500)] hover:text-[var(--silver-300)] transition-colors duration-300"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
