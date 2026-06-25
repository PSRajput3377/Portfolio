"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, FolderOpen, Mail, MapPin, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { GradientOrbs } from "@/components/shared/gradient-orbs";
import { Particles } from "@/components/shared/particles";
import { Magnetic } from "@/components/shared/magnetic";

const nameWords = SITE_CONFIG.name.split(" ");

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-dot opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <GradientOrbs />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      <Particles />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-4 py-32 sm:px-6 lg:flex-row lg:items-center lg:gap-20"
        style={{ opacity, y, scale }}
      >
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md shine"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Available for opportunities
          </motion.div>

          <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {nameWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 48, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.35 + i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                style={{ transformPerspective: 600 }}
              >
                <span className={i === nameWords.length - 1 ? "text-gradient-accent" : "text-gradient"}>
                  {word}
                </span>
                {i < nameWords.length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="mt-5 h-px w-24 bg-gradient-to-r from-accent to-transparent lg:mx-0 mx-auto"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
            style={{ originX: 0 }}
          />

          <motion.p
            className="mt-5 text-lg font-medium tracking-tight text-foreground/90 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE_OUT_EXPO }}
          >
            {SITE_CONFIG.title}
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE_OUT_EXPO }}
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.div
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
          >
            <MapPin className="h-4 w-4 text-accent" />
            {SITE_CONFIG.location}
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, ease: EASE_OUT_EXPO }}
          >
            {[
              { value: "9.05", label: "CGPA" },
              { value: "300+", label: "DSA Solved" },
              { value: "3+", label: "Projects" },
              { value: "2", label: "Roles" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-card/40 px-3 py-3 text-center backdrop-blur-sm"
              >
                <p className="text-lg font-bold text-gradient-accent">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE_OUT_EXPO }}
          >
            <Magnetic strength={0.25}>
              <Button variant="accent" size="lg" className="shine" onClick={() => scrollTo("#projects")}>
                <FolderOpen />
                View Projects
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button variant="outline" size="lg" asChild>
                <a href={SITE_CONFIG.resumeUrl} download>
                  <Download />
                  Download Resume
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button variant="ghost" size="lg" onClick={() => scrollTo("#contact")}>
                <Mail />
                Contact Me
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{ transformPerspective: 1000 }}
        >
          <Magnetic strength={0.15}>
          <div className="relative h-72 w-72 sm:h-80 sm:w-80" data-cursor="pointer">
            <motion.div
              className="absolute -inset-8 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl ring-1 ring-white/5 glow-border animate-float"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src={SITE_CONFIG.profileImage}
                alt={SITE_CONFIG.name}
                fill
                priority
                className="object-cover object-[center_22%] scale-105"
                sizes="(max-width: 640px) 288px, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                <p className="text-sm font-medium text-foreground">Software Engineer</p>
                <p className="text-xs text-accent">Applied AI · Full Stack</p>
              </div>
            </motion.div>

            {[
              { label: "CGPA 9.05", pos: "-top-3 -left-4" },
              { label: "300+ DSA", pos: "-right-4 top-8" },
              { label: "DevRev", pos: "-bottom-2 -right-2" },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                className={`absolute ${badge.pos} rounded-lg border border-border/80 bg-card/90 px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-md`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                transition={{
                  opacity: { delay: 1.2 + i * 0.15 },
                  scale: { delay: 1.2 + i * 0.15 },
                  y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                }}
              >
                {badge.label}
              </motion.div>
            ))}
          </div>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
