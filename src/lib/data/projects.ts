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
    images: ["/projects/placement-1.svg", "/projects/placement-2.svg"],
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
    images: ["/projects/hackelite-1.svg", "/projects/hackelite-2.svg"],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "algosortify",
    title: "AlgoSortify",
    subtitle: "Interactive sorting algorithm visualizer",
    problem:
      "Students learning DSA often struggle to visualize how sorting algorithms work step-by-step, making concepts harder to internalize.",
    solution:
      "Created an interactive Python tool using Pygame to visualize Quick Sort, Merge Sort, Bubble Sort, and Heap Sort with animations and adjustable speed controls.",
    impact: [
      "Visualizes 4+ sorting algorithms interactively",
      "Adjustable speed controls for better learning",
      "Used as a teaching aid for DSA concepts",
      "Open-source on GitHub",
    ],
    tech: ["Python", "Pygame", "Algorithms", "Data Structures"],
    github: "https://github.com/psrajput3377/sorting-algorithm-visualization-",
    demo: "https://psrajput3377.github.io/sorting-algorithm-visualization-",
    metrics: [
      { label: "Algorithms", value: "4+" },
      { label: "Interactive", value: "Yes" },
      { label: "Language", value: "Python" },
    ],
    images: ["/projects/algosortify-1.svg", "/projects/algosortify-2.svg"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
];
