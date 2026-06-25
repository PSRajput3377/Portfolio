"use client";

import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social";
import { projects } from "@/lib/data/projects";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ProjectPreview } from "@/components/shared/project-preview";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Projects() {
  return (
    <Section id="projects" variant="muted">
      <ScrollReveal>
        <SectionHeader
          label="Projects"
          title="Featured work"
          description="Case studies of products built to solve real problems at scale."
        />
      </ScrollReveal>

      <div className="mt-16 space-y-20">
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={0.05}>
            <article
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div
                  className={`pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-60 blur-3xl`}
                  aria-hidden
                />
                <ProjectPreview project={project} />
              </div>

              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="space-y-5">
                    <div>
                      <p className="text-sm font-medium tracking-wide text-accent uppercase">
                        {project.subtitle}
                      </p>
                      <h3 className="font-display mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {project.metrics?.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-xl border border-border/60 bg-muted/30 px-3 py-3 text-center"
                        >
                          <p className="text-lg font-bold text-gradient-accent">{metric.value}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 rounded-xl border border-border/50 bg-card/50 p-5">
                      {[
                        { title: "Problem", text: project.problem },
                        { title: "Solution", text: project.solution },
                      ].map((block) => (
                        <div key={block.title}>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                            {block.title}
                          </h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {block.text}
                          </p>
                        </div>
                      ))}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                          Impact
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                          {project.impact.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="accent">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      {project.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <GitHubIcon />
                            Source
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button variant="accent" size="sm" className="shine" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
