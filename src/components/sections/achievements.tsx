"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  GitBranch,
  Rocket,
  BookOpen,
  Code,
  Sparkles,
} from "lucide-react";
import { achievements } from "@/lib/data/achievements";
import { LEETCODE_USERNAME, SITE_CONFIG } from "@/lib/constants";
import type { LeetCodeStats } from "@/types";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowCard } from "@/components/shared/glow-card";
import { Section } from "@/components/shared/section";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const iconComponents = {
  trophy: Trophy,
  "git-branch": GitBranch,
  rocket: Rocket,
  "book-open": BookOpen,
  code: Code,
  sparkles: Sparkles,
};

const fallbackLeetCode: LeetCodeStats = {
  totalSolved: 300,
  easySolved: 110,
  mediumSolved: 155,
  hardSolved: 35,
  ranking: 150000,
  acceptanceRate: "68%",
};

export function Achievements() {
  const [leetcode, setLeetcode] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    fetch(`/api/leetcode?username=${LEETCODE_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setLeetcode(data);
      })
      .catch(() => {});
  }, []);

  const lc = leetcode || fallbackLeetCode;

  return (
    <Section id="achievements" variant="muted">
      <ScrollReveal>
        <SectionHeader
          label="Achievements"
          title="Milestones & metrics"
          description="Consistent growth across competitive programming, hackathons, and engineering."
        />
      </ScrollReveal>

      <ScrollReveal>
        <GlowCard className="mt-12 p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold">Coding Profiles</h3>
            <div className="flex gap-2">
              <a
                href={SITE_CONFIG.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-accent transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                LeetCode
              </a>
              <a
                href={SITE_CONFIG.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-accent transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                CodeChef
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Total Solved", value: lc.totalSolved },
              { label: "Easy", value: lc.easySolved },
              { label: "Medium", value: lc.mediumSolved },
              { label: "Hard", value: lc.hardSolved },
              { label: "Ranking", value: lc.ranking },
              { label: "Acceptance", value: lc.acceptanceRate, isText: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/50 bg-muted/30 p-4 text-center"
              >
                <p className="text-xl font-bold text-gradient-accent sm:text-2xl">
                  {stat.isText ? (
                    stat.value
                  ) : (
                    <AnimatedCounter value={stat.value as number} />
                  )}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </GlowCard>
      </ScrollReveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, i) => {
          const Icon =
            iconComponents[achievement.icon as keyof typeof iconComponents] || Trophy;
          return (
            <GlowCard key={achievement.id} delay={i * 0.06} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  {achievement.year}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{achievement.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {achievement.description}
              </p>
            </GlowCard>
          );
        })}
      </div>
    </Section>
  );
}
