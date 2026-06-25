"use client";

import { motion } from "framer-motion";
import { Brain, Lightbulb, Target, Zap } from "lucide-react";
import { timeline, education } from "@/lib/data/experience";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowCard } from "@/components/shared/glow-card";
import { Section } from "@/components/shared/section";
import { EASE_OUT_EXPO } from "@/lib/motion";

const pillars = [
  {
    icon: Brain,
    title: "Passion for AI",
    description:
      "Fascinated by how intelligent systems augment human capability — from LLM agents to workflow automation at DevRev.",
  },
  {
    icon: Target,
    title: "Product Mindset",
    description:
      "Every line of code serves a user. I build with impact metrics — 40% backend efficiency gains, 1000+ users served.",
  },
  {
    icon: Zap,
    title: "Problem Solver",
    description:
      "I decompose complex challenges into elegant solutions — from placement portals at scale to AI-powered Snap-ins.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learner",
    description:
      "300+ DSA problems solved. Always exploring new frameworks, AI techniques, and engineering patterns.",
  },
];

export function About() {
  return (
    <Section id="about" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="relative">
        <ScrollReveal>
          <SectionHeader
            label="About"
            title="Engineering with purpose"
            description="I don't just write code — I build products that solve real problems and create measurable impact."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <GlowCard key={pillar.title} delay={i * 0.08} className="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/10 text-accent transition-transform duration-300 group-hover:scale-110">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-24">
          <ScrollReveal>
            <h3 className="font-display text-2xl font-normal tracking-tight sm:text-3xl">
              My Journey
            </h3>
          </ScrollReveal>
          <div className="relative mt-12">
            <motion.div
              className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-border to-transparent sm:left-1/2 sm:-translate-x-px"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
              style={{ originY: 0 }}
            />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <ScrollReveal key={`${item.year}-${item.title}`} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                  <div
                    className={`relative flex flex-col gap-4 sm:flex-row sm:gap-8 ${
                      i % 2 === 0 ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="hidden sm:block sm:flex-1" />
                    <motion.div
                      className="absolute left-0 flex h-10 w-10 items-center justify-center sm:left-1/2 sm:-translate-x-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
                    >
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-background shadow-[0_0_12px_var(--glow)] ring-4 ring-background" />
                    </motion.div>
                    <div className="flex-1 pl-12 sm:pl-0">
                      <GlowCard className="p-6">
                        <span className="text-sm font-medium text-accent">{item.year}</span>
                        <h4 className="mt-1 font-semibold text-foreground">{item.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </GlowCard>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-4">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.degree} delay={i * 0.1}>
              <GlowCard className="bg-gradient-to-r from-accent/5 via-card to-card p-6 sm:p-8">
                <p className="text-sm font-medium text-accent">Education</p>
                <h3 className="mt-1 text-lg font-semibold">{edu.degree}</h3>
                <p className="text-muted-foreground">{edu.university}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {edu.period} · {edu.detail}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
