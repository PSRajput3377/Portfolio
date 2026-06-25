import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "placement-portal",
    title: "Centralized Placement Portal",
    subtitle: "Multi-institution placement platform on AWS",
    problem:
      "Three institutions needed a unified system to manage placements, student profiles, and recruitment cycles — replacing fragmented tools and manual coordination.",
    solution:
      "Built a centralized placement platform with React, Redux Toolkit, FastAPI, and PostgreSQL — deployed on AWS EC2 with RDS, featuring optimized APIs with pagination, caching, and debouncing.",
    impact: [
      "Serves 3 institutions with thousands of student profiles",
      "Reduced server load by 40% through API optimization",
      "Deployed on AWS EC2 with PostgreSQL on RDS for peak recruitment cycles",
      "Live at central.sjceplacements.org",
    ],
    tech: ["React", "Redux Toolkit", "FastAPI", "PostgreSQL", "AWS EC2", "AWS RDS"],
    demo: "https://central.sjceplacements.org",
    metrics: [
      { label: "Institutions", value: "3" },
      { label: "Load Reduced", value: "40%" },
      { label: "Students", value: "1000s" },
    ],
    images: ["/image.png"],
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "hackelite",
    title: "HackElite JSSSTU'24 Website",
    subtitle: "Hackathon platform for 1000+ participants",
    problem:
      "HackElite JSSSTU needed a fast, accessible website to handle registrations and real-time announcements for a large-scale inter-college hackathon.",
    solution:
      "Developed a responsive hackathon website with React and Tailwind CSS, optimized for performance and accessibility during high-traffic registration periods.",
    impact: [
      "Used by 1000+ hackathon participants",
      "Supported registration and real-time announcements",
      "Achieved 95+ Lighthouse scores for performance and accessibility",
      "Engaging UI built with React and Tailwind CSS",
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript", "Responsive Design"],
    demo: "https://hackelite.in",
    metrics: [
      { label: "Participants", value: "1000+" },
      { label: "Lighthouse", value: "95+" },
      { label: "Real-time", value: "Live" },
    ],
    images: [],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "forgeai",
    title: "ForgeAI",
    subtitle: "Autonomous Multi-Agent AI Software Engineering Platform",
    problem:
      "Software teams spend significant time translating high-level requirements into implemented, tested, and reviewed code — a slow, error-prone process that doesn't scale.",
    solution:
      "Built an autonomous multi-agent platform where specialized agents (Manager, Planner, Researcher, Memory, Coder, Tester, Reviewer, Git) collaborate through a LangGraph orchestration engine with project-aware RAG, persistent memory, and sandboxed Docker execution.",
    impact: [
      "8 specialized agents collaborate end-to-end — from planning to pull requests",
      "LangGraph orchestration with RAG, persistent memory, and sandboxed code execution",
      "Enterprise features: JWT auth, multi-user workspaces, real-time WebSocket observability",
      "GitHub integration with approval-gated PR workflows and 250+ automated tests",
    ],
    tech: [
      "FastAPI",
      "Python",
      "LangGraph",
      "Ollama",
      "PostgreSQL",
      "Redis",
      "Qdrant",
      "Docker",
      "Next.js",
      "TypeScript",
      "WebSockets",
      "GitHub API",
    ],
    github: "https://github.com/psrajput3377/ForgeAI",
    metrics: [
      { label: "Agents", value: "8" },
      { label: "Tests", value: "250+" },
      { label: "Stack", value: "Full" },
    ],
    images: [],
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
];
