"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/types";

// ── Cart Item ─────────────────────────────────────────────────────────────────
export interface CartItem extends Product {
  quantity: number;
  addedAt: number; // timestamp for ordering
}

// ── Context Shape ─────────────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  addItem: (product: Product) => void;
  addItems: (products: Product[]) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isInCart: (id: number) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "threadcode_cart_v1";

// ── Provider ──────────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // localStorage unavailable — proceed with empty cart
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Quota exceeded or private mode — silent fail
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1, addedAt: Date.now() }];
    });
    setIsOpen(true);
  }, []);

  const addItems = useCallback((products: Product[]) => {
    setItems((prev) => {
      let next = [...prev];
      for (const product of products) {
        const existing = next.find((i) => i.id === product.id);
        if (existing) {
          next = next.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          next.push({ ...product, quantity: 1, addedAt: Date.now() });
        }
      }
      return next;
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);
  const isInCart = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isOpen,
        addItem,
        addItems,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
