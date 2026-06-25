export const SITE_CONFIG = {
  name: "Prashant Kumar Singh",
  title: "Software Engineer | Applied AI Engineer",
  tagline:
    "Full-stack developer building scalable web applications with React, FastAPI, and AWS — currently shipping AI-driven workflows and automation at DevRev.",
  location: "Mysore, India",
  email: "prashantrathour63@gmail.com",
  phone: "+91 7462093970",
  github: "https://github.com/psrajput3377",
  linkedin: "https://www.linkedin.com/in/prashant-singh-239153258",
  leetcode: "https://leetcode.com/u/Kai_33",
  codechef: "https://www.codechef.com/users/kai_37",
  resumeUrl: "/Prashant_Kumar_Singh.pdf",
  profileImage: "/myphoto.jpeg",
  placementPortal: "https://central.sjceplacements.org",
  hackelite: "https://hackelite.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://prashantsingh.dev",
} as const;

export const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || "psrajput3377";

export const LEETCODE_USERNAME =
  process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "Kai_33";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#github", label: "GitHub" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
] as const;
