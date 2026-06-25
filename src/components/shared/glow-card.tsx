"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/shared/border-beam";
import { springClean } from "@/lib/motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  beam?: boolean;
}

export function GlowCard({ children, className, delay = 0, beam = false }: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-accent/25 hover:shadow-[0_8px_40px_-16px_var(--glow)]",
        className
      )}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...springClean, delay }}
      whileHover={{ y: -2 }}
      data-cursor="pointer"
    >
      {beam && <BorderBeam />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
