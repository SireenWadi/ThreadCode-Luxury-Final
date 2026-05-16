"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlyItem {
  id: string;
  startX: number;
  startY: number;
  imageUrl?: string;
  label?: string;
}

interface CartFlyContextValue {
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
  triggerFly: (items: { imageUrl?: string; label?: string; sourceEl?: HTMLElement }[]) => void;
}

const CartFlyContext = createContext<CartFlyContextValue | null>(null);

export function CartFlyProvider({ children }: { children: ReactNode }) {
  const cartIconRef = useRef<HTMLButtonElement | null>(null);
  const [flyItems, setFlyItems] = useState<FlyItem[]>([]);

  const triggerFly = useCallback(
    (items: { imageUrl?: string; label?: string; sourceEl?: HTMLElement }[]) => {
      if (!cartIconRef.current) return;
      const cartRect = cartIconRef.current.getBoundingClientRect();
      const cartCenter = {
        x: cartRect.left + cartRect.width / 2,
        y: cartRect.top + cartRect.height / 2,
      };

      const newItems: FlyItem[] = items.map((item, i) => {
        let startX = window.innerWidth / 2;
        let startY = window.innerHeight / 2;
        if (item.sourceEl) {
          const r = item.sourceEl.getBoundingClientRect();
          startX = r.left + r.width / 2;
          startY = r.top + r.height / 2;
        }
        return {
          id: `fly-${Date.now()}-${i}`,
          startX,
          startY,
          imageUrl: item.imageUrl,
          label: item.label,
        };
      });

      setFlyItems((prev) => [...prev, ...newItems]);

      // Clear after animations complete
      setTimeout(() => {
        setFlyItems((prev) =>
          prev.filter((fi) => !newItems.find((ni) => ni.id === fi.id))
        );
      }, 1200 + items.length * 120);
    },
    []
  );

  const cartRect = cartIconRef.current?.getBoundingClientRect();
  const cartX = cartRect ? cartRect.left + cartRect.width / 2 : 0;
  const cartY = cartRect ? cartRect.top + cartRect.height / 2 : 0;

  return (
    <CartFlyContext.Provider value={{ cartIconRef, triggerFly }}>
      {children}

      {/* Fly particles rendered at root level */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <AnimatePresence>
          {flyItems.map((item, idx) => (
            <FlyParticle
              key={item.id}
              item={item}
              cartX={cartX}
              cartY={cartY}
              delay={idx * 80}
            />
          ))}
        </AnimatePresence>
      </div>
    </CartFlyContext.Provider>
  );
}

function FlyParticle({
  item,
  cartX,
  cartY,
  delay,
}: {
  item: FlyItem;
  cartX: number;
  cartY: number;
  delay: number;
}) {
  // Arc trajectory: go up then curve to cart
  const midX = (item.startX + cartX) / 2 + (Math.random() - 0.5) * 100;
  const midY = Math.min(item.startY, cartY) - 120 - Math.random() * 80;

  return (
    <motion.div
      initial={{
        x: item.startX - 28,
        y: item.startY - 28,
        scale: 1,
        opacity: 0.9,
        filter: "blur(0px)",
        rotate: 0,
      }}
      animate={{
        x: [
          item.startX - 28,
          midX - 28,
          cartX - 16,
        ],
        y: [
          item.startY - 28,
          midY - 28,
          cartY - 16,
        ],
        scale: [1, 0.85, 0.3],
        opacity: [0.9, 1, 0],
        filter: ["blur(0px)", "blur(1px)", "blur(3px)"],
        rotate: [0, Math.random() * 30 - 15, 0],
      }}
      transition={{
        duration: 0.85,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.45, 1],
      }}
      style={{ position: "fixed", top: 0, left: 0, width: 56, height: 56 }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "2px",
          overflow: "hidden",
          background: "rgba(18,18,18,0.9)",
          border: "1px solid rgba(201,169,122,0.4)",
          boxShadow: "0 8px 32px rgba(201,169,122,0.3), 0 0 0 1px rgba(201,169,122,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.label ?? ""}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              mixBlendMode: "screen",
            }}
          />
        ) : (
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "radial-gradient(circle, #d4b896, #c9a97a)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function useCartFly() {
  const ctx = useContext(CartFlyContext);
  if (!ctx) throw new Error("useCartFly must be used within CartFlyProvider");
  return ctx;
}
