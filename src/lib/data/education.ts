export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  description: string; // Added description field from resume
  icon: string; // Added icon field
}

export const education: EducationItem[] = [
  {
    id: "kcau-bsc",
    degree: "Bachelor of Science in Applied Computing (Information Security Major)",
    institution: "KCA University",
    years: "9/2023 - 9/2026",
    description: "Currently in my third year of study, focusing on software development, systems design and management and other applied computing principles; while improving teamwork and leadership skills through projects, assignments and leadership roles.",
    icon: "/xp-icons/university-icon.png", // Ensure this icon exists
  },
  {
    id: "alx-se",
    degree: "Software Engineering Program (Backend Specialization)",
    institution: "ALX SE Program",
    years: "3/2023 - 4/2024",
    description: "Intensive 12-month program focused on backend development, Python, and scalable system design.",
    icon: "/xp-icons/alx-icon.png", // Ensure this icon exists
  },
];