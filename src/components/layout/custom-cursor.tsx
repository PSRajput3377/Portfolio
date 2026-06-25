"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 200, damping: 26, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 200, damping: 26, mass: 0.7 });

  useEffect(() => {
    const touch = "ontouchstart" in window || matchMedia("(pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) =>
      setHovering(!!(e.target as HTMLElement).closest(INTERACTIVE));
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ring = clicking ? 24 : hovering ? 48 : 36;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden>
      <motion.div
        className="absolute rounded-full border border-foreground/20"
        style={{ left: ringX, top: ringY, x: "-50%", y: "-50%" }}
        animate={{
          width: ring,
          height: ring,
          borderColor: hovering
            ? "color-mix(in srgb, var(--accent) 80%, transparent)"
            : "color-mix(in srgb, var(--foreground) 25%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{ left: dotX, top: dotY, x: "-50%", y: "-50%" }}
        animate={{ width: clicking ? 4 : 5, height: clicking ? 4 : 5 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    </div>
  );
}
