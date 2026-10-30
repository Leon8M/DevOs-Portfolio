// Single source of truth for personal details. The virtual file system (About Me.txt,
// Favorites, Leadership.txt ...) and the crawler-visible summary are generated from this.

export const profile = {
  name: "Leon M. Njeru",
  altName: "Leon Munene",
  title: "Full-Stack & DevOps Engineer",
  location: "Nairobi, Kenya",
  availability: "Open to full-time and remote roles",
  email: "leonmunene254@gmail.com",
  phone: "+254 759 604 380",
  summary:
    "I design, build, and deploy production web platforms end to end: React and Next.js frontends, " +
    "Java Spring Boot and Python services, and Dockerized deployments on Linux behind Nginx. " +
    "As Product Lead for an enterprise monitoring platform, I improved system efficiency by ~50% " +
    "through backend and API optimization. I'm an Information Security major who automates releases, " +
    "designs secure APIs, and leads engineering teams.",
  focus: [
    "Backend services with Java Spring Boot, Python (Django/Flask) and PostgreSQL",
    "Frontends with React, Next.js and React Native",
    "Deployments with Docker, Nginx, Linux, systemd and GitLab CI/CD",
    "Real-time and async systems with WebSockets, Redis and RabbitMQ",
  ],
};

export interface SocialLink {
  name: string;
  label: string;
  url: string;
  icon: string;
}

export const socials: SocialLink[] = [
  { name: "LinkedIn", label: "linkedin.com/in/leon-munene", url: "https://www.linkedin.com/in/leon-munene", icon: "/xp-icons/linkedin-icon.png" },
  { name: "GitHub", label: "github.com/Leon8M", url: "https://github.com/Leon8M", icon: "/xp-icons/github-icon.png" },
  { name: "GitLab", label: "gitlab.com/Leon8M", url: "https://gitlab.com/Leon8M", icon: "/xp-icons/github-icon.png" },
];

export const leadership = [
  {
    role: "Community Lead",
    dates: "May 2025 - Present",
    detail: "Lead a 30+ member tech community across Product, Engineering, and Marketing; organize workshops, Q&As, and technical sessions.",
  },
  {
    role: "GDG on Campus Co-Lead, KCA University",
    dates: "2024 - 2025",
    detail: "Co-led the Google Developer Group chapter at KCA University for the 2024/2025 academic year.",
  },
  {
    role: "Microsoft Student Ambassador",
    dates: "",
    detail: "Mentored 20+ students in Python, React, Git, and modern software development.",
  },
  {
    role: "Frontend Lead, KCA Tech Club",
    dates: "",
    detail: "Trained 20+ members in React and frontend engineering.",
  },
];

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  image?: string;
  /** Public page where the certificate can be verified. */
  verifyUrl?: string;
}

export const certificates: Certificate[] = [
  {
    name: "ALX Software Engineering (Back-end)",
    issuer: "ALX Africa",
    date: "Apr 2024",
    image: "/certificates/alx-software-engineering.jpg",
    verifyUrl: "https://intranet.alxswe.com/certificates/F97ERYCzcN",
  },
  { name: "HackerRank React (Frontend)", issuer: "HackerRank", date: "Feb 2025", image: "/certificates/hackerrank-react.png" },
  { name: "HackerRank Python (Basic)", issuer: "HackerRank", date: "Feb 2025", image: "/certificates/hackerrank-python.png" },
  { name: "Microsoft ADC LIT Program", issuer: "Microsoft ADC", date: "May 2025", image: "/certificates/microsoft-adc-lit.png" },
  { name: "GDG on Campus Co-Lead", issuer: "KCA University", date: "2025", image: "/certificates/gdg-co-lead.png" },
  {
    name: "UNICEF Introduction to AI for Teachers and Students",
    issuer: "UNICEF (Agora)",
    date: "Oct 2026",
    image: "/certificates/unicef-ai-teachers-students.png",
  },
  {
    name: "UNICEF Prevention of Sexual Exploitation and Abuse (PSEA)",
    issuer: "UNICEF (Agora)",
    date: "Oct 2026",
    image: "/certificates/unicef-psea.png",
  },
];
