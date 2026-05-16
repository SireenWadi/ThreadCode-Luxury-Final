"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function LuxuryCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 400, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 400, mass: 0.3 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on pointer-fine devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsMobile(false);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const attachHover = () => {
      document.querySelectorAll("a,button,[role='button'],input,label,select,textarea").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    attachHover();

    // Re-attach on DOM changes
    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      obs.disconnect();
    };
  }, [cursorX, cursorY, visible]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: hovering ? 1.8 : clicking ? 0.7 : 1,
            opacity: hovering ? 0.7 : clicking ? 0.5 : 0.35,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 36,
            height: 36,
            border: "1px solid rgba(201,169,122,0.6)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.5 : hovering ? 2.5 : 1,
            background: hovering
              ? "rgba(201,169,122,0.9)"
              : "rgba(201,169,122,1)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--gold)",
          }}
        />
      </motion.div>
    </>
  );
}
