"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, springClean } from "@/lib/motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const words = title.split(" ");

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.div
        className="mb-4 flex items-center gap-3"
        style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      >
        <motion.span
          className="h-px w-10 bg-gradient-to-r from-accent to-accent/0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          style={{ originX: 0 }}
        />
        <p className="text-xs font-medium tracking-[0.25em] text-accent uppercase">
          {label}
        </p>
      </motion.div>

      <h2 className="font-display text-3xl font-normal tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="mr-[0.2em] inline-block"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springClean, delay: 0.05 + i * 0.04 }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {description && (
        <motion.p
          className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
