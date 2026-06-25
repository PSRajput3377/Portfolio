import type { Experience, TimelineItem } from "@/types";

export const timeline: TimelineItem[] = [
  {
    year: "2022",
    title: "Started B.E. at JSSSTU",
    description:
      "Began Computer Science Engineering at SJCE, JSS Science and Technology University — building strong foundations in DSA, systems, and software engineering.",
  },
  {
    year: "2024",
    title: "Technical Lead, Linux Campus Club",
    description:
      "Led backend and open-source initiatives at LCC, mentoring 50+ students on Git, Linux, and system design through hands-on workshops.",
  },
  {
    year: "2024",
    title: "Placement Portal at Scale",
    description:
      "Designed and deployed a centralized placement platform for 3 institutions, optimizing backend APIs and serving thousands of student profiles on AWS.",
  },
  {
    year: "2025",
    title: "Applied AI at DevRev",
    description:
      "Joined DevRev as Member of Technical Staff Intern on the Applied AI Engineering team — building workflows, Snap-ins, and automation systems.",
  },
];

export const experiences: Experience[] = [
  {
    id: "devrev",
    company: "DevRev",
    role: "Member of Technical Staff Intern — Applied AI Engineering",
    period: "Oct 2025 — Present",
    location: "India",
    description:
      "Part of the Applied AI Engineering team, designing and implementing AI-powered dashboards, workflows, and agents to automate internal processes and improve system efficiency.",
    highlights: [
      "Built and configured custom Snap-ins and organization-level workflows",
      "Designed AI-powered dashboards and agent workflows for process automation",
      "Worked on data migration pipelines with reliable cross-system transitions",
      "Integrated and tested REST APIs using Postman for validation and debugging",
    ],
    achievements: [
      { label: "Snap-ins Built", value: 8, suffix: "+" },
      { label: "Workflows", value: 15, suffix: "+" },
      { label: "API Integrations", value: 20, suffix: "+" },
      { label: "Dashboards", value: 5, suffix: "+" },
    ],
    tech: [
      "Python",
      "LLMs",
      "Snap-ins",
      "REST APIs",
      "Postman",
      "Workflow Automation",
    ],
  },
  {
    id: "lcc",
    company: "Linux Campus Club (LCC), SJCE",
    role: "Technical Lead",
    period: "2024 — 2025",
    location: "Mysore, India",
    description:
      "Led backend and open-source projects while mentoring students and driving technical culture across campus.",
    highlights: [
      "Led backend and open-source projects for the Linux Campus Club",
      "Mentored 50+ students on Git, Linux, and system design concepts",
      "Conducted hands-on workshops on scalable development practices",
      "Promoted collaboration and open-source contribution across campus",
    ],
    achievements: [
      { label: "Students Mentored", value: 50, suffix: "+" },
      { label: "Workshops", value: 10, suffix: "+" },
      { label: "Projects Led", value: 5, suffix: "+" },
    ],
    tech: ["Git", "Linux", "System Design", "Open Source", "Backend"],
  },
];

export const education = [
  {
    degree: "B.E. in Computer Science and Engineering",
    university: "JSS Science and Technology University (SJCE), Mysore",
    period: "2022 — 2026",
    detail: "CGPA: 9.05 / 10",
  },
  {
    degree: "Senior Secondary",
    university: "Kendriya Vidyalaya, Ranchi",
    period: "2019 — 2021",
    detail: "88.4%",
  },
];
