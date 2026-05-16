"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
  once?: boolean;
  distance?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  distance = 30,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.08,
  className = "",
  itemClassName = "",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{
            duration: 0.9,
            delay: i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
