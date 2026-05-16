"use client";

/**
 * ImageLabel — automatically displays the filename of any image used in the project.
 * Wrap any <img> usage with this to see the filename in the corner.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageWithLabelProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
  labelPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  draggable?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/** Extracts just the filename from a full path or URL */
function extractFilename(src: string): string {
  if (!src) return "";
  // Remove query params
  const clean = src.split("?")[0];
  // Get last segment
  const parts = clean.split("/");
  return parts[parts.length - 1] || src;
}

export function ImageWithLabel({
  src,
  alt,
  className,
  style,
  showLabel = true,
  labelPosition = "bottom-right",
  draggable = false,
  onMouseEnter,
  onMouseLeave,
}: ImageWithLabelProps) {
  const [hovered, setHovered] = useState(false);
  const filename = extractFilename(src);

  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onMouseLeave?.();
      }}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        draggable={draggable}
      />

      {showLabel && filename && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute ${positionClasses[labelPosition]} z-10 pointer-events-none`}
            >
              <div
                style={{
                  background: "rgba(8,8,8,0.88)",
                  border: "1px solid rgba(201,169,122,0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "3px 7px",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  maxWidth: 160,
                }}
              >
                {/* File icon */}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(201,169,122,0.6)"
                  strokeWidth="2"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.06em",
                    color: "rgba(201,169,122,0.8)",
                    fontFamily: "'Courier New', monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filename}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/**
 * Standalone filename badge — use anywhere you want to display an image's filename
 */
export function ImageFilename({ src, className }: { src: string; className?: string }) {
  const filename = extractFilename(src);
  if (!filename) return null;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 6px",
        background: "rgba(201,169,122,0.06)",
        border: "1px solid rgba(201,169,122,0.15)",
        borderRadius: 1,
      }}
    >
      <svg
        width="8"
        height="8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(201,169,122,0.5)"
        strokeWidth="2"
      >
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
      <span
        style={{
          fontSize: 8,
          letterSpacing: "0.06em",
          color: "rgba(201,169,122,0.7)",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {filename}
      </span>
    </div>
  );
}
