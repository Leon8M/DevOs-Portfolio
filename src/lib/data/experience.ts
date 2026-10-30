export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  /** File name shown in My Documents\Experience (without .txt). */
  fileName: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "azina-ciphercom",
    company: "Azina / Ciphercom",
    role: "Full-Stack Software Engineer & Product Lead",
    duration: "Nov 2025 - Present",
    fileName: "Azina - Product Lead",
    summary:
      "Lead the architecture, delivery and team for an enterprise monitoring platform, and project-manage the company's meeting-management and booking products.",
    highlights: [
      "Lead architecture and delivery of an enterprise monitoring platform (React, Spring Boot, PostgreSQL) and its engineering team.",
      "Improved overall system efficiency by ~50% through backend optimization, database refinements, and REST API redesign.",
      "Project-manage the Quorumate meeting platform and AzinaBook admin portal from stakeholder requirements to release.",
      "Automated build, deploy, and health-check scripts (Bash, rsync/SSH, systemd) for Spring Boot services and React frontends.",
      "Configured Nginx reverse proxying, sub-path routing, and Let's Encrypt TLS for multi-portal frontends and APIs.",
      "Built real-time and async features with WebSockets/LiveKit, Redis, and RabbitMQ; versioned schemas with Flyway.",
      "Introduced AI-assisted workflows that sped up delivery while keeping rigorous code review and architectural ownership.",
    ],
    technologies: ["React", "React Native", "Java Spring Boot", "PostgreSQL", "MySQL", "Nginx", "Redis", "RabbitMQ", "Flyway", "Linux"],
  },
  {
    id: "propel-contract",
    company: "Propel",
    role: "Contract Back-End Developer",
    duration: "Apr 2025 - Nov 2025",
    fileName: "Propel - Back-End Developer",
    summary:
      "Built a Python/Django microservices backend with GraphQL APIs and RabbitMQ messaging for a distributed product team.",
    highlights: [
      "Designed a Python/Django microservices architecture with GraphQL APIs and RabbitMQ for asynchronous messaging.",
      "Secured services with JWT, containerized them with Docker, and built CI pipelines with automated unit/integration tests.",
      "Delivered product and administrative management features.",
      "Partnered asynchronously with distributed frontend and product teams to resolve performance bottlenecks.",
    ],
    technologies: ["Python", "Django", "GraphQL", "RabbitMQ", "Docker", "JWT", "CI/CD"],
  },
  {
    id: "alofa-intern",
    company: "Alofa",
    role: "Software Intern",
    duration: "Jul 2024 - Nov 2024",
    location: "Remote",
    fileName: "Alofa - Software Intern",
    summary: "Built and tested application features alongside senior engineers in a remote Agile team.",
    highlights: [
      "Developed, tested, and debugged features with senior engineers in Agile sprints, resolving defects to improve reliability.",
      "Worked within Git-based version control, code review, and collaborative engineering workflows.",
    ],
    technologies: ["JavaScript", "Git", "Agile"],
  },
  {
    id: "freelance-dev",
    company: "Denex Software",
    role: "Freelance Full-Stack Developer",
    duration: "Jan 2023 - Present",
    fileName: "Denex Software - Freelance",
    summary: "Deliver websites and web applications for businesses and individual clients through my own software studio.",
    highlights: [
      "Deliver client web apps and sites (e.g. Vertical Techniques Ltd.) end to end, from requirements to hosting, domains, and email.",
      "Deploy on Vercel and Linux VPS, and provide post-launch support and maintenance.",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel", "Linux"],
  },
];
