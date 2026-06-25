"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

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
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      <motion.div
        className="mb-4 flex items-center gap-3"
        style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <motion.span
          className="h-px w-8 bg-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
          style={{ originX: 0 }}
        />
        <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
          {label}
        </p>
      </motion.div>

      <h2 className="font-display text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1 + i * 0.06,
              ease: EASE_OUT_EXPO,
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {description && (
        <motion.p
          className="mt-5 text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
