export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  icon: string; // Added icon field
}

export const experience: ExperienceItem[] = [
  {
    id: "azina-ciphercom",
    company: "Azina / Ciphercom",
    role: "Full-Stack Software Engineer & Product Lead",
    duration: "11/2025 - Present",
    summary: "Led the end-to-end architecture and development of a new enterprise monitoring platform, improving system performance by about 50% through backend optimization, database refinements, and API redesigns. Built and maintained React, React Native, Java Spring Boot, PostgreSQL, and secure REST API solutions, introduced AI-assisted development practices across the engineering team, and set reusable UI standards and engineering workflows. Also served as project manager for Quorumate and the Azinabok admin portal.",
    icon: "/xp-icons/community-icon.png",
  },
  {
    id: "propel-contract",
    company: "Propel",
    role: "Contract Back-End Developer",
    duration: "4/2025 - 11/2025",
    summary: "Designed and implemented a Python and Django microservice architecture with GraphQL APIs and RabbitMQ messaging, configured secure JWT authentication, and delivered product and administrative management features. Dockerized service images, established CI pipelines with automated testing, and collaborated asynchronously with distributed frontend and product teams to resolve performance bottlenecks and maintain service reliability.",
    icon: "/xp-icons/freelance-icon.png",
  },
  {
    id: "alofa-intern",
    company: "Alofa, Remote",
    role: "Software Intern",
    duration: "7/2024 - 11/2024",
    summary: "Contributed to application development by coding, debugging, and testing features to ensure functionality and user satisfaction while actively learning modern tools, frameworks, and best practices to enhance technical proficiency.",
    icon: "/xp-icons/alofa-icon.png", // Ensure this icon exists
  },
  {
    id: "freelance-dev",
    company: "Freelance",
    role: "Self-Employed Developer",
    duration: "1/2023 - Present",
    summary: "Designed and developed responsive, user-friendly web applications, including portfolio websites and business sites for individual clients.",
    icon: "/xp-icons/freelance-icon.png", // Ensure this icon exists
  },
  {
    id: "community-lead",
    company: "Community", // As per resume context
    role: "Community Lead",
    duration: "5/2025 - Present",
    summary: "Community Lead overseeing growth, collaboration, and team alignment (Product, Dev, Marketing). Organized events (Q&As, workshops) and represented the community, using leadership and mentorship skills.",
    icon: "/xp-icons/community-icon.png", // Ensure this icon exists
  },
];