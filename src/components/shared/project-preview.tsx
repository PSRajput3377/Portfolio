"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  project: Project;
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const url = project.demo || project.github;
  const displayUrl = project.demo?.replace(/^https?:\/\//, "") || "github.com";

  const content = (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_20px_60px_-20px_var(--glow)]">
      <div className="flex items-center gap-3 border-b border-border/60 bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/50 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="truncate">{displayUrl}</span>
          {url && <ExternalLink className="ml-auto h-3 w-3 shrink-0 opacity-50" />}
        </div>
      </div>

      <div
        className={cn(
          "relative flex aspect-[16/10] flex-col items-center justify-center overflow-hidden bg-gradient-to-br p-8",
          project.gradient
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-background/10 text-3xl font-bold text-foreground backdrop-blur-md ring-1 ring-white/10"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {project.title.charAt(0)}
        </motion.div>
        <p className="relative mt-4 text-center text-sm font-medium text-foreground/90">
          {project.title}
        </p>
        {project.metrics && (
          <div className="relative mt-4 flex flex-wrap justify-center gap-2">
            {project.metrics.map((m) => (
              <span
                key={m.label}
                className="rounded-full border border-white/10 bg-background/20 px-3 py-1 text-xs backdrop-blur-sm"
              >
                {m.value} {m.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        data-cursor="pointer"
      >
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
}
