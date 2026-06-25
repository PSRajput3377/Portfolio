"use client";

import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data/experience";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowCard } from "@/components/shared/glow-card";
import { Section } from "@/components/shared/section";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Badge } from "@/components/ui/badge";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Experience() {
  return (
    <Section id="experience" variant="muted" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />

      <div className="relative">
        <ScrollReveal>
          <SectionHeader
            label="Experience"
            title="Where I've made impact"
            description="Building intelligent systems and customer-facing products at scale."
          />
        </ScrollReveal>

        <div className="relative mt-16">
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-8"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            style={{ originY: 0 }}
          />

          {experiences.map((exp, expIndex) => (
            <ScrollReveal key={exp.id} delay={expIndex * 0.15}>
              <div className="relative pb-16 last:pb-0">
                <motion.div
                  className="absolute left-6 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background shadow-[0_0_12px_var(--glow)] md:left-8"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  <Briefcase className="h-2.5 w-2.5 text-accent" />
                </motion.div>

                <div className="ml-14 md:ml-20">
                  <GlowCard className="p-6 sm:p-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                      <p className="mt-1 text-gradient-accent font-medium">{exp.company}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {exp.period} · {exp.location}
                      </p>
                    </div>

                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {exp.achievements.map((achievement) => (
                        <div
                          key={achievement.label}
                          className="rounded-lg border border-border bg-muted/40 p-4 text-center transition-colors hover:border-accent/20"
                        >
                          <p className="text-2xl font-bold text-foreground">
                            <AnimatedCounter
                              value={achievement.value}
                              suffix={achievement.suffix}
                            />
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {achievement.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <Badge key={tech} variant="accent">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </GlowCard>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
