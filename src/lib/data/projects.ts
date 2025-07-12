import { projectImages } from './projectImages'; // Import your image exports

export interface Project {
  id: string; // Unique identifier for each project
  title: string;
  description: string; // Short description
  longDescription: string; // Detailed description
  website?: string; // Optional: Live demo link
  github: string;
  image: { src: StaticImageData; alt: string; }; // Use the imported image object
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: "ai-learnhub",
    title: "AI LearnHub",
    description: "An AI-powered platform for generating and learning from custom courses.",
    longDescription: "AI LearnHub is a fully-featured, AI-powered learning platform designed to revolutionize how educational content is created and consumed. Leveraging the advanced capabilities of **Google's Gemini API**, users can dynamically generate comprehensive courses on virtually any topic imaginable. Each generated course comes complete with meticulously detailed chapters and intelligently curated video resources from YouTube, providing a rich and interactive learning experience.",
    website: "https://learn-with-ai-lilac.vercel.app/",
    github: "https://github.com/Leon8M/LearnWithAi",
    image: projectImages.learnai,
    technologies: ["Next.js", "Tailwind CSS", "Clerk", "Shadcn UI", "Google Gemini API"],
  },
  {
    id: "python-code-refactor-ai",
    title: "Python Code Refactor AI",
    description: "A web application utilizing AI to refactor, explain, or comment on Python code.",
    longDescription: "A simple yet powerful web application that leverages **Google's Gemini AI** to instantly refactor, explain, or add comments to your Python code. This tool is designed to significantly improve code quality and documentation. Its core features include: \n\n* **Refactor Code:** Enhance code readability and enforce Python best practices, including PEP8 guidelines. \n* **Add Comments:** Automatically generate insightful inline comments and comprehensive docstrings for superior code documentation. \n* **Explain Code:** Receive a step-by-step, clear explanation of any Python function or code snippet.",
    website: "https://python-refactor.vercel.app/",
    github: "https://github.com/Leon8M/Python-Refactor",
    image: projectImages.refactor,
    technologies: ["Next.js", "Tailwind CSS", "PrismJS", "Google Gemini API"],
  },
  {
    id: "xp-portfolio",
    title: "Windows XP Inspired Portfolio (This Site!)",
    description: "My current developer portfolio, designed to mimic the nostalgic interface of Windows XP.",
    longDescription: "This very website is my current developer portfolio, a unique and interactive project designed to evoke the nostalgic charm of Windows XP. It serves as a creative showcase for my skills, projects, and experience, offering a distinct user experience. Leveraging modern web technologies to recreate a classic interface, this portfolio features draggable and resizable windows, a functional Start Menu, and dynamic content loading, all while maintaining a responsive design.",
    website: "#", // This is the current site, so no external link
    github: "https://github.com/Leon8M/portfolio-xp", // Assuming this is your project's repo
    image: projectImages.xpPortfolio,
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
  },
  {
    id: "vertical-techniques",
    title: "Vertical Techniques Ltd. Website",
    description: "Official company website for Vertical Techniques Ltd, specializing in high-altitude cleaning solutions.",
    longDescription: "This is the official company website for **Vertical Techniques Ltd**, a firm dedicated to providing cost-efficient and safe high-altitude cleaning solutions. The site serves as a comprehensive digital storefront, showcasing their services, expertise, and commitment to safety in specialized cleaning operations. It aims to inform potential clients about their offerings and establish a strong online presence.",
    website: "https://www.verticaltechniques.co.ke/",
    github: "https://github.com/Leon8M/Anchored-Heights",
    image: projectImages.anchored,
    technologies: ["React", "Tailwind CSS"],
  },
  {
    id: "the-nex-journal",
    title: "The Nex Journal",
    description: "A personal blogging platform with a React frontend and Flask backend.",
    longDescription: "The Nex Journal is a modern, full-stack blogging platform that empowers users to seamlessly create, update, and delete blog posts. It features a robust admin panel for efficient content management and integrates with a **PostgreSQL database hosted on Render** for reliable data storage. Key features include: \n\n* **CRUD Operations:** Full capabilities for creating, reading, updating, and deleting blog posts. \n* **Image Uploads:** Easily upload and embed images directly within blog posts. \n* **External Links:** Support for integrating external content, such as Medium articles. \n* **Admin Authentication:** Secure access control for content managers. \n* **Distributed Deployment:** Frontend deployed on **Azure Static Web Apps** and backend on **Render**, ensuring high availability and scalability.",
    website: "https://blog-9k5.pages.dev/",
    github: "https://github.com/Leon8M/Blog",
    image: projectImages.blog,
    technologies: ["React", "Python", "Flask", "Tailwind CSS", "PostgreSQL", "Azure", "Render"],
  },
  {
    id: "linkedlist-api",
    title: "LinkedList API",
    description: "A web application demonstrating a LinkedList implementation with a Rust backend.",
    longDescription: "This project showcases a robust **LinkedList data structure implementation**, presented through a clean web interface. The powerful backend is built using **Rust**, demonstrating its efficiency and safety for data structure operations. The intuitive frontend is developed with **React**, providing a clear visualization and interaction point for the LinkedList. This application serves as an excellent example of integrating high-performance backend logic with a modern, responsive user interface.",
    website: "https://github.com/Leon8M/LinkedList-API/blob/main/README.md", // Directing to README for more info
    github: "https://github.com/Leon8M/LinkedList-API",
    image: projectImages.linked,
    technologies: ["Rust", "React", "Tailwind CSS"],
  },
  {
    id: "me-manager",
    title: "Me Manager",
    description: "An intuitive personal management application for finances, tasks, and more.",
    longDescription: "Take control of your personal life with **Me Manager**, a simple yet powerful application designed to streamline your daily organization. This intuitive tool helps users efficiently manage various aspects of their lives, including personal finances, task lists, and other essential responsibilities, all within a single, cohesive platform. Its focus is on providing a straightforward user experience to enhance productivity and organization.",
    website: "https://me-manager.vercel.app/",
    github: "https://github.com/Leon8M/Me-Manager",
    image: projectImages.money,
    technologies: ["React", "Flask", "Python", "Tailwind CSS"],
  },
  {
    id: "peer-learn",
    title: "Peer-Learn",
    description: "A peer-to-peer learning platform designed for university students.",
    longDescription: "Peer-Learn is an innovative peer-to-peer learning platform specifically tailored for university students. It facilitates knowledge sharing and collaborative learning by connecting students with their peers for study groups, tutoring, and collaborative project work. The platform aims to create an engaging and supportive academic environment, leveraging the collective intelligence of the student community.",
    website: "https://eeba3d15.e-learning-74b.pages.dev/",
    github: "https://github.com/Leon8M/E-learning",
    image: projectImages.peer,
    technologies: ["React", "Flask", "Python", "Tailwind CSS"],
  },
  {
    id: "anthony-portfolio",
    title: "Anthony's Portfolio",
    description: "A professional portfolio website for an auditor, Anthony Njeru.",
    longDescription: "This is a professional portfolio website meticulously crafted for **Anthony Njeru, a distinguished auditor**. The site is designed to elegantly showcase his professional background, expertise, services, and achievements in the auditing field. Built with a focus on clean design and user experience, it provides a compelling online presence for his clients and professional network.",
    website: "https://anthonynjeru.netlify.app/",
    github: "https://github.com/Leon8M/Anthony-Njeru",
    image: projectImages.screen,
    technologies: ["React", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "former-portfolio",
    title: "My Former Portfolio",
    description: "A previous version of my developer portfolio, demonstrating earlier work and design.",
    longDescription: "This project represents an earlier iteration of my personal developer portfolio. It showcases my foundational work and design approach from a previous phase of my career. While no longer my primary portfolio, it serves as a valuable artifact, demonstrating my evolution in web development and design principles over time.",
    website: "https://zealous-desert-0df9b7c10.5.azurestaticapps.net/",
    github: "https://github.com/Leon8M/New-Portfolio",
    image: projectImages.og,
    technologies: ["React", "Tailwind CSS"],
  },
  {
    id: "luminous-solutions",
    title: "Luminous Solutions Website",
    description: "Official company website for Luminous Solutions, providing solar energy systems.",
    longDescription: "This is the official company website for **Luminous Solutions**, a company dedicated to offering reliable and affordable solar solutions. The website highlights their range of solar products and services, catering to various needs from residential to commercial installations. It serves as a key informational hub, outlining their commitment to sustainable energy and providing an accessible platform for potential customers.",
    website: "https://gray-flower-030c17610.4.azurestaticapps.net/",
    github: "https://github.com/Leon8M/Luminous",
    image: projectImages.luminous,
    technologies: ["React", "Tailwind CSS"],
  },
  {
    id: "wellbe",
    title: "WellBe",
    description: "A simple Flask application for managing personal journals and goals.",
    longDescription: "WellBe is a straightforward yet effective Flask application designed to assist users in managing their personal journals and tracking their goals. It offers a clean and intuitive interface for logging daily thoughts, reflections, and progress towards personal objectives, promoting self-awareness and accountability.",
    website: "https://wellbe.onrender.com/",
    github: "https://github.com/Leon8M/WellBe",
    image: projectImages.wellbe,
    technologies: ["Python", "Flask", "JavaScript", "HTML"],
  },
  {
    id: "leads-chrome-addon",
    title: "Leads Chrome Add-on",
    description: "A Chrome browser extension for saving and managing website URLs.",
    longDescription: "Leads is a convenient Chrome browser add-on designed to streamline your web Browse by allowing you to easily save and manage URLs of websites you visit. This tool is perfect for quickly bookmarking interesting articles, resources, or anything you want to revisit later, enhancing productivity and organization.",
    website: "#", // No live website available
    github: "https://github.com/Leon8M/Url-saver-for-chrome",
    image: projectImages.leads,
    technologies: ["JavaScript", "HTML", "jQuery"],
  },
];