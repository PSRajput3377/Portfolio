"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/data/skills";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowCard } from "@/components/shared/glow-card";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = skillCategories[activeCategory];

  return (
    <Section id="skills">
      <div className="pointer-events-none absolute inset-0 bg-dot opacity-20" />
      <div className="relative">
        <ScrollReveal>
          <SectionHeader
            label="Skills"
            title="Technical expertise"
            description="A full-stack toolkit spanning frontend, backend, cloud, and applied AI."
          />
        </ScrollReveal>

        <div className="relative mt-12 flex flex-wrap justify-center gap-2 rounded-xl border border-border bg-card/50 p-2 backdrop-blur-sm">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={cn(
                "relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                activeCategory === i
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeCategory === i && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-lg bg-accent shadow-lg shadow-accent/25"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        <ScrollReveal scale>
          <GlowCard className="mt-8 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              >
                <h3 className="mb-8 text-center text-lg font-semibold">{category.name}</h3>
                <div className="space-y-7">
                  {category.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="mb-2.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="tabular-nums text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 0.9,
                            delay: i * 0.08,
                            ease: EASE_OUT_EXPO,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </GlowCard>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skillCategories.map((cat, i) => (
            <GlowCard key={cat.name} delay={i * 0.05} className="p-4 text-center">
              <p className="font-display text-3xl text-gradient-accent">{cat.skills.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">{cat.name}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
