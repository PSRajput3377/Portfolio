"use client";

import { useState } from "react";
import { Mail, FileText, Send, CheckCircle, Phone, Code2, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowCard } from "@/components/shared/glow-card";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const socialLinks = [
  { href: `mailto:${SITE_CONFIG.email}`, icon: Mail, label: "Email", sub: SITE_CONFIG.email },
  { href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`, icon: Phone, label: "Phone", sub: SITE_CONFIG.phone },
  { href: SITE_CONFIG.linkedin, icon: LinkedInIcon, label: "LinkedIn", sub: "Connect" },
  { href: SITE_CONFIG.github, icon: GitHubIcon, label: "GitHub", sub: "@psrajput3377" },
  { href: SITE_CONFIG.leetcode, icon: Code2, label: "LeetCode", sub: "Kai_33" },
  { href: SITE_CONFIG.codechef, icon: Code2, label: "CodeChef", sub: "kai_37" },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" variant="elevated">
      <ScrollReveal>
        <SectionHeader
          label="Contact"
          title="Let's build something great"
          description="Open to full-time roles, internships, and interesting collaborations. I'll get back within 24 hours."
          align="center"
        />
      </ScrollReveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        <ScrollReveal className="lg:col-span-2">
          <GlowCard className="h-full p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hiring, collaborating, or just want to connect — I&apos;d love to hear from you.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              {SITE_CONFIG.location}
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 transition-all hover:border-accent/30 hover:bg-accent/5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <link.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{link.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{link.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            <a
              href={SITE_CONFIG.resumeUrl}
              download
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Download Resume
            </a>
          </GlowCard>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-3" delay={0.1}>
          <GlowCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the opportunity..."
                  className="min-h-[140px]"
                />
              </div>

              {status === "success" && (
                <p className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
                  <CheckCircle className="h-4 w-4" />
                  Message sent! I&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm text-red-500">
                  Something went wrong. Please email me directly.
                </p>
              )}

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="mt-6 w-full shine sm:w-auto"
                disabled={status === "loading"}
              >
                <Send />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </GlowCard>
        </ScrollReveal>
      </div>
    </Section>
  );
}
