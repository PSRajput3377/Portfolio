import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", level: 92 },
      { name: "Java", level: 85 },
      { name: "C / C++", level: 82 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 93 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Express.js", level: 82 },
      { name: "REST APIs", level: 91 },
      { name: "Redux Toolkit", level: 85 },
    ],
  },
  {
    name: "Database & Cloud",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "AWS (EC2, RDS)", level: 85 },
    ],
  },
  {
    name: "AI & Tools",
    skills: [
      { name: "Applied LLMs", level: 88 },
      { name: "Workflow Automation", level: 87 },
      { name: "Git / GitHub", level: 92 },
      { name: "Postman", level: 90 },
    ],
  },
];
