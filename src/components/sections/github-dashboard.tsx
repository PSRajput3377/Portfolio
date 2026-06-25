"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Code2, Activity } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social";
import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubStats } from "@/types";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowCard } from "@/components/shared/glow-card";
import { Section } from "@/components/shared/section";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Badge } from "@/components/ui/badge";

const fallbackStats: GitHubStats = {
  repos: [
    {
      id: 1,
      name: "sorting-algorithm-visualization-",
      description: "Interactive sorting algorithm visualizer",
      html_url: "https://github.com/psrajput3377/sorting-algorithm-visualization-",
      stargazers_count: 1,
      language: "Python",
      fork: false,
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "SensAI",
      description: "AI-powered career coaching platform",
      html_url: "https://github.com/psrajput3377/SensAI",
      stargazers_count: 0,
      language: "TypeScript",
      fork: false,
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: "DeepFake-AI-Detector",
      description: "Deep learning deepfake detection system",
      html_url: "https://github.com/psrajput3377/DeepFake-AI-Detector",
      stargazers_count: 0,
      language: "Python",
      fork: false,
      updated_at: new Date().toISOString(),
    },
  ],
  totalStars: 1,
  totalForks: 0,
  languages: { Python: 40, TypeScript: 35, JavaScript: 25 },
  contributions: 400,
};

export function GitHubDashboard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/github?username=${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const data = stats || fallbackStats;
  const topLanguages = Object.entries(data.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <Section id="github">
      <ScrollReveal>
        <SectionHeader
          label="GitHub"
          title="Open source activity"
          description={`Live stats from @${GITHUB_USERNAME} — repositories, contributions, and languages.`}
        />
      </ScrollReveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Stars", value: data.totalStars, icon: Star },
          { label: "Repositories", value: data.repos.length, icon: Code2 },
          { label: "Forks", value: data.totalForks, icon: GitFork },
          { label: "Contributions", value: data.contributions, icon: Activity },
        ].map((stat, i) => (
          <GlowCard key={stat.label} delay={i * 0.08} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <stat.icon className="h-5 w-5" />
              </div>
              {loading && <span className="text-xs text-muted-foreground">···</span>}
            </div>
            <p className="mt-4 font-display text-4xl text-gradient-accent">
              <AnimatedCounter value={stat.value} suffix="+" />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </GlowCard>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-2">
          <GlowCard className="p-6">
            <h3 className="mb-5 flex items-center gap-2 font-semibold">
              <GitHubIcon className="h-4 w-4 text-accent" />
              Top Repositories
            </h3>
            <div className="space-y-2">
              {data.repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 p-4 transition-all hover:border-accent/30 hover:bg-accent/5"
                  data-cursor="pointer"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground group-hover:text-accent">
                      {repo.name}
                    </p>
                    {repo.description && (
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex items-center gap-3 text-sm text-muted-foreground">
                    {repo.language && <Badge variant="accent">{repo.language}</Badge>}
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </GlowCard>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <GlowCard className="h-full p-6">
            <h3 className="mb-5 font-semibold">Languages</h3>
            <div className="space-y-5">
              {topLanguages.map(([lang, percent]) => (
                <div key={lang}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">{lang}</span>
                    <span className="text-muted-foreground">{percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-1000"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </Section>
  );
}
