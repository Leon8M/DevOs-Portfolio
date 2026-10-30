export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  /** File name shown in My Documents\Education (without .txt). */
  fileName: string;
  description: string;
  coursework: string[];
}

export const education: EducationItem[] = [
  {
    id: "kcau-bsc",
    degree: "Bachelor of Science in Applied Computing (Information Security Major)",
    institution: "KCA University",
    years: "Sep 2023 - Sep 2026",
    fileName: "KCA University - BSc Applied Computing",
    description:
      "Applied computing degree majoring in Information Security, with project work and leadership roles alongside the coursework.",
    coursework: ["Information Security", "Systems Design & Management", "Software Engineering", "Database Systems", "Network Architecture"],
  },
  {
    id: "alx-se",
    degree: "Software Engineering Program (Backend Specialization)",
    institution: "ALX Africa",
    years: "Mar 2023 - Apr 2024",
    fileName: "ALX - Software Engineering Program",
    description: "Intensive 12-month program focused on backend development, Python, Linux, and scalable system design.",
    coursework: ["Python", "Backend Development", "Linux & Shell", "Data Structures", "Distributed Systems", "System Architecture"],
  },
];
