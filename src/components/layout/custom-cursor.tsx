"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="pointer"]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.5 });

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.8 });

  const trailX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 1.2 });
  const trailY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 1.2 });

  const glowX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const isTouch = "ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest(INTERACTIVE_SELECTOR));
    };

    const onDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = Date.now();
      setRipples((prev) => [...prev.slice(-2), { id, x: e.clientX, y: e.clientY }]);
    };

    const onUp = () => setIsClicking(false);
    const onLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!enabled) return null;

  const ringSize = isClicking ? 28 : isHovering ? 56 : 40;
  const dotSize = isClicking ? 4 : isHovering ? 6 : 5;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block" aria-hidden="true">
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full opacity-[0.09] blur-[100px] dark:opacity-[0.14]"
        style={{
          left: glowX,
          top: glowY,
          width: isHovering ? 420 : 360,
          height: isHovering ? 420 : 360,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, var(--accent) 0%, var(--accent-secondary) 45%, transparent 70%)",
        }}
        animate={{ scale: isHovering ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border border-accent/20 bg-accent/5"
        style={{
          left: trailX,
          top: trailY,
          width: 20,
          height: 20,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border border-accent/40"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: "-50%", y: "-50%", opacity: 0.6 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          borderColor: isHovering
            ? "var(--accent)"
            : "color-mix(in srgb, var(--foreground) 35%, transparent)",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
        style={{
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: isHovering ? "var(--accent-secondary)" : "var(--accent)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Hover crosshair lines */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.div
              className="absolute h-px bg-accent/30"
              style={{ left: ringX, top: ringY, width: 24, x: "-50%", y: "-50%" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="absolute w-px bg-accent/30"
              style={{ left: ringX, top: ringY, height: 24, x: "-50%", y: "-50%" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
