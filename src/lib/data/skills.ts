export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "Rust", "SQL", "C++", "HTML5", "CSS3", "SCSS"],
  },
  {
    category: "Frontend Technologies",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Framer Motion", "Shadcn UI", "Zustand", "React Context", "Material UI", "Apollo", "ReactPy"],
  },
  {
    category: "Backend & APIs",
    skills: ["Spring Boot", "Django", "Flask", "Node.js", "GraphQL", "RESTful APIs", "FastAPI", "Celery"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"],
  },
  {
    category: "Cloud, DevOps & Tooling",
    skills: ["Linux (Arch Linux)", "Docker", "Git", "GitHub", "Supabase", "Vercel", "RabbitMQ", "CI/CD pipelines", "Google Cloud", "GitHub Actions", "Jira", "VS Code"],
  },
  {
    category: "Methodologies",
    skills: ["Microservices architecture", "System Design", "JWT Authentication", "AI-Assisted Development (GitHub Copilot, Gemini CLI)", "Agile frameworks", "Leadership", "Problem Solving", "Communication", "Teamwork", "Adaptability", "Time Management", "Critical Thinking", "Attention to Detail", "Continuous Learning"],
  },
];
