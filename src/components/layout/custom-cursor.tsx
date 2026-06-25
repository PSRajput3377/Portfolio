"use client";

import { useEffect, useRef, useState } from "react";
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
  const angleRef = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const rotation = useMotionValue(0);

  const coreX = useSpring(mouseX, { stiffness: 700, damping: 32, mass: 0.35 });
  const coreY = useSpring(mouseY, { stiffness: 700, damping: 32, mass: 0.35 });

  const ringX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.65 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.65 });

  const glowX = useSpring(mouseX, { stiffness: 50, damping: 18, mass: 1 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 18, mass: 1 });

  const trail0X = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const trail0Y = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });
  const trail1X = useSpring(mouseX, { stiffness: 102, damping: 22, mass: 0.95 });
  const trail1Y = useSpring(mouseY, { stiffness: 102, damping: 22, mass: 0.95 });
  const trail2X = useSpring(mouseX, { stiffness: 84, damping: 24, mass: 1.1 });
  const trail2Y = useSpring(mouseY, { stiffness: 84, damping: 24, mass: 1.1 });
  const trail3X = useSpring(mouseX, { stiffness: 66, damping: 26, mass: 1.25 });
  const trail3Y = useSpring(mouseY, { stiffness: 66, damping: 26, mass: 1.25 });

  const trails = [
    { x: trail0X, y: trail0Y },
    { x: trail1X, y: trail1Y },
    { x: trail2X, y: trail2Y },
    { x: trail3X, y: trail3Y },
  ];

  useEffect(() => {
    const isTouch = "ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    let lastX = 0;
    let lastY = 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const next = Math.atan2(dy, dx) * (180 / Math.PI);
        angleRef.current = next;
        rotation.set(next);
      }
      lastX = e.clientX;
      lastY = e.clientY;
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
  }, [mouseX, mouseY, rotation]);

  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => setRipples((prev) => prev.slice(1)), 650);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!enabled) return null;

  const ringSize = isClicking ? 34 : isHovering ? 62 : 46;
  const bracketSize = isHovering ? 18 : 12;
  const bracketOffset = ringSize / 2 + 4;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full blur-[90px]"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent) 0%, color-mix(in srgb, var(--accent-secondary) 35%, transparent) 40%, transparent 70%)",
        }}
        animate={{
          width: isHovering ? 280 : 220,
          height: isHovering ? 280 : 220,
          opacity: isHovering ? 0.22 : 0.14,
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Particle trail */}
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent"
          style={{
            left: trail.x,
            top: trail.y,
            x: "-50%",
            y: "-50%",
            width: 3 - i * 0.4,
            height: 3 - i * 0.4,
            opacity: 0.35 - i * 0.07,
          }}
        />
      ))}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-accent/50"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 8, height: 8, x: "-50%", y: "-50%", opacity: 0.7 }}
            animate={{ width: 96, height: 96, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>

      {/* Outer orbital ring */}
      <motion.div
        className="absolute"
        style={{ left: ringX, top: ringY, x: "-50%", y: "-50%", rotate: rotation }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, var(--accent), var(--accent-secondary), transparent 55%, var(--accent))",
            padding: 2,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: isHovering ? 2.5 : 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-full w-full rounded-full bg-background/80 backdrop-blur-[1px]" />
        </motion.div>

        {/* Orbiting satellite */}
        <motion.div
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
          animate={{ scale: isHovering ? 1.2 : 1 }}
        />
      </motion.div>

      {/* Viewfinder brackets */}
      <motion.div
        className="absolute"
        style={{ left: ringX, top: ringY, x: "-50%", y: "-50%" }}
        animate={{ width: ringSize + 16, height: ringSize + 16 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {[
          { className: "left-0 top-0 border-l-2 border-t-2", x: -bracketOffset, y: -bracketOffset },
          { className: "right-0 top-0 border-r-2 border-t-2", x: bracketOffset, y: -bracketOffset },
          { className: "left-0 bottom-0 border-b-2 border-l-2", x: -bracketOffset, y: bracketOffset },
          { className: "right-0 bottom-0 border-b-2 border-r-2", x: bracketOffset, y: bracketOffset },
        ].map((corner, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-sm border-accent ${corner.className}`}
            animate={{
              width: bracketSize,
              height: bracketSize,
              opacity: isHovering ? 1 : 0.55,
              x: isHovering ? corner.x * 0.15 : 0,
              y: isHovering ? corner.y * 0.15 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
          />
        ))}
      </motion.div>

      {/* Core diamond */}
      <motion.div
        className="absolute"
        style={{
          left: coreX,
          top: coreY,
          x: "-50%",
          y: "-50%",
          rotate: rotation,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            width: isClicking ? 7 : isHovering ? 11 : 9,
            height: isClicking ? 7 : isHovering ? 11 : 9,
            rotate: 45,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div className="absolute inset-0 rounded-[2px] bg-gradient-to-br from-accent to-accent-secondary shadow-[0_0_16px_var(--accent)]" />
          <div className="absolute inset-[2px] rounded-[1px] bg-background/90" />
        </motion.div>
      </motion.div>

      {/* Hover crosshair */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute"
            style={{ left: ringX, top: ringY, x: "-50%", y: "-50%" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="absolute block h-px w-7 bg-gradient-to-r from-transparent via-accent to-transparent"
              style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
            />
            <motion.span
              className="absolute block h-7 w-px bg-gradient-to-b from-transparent via-accent to-transparent"
              style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
