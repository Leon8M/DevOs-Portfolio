export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "TailwindCSS", "Framer Motion", "Zustand", "React Context", "Shadcn UI", "Material UI", "ReactPy"],
  },
  {
    category: "Backend",
    skills: ["Python","Django", "Flask", "FastAPI", "MongoDB", "PostgreSQL", "RESTful APIs", "GraphQL", "Node.js"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Git", "Docker", "Google Cloud", "Vercel", "Github Actions", "Jira", "VS Code"],
  },
  {
    category: "Other",
    skills: ["Leadership", "Agile Methodologies", "Problem Solving", "Communication", "Teamwork", "Adaptability", "Time Management", "Critical Thinking", "Attention to Detail", "Continuous Learning"],
  },
];
