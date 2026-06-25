"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative border-t border-border/60 bg-card/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-2xl tracking-tight">
              {SITE_CONFIG.name.split(" ")[0]}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {SITE_CONFIG.title} — building products that matter.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: SITE_CONFIG.github, icon: GitHubIcon, label: "GitHub" },
              { href: SITE_CONFIG.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
              { href: SITE_CONFIG.leetcode, icon: null, label: "LC" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-accent/40 hover:text-foreground hover:shadow-[0_0_20px_-8px_var(--glow)]"
                aria-label={link.label}
              >
                {link.icon ? (
                  <link.icon className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">LC</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <Button
              size="icon"
              variant="accent"
              className="h-11 w-11 rounded-full shadow-lg shadow-accent/25"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
