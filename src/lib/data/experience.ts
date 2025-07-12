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