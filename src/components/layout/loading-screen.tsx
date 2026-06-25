"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1400;

    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const timer = setTimeout(() => setIsLoading(false), duration + 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              className="font-display text-4xl tracking-tight text-foreground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              PK<span className="text-accent">.</span>
            </motion.span>
            <div className="h-px w-32 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
