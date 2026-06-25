"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, FolderOpen, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { GradientOrbs } from "@/components/shared/gradient-orbs";
import { Particles } from "@/components/shared/particles";
import { Magnetic } from "@/components/shared/magnetic";
import { BorderBeam } from "@/components/shared/border-beam";
import { TextShimmer } from "@/components/shared/text-shimmer";
import { Stagger, StaggerItem } from "@/components/shared/stagger";

const nameWords = SITE_CONFIG.name.split(" ");

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);
  const y = useTransform(scrollY, [0, 350], [0, 50]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-dot opacity-20" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <GradientOrbs />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/85 to-background" />
      <Particles />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-28 sm:px-6 md:flex-row md:items-center md:gap-12 lg:gap-20"
        style={{ opacity, y }}
      >
        <Stagger className="flex-1 text-center md:text-left">
          <StaggerItem>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for opportunities
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-display text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              {nameWords.map((word, i) => (
                <span key={`${word}-${i}`} className="inline-block">
                  {i === nameWords.length - 1 ? (
                    <TextShimmer>{word}</TextShimmer>
                  ) : (
                    <span className="text-foreground">{word}</span>
                  )}
                  {i < nameWords.length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent/80 to-transparent md:mx-0 mx-auto" />
          </StaggerItem>

          <StaggerItem>
            <p className="mt-4 text-lg font-medium tracking-tight text-foreground/85 sm:text-xl">
              {SITE_CONFIG.title}
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {SITE_CONFIG.tagline}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {SITE_CONFIG.location}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:max-w-md">
              {[
                { value: "9.05", label: "CGPA" },
                { value: "300+", label: "DSA" },
                { value: "3+", label: "Projects" },
                { value: "2", label: "Roles" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass-stat rounded-xl px-3 py-2.5 text-center"
                >
                  <p className="text-base font-semibold text-foreground">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
              <Magnetic strength={0.2}>
                <Button variant="accent" size="lg" className="shine" onClick={() => scrollTo("#projects")}>
                  <FolderOpen />
                  View Projects
                </Button>
              </Magnetic>
              <Magnetic strength={0.15}>
                <Button variant="outline" size="lg" asChild>
                  <a href={SITE_CONFIG.resumeUrl} download>
                    <Download />
                    Resume
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.15}>
                <Button variant="ghost" size="lg" onClick={() => scrollTo("#contact")}>
                  <Mail />
                  Contact
                </Button>
              </Magnetic>
            </div>
          </StaggerItem>
        </Stagger>

        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO }}
        >
          <Magnetic strength={0.12}>
            <div className="relative h-72 w-72 sm:h-[22rem] sm:w-[22rem]" data-cursor="pointer">
              <div className="absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl" />
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border/50 bg-card shadow-2xl"
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <BorderBeam size={180} duration={10} />
                <Image
                  src={SITE_CONFIG.profileImage}
                  alt={SITE_CONFIG.name}
                  fill
                  priority
                  className="object-cover object-[center_22%]"
                  sizes="(max-width: 640px) 288px, 352px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm font-medium">Software Engineer</p>
                  <p className="text-xs text-accent">Applied AI · Full Stack</p>
                </div>
              </motion.div>

              {[
                { label: "CGPA 9.05", pos: "-top-2 -left-3" },
                { label: "300+ DSA", pos: "-right-3 top-6" },
                { label: "@ DevRev", pos: "-bottom-1 -right-1" },
              ].map((b, i) => (
                <motion.span
                  key={b.label}
                  className={`absolute ${b.pos} glass-stat rounded-lg px-2.5 py-1 text-[11px] font-medium`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, ease: EASE_OUT_EXPO }}
                >
                  {b.label}
                </motion.span>
              ))}
            </div>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground/70 transition-colors hover:text-foreground"
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll down"
      >
        <span className="text-[9px] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
