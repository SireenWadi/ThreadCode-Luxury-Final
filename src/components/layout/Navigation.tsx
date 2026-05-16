"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCartFly } from "@/context/CartFlyContext";

const navLinks = [
  { label: "Occasions", href: "/#occasions" },
  { label: "Shop",      href: "/shop" },
  { label: "Stylist",   href: "/stylist" },
  { label: "Quiz",      href: "/quiz" },
  { label: "Compare",   href: "/compare" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { cartIconRef } = useCartFly();
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 600);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[rgba(10,10,10,0.94)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,122,0.4) 30%,rgba(201,169,122,0.2) 70%,transparent)" }}
        />

        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex flex-col gap-0.5 group">
            <motion.div whileHover={{ x: 1 }} transition={{ duration: 0.3 }}>
              <span className="font-serif text-xl text-[var(--silver-100)] tracking-[-0.02em] leading-none">
                Thread<span className="gold-text">Code</span>
              </span>
              <span className="block text-[8px] uppercase tracking-[0.22em] text-[var(--silver-600)] font-light mt-0.5">
                AI — Luxury Styling
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="relative text-[10px] uppercase tracking-[0.14em] font-medium text-[var(--silver-500)] hover:text-[var(--gold-light)] transition-colors duration-500 link-underline">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/auth"
              className="text-[10px] uppercase tracking-[0.14em] text-[var(--silver-500)] hover:text-[var(--gold-light)] transition-colors duration-500 flex items-center gap-1.5 group">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60 group-hover:opacity-100 transition-opacity">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Sign In
            </Link>

            <button ref={cartIconRef} onClick={toggleCart} className="relative group" aria-label="Open cart" id="cart-icon-btn">
              <motion.div animate={cartBump ? { scale: [1,1.3,1], rotate: [0,-12,12,0] } : { scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-[var(--silver-400)] group-hover:text-[var(--gold-light)] transition-colors duration-500">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </motion.div>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div key="badge"
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 24 }}
                    className={`absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--gold)] flex items-center justify-center ${cartBump ? "cart-pulse" : ""}`}
                    style={{ borderRadius: "50%" }}>
                    <span className="text-[8px] font-semibold text-[var(--bg-primary)] leading-none">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <Link href="/quiz" className="btn-luxury text-[10px] px-5 py-2.5">Begin Styling</Link>
          </div>

          <button className="md:hidden text-[var(--silver-400)] hover:text-[var(--gold-light)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 md:hidden"
            style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(24px)" }}>
            <div className="absolute inset-0 bg-mesh-gold pointer-events-none opacity-60"/>
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16,1,0.3,1] }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl text-[var(--silver-200)] hover:text-[var(--gold-light)] transition-colors duration-500">
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="flex flex-col items-center gap-3 mt-4">
              <Link href="/auth" onClick={() => setMenuOpen(false)} className="btn-luxury text-sm">Sign In</Link>
              <button onClick={() => { setMenuOpen(false); toggleCart(); }}
                className="text-sm text-[var(--silver-400)] hover:text-[var(--gold-light)] transition-colors">
                Cart {totalItems > 0 && <span className="text-[var(--gold)]">({totalItems})</span>}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
