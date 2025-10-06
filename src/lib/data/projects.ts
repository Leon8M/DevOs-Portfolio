import { projectImages } from "./projectImages";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  website?: string;
  github: string;
  image: { src: StaticImageData; alt: string };
  technologies: string[];
  category: string;
}

export const projects: Project[] = [
  {
    id: "kamusi-ai",
    title: "Kamusi AI",
    description:
      "An AI-powered platform for generating and learning from custom courses.",
    longDescription:
      "**Problem:** Creating comprehensive educational content is time-consuming.\n**Solution:** An AI-powered platform that dynamically generates courses with chapters and video resources.\n**Stack:** Next.js, Tailwind CSS, Clerk, Shadcn UI, Google Gemini API.\n**Impact:** Revolutionizes content creation and provides a rich, interactive learning experience.",
    website: "https://kamusi.denexsoftware.co.ke/",
    github: "https://github.com/Leon8M/LearnWithAi",
    image: projectImages.learnai,
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Clerk",
      "Shadcn UI",
      "Google Gemini API",
    ],
    category: "AI",
  },
  {
    id: "python-code-refactor-ai",
    title: "Python Code Refactor AI",
    description:
      "A web application utilizing AI to refactor, explain, or comment on Python code.",
    longDescription:
      "**Problem:** Improving code quality and documentation can be a tedious process.\n**Solution:** A web app that uses AI to refactor, explain, or add comments to Python code.\n**Stack:** Next.js, Tailwind CSS, PrismJS, Google Gemini API.\n**Impact:** Significantly improves code quality, readability, and documentation.",
    website: "https://python-refactor.vercel.app/",
    github: "https://github.com/Leon8M/Python-Refactor",
    image: projectImages.refactor,
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "PrismJS",
      "Google Gemini API",
    ],
    category: "AI",
  },
  {
    id: "xp-portfolio",
    title: "Windows XP Inspired Portfolio (This Site!)",
    description:
      "My current developer portfolio, designed to mimic the nostalgic interface of Windows XP.",
    longDescription:
      "**Problem:** Standard portfolios can be generic and fail to capture attention.\n**Solution:** A unique, interactive portfolio that mimics the Windows XP interface to showcase skills and projects in a memorable way.\n**Stack:** Next.js, Tailwind CSS, Framer Motion, Zustand.\n**Impact:** Creates a distinct and engaging user experience that highlights creativity and technical skills.",
    website: "#",
    github: "https://github.com/Leon8M/portfolio-xp",
    image: projectImages.xpPortfolio,
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
    category: "Web",
  },
  {
    id: "vertical-techniques",
    title: "Vertical Techniques Ltd. Website",
    description:
      "Official company website for Vertical Techniques Ltd, specializing in high-altitude cleaning solutions.",
    longDescription:
      "**Problem:** The company needed a professional online presence to attract clients and showcase their specialized cleaning services.\n**Solution:** A clean, modern website that serves as a digital storefront, highlighting their services, expertise, and commitment to safety.\n**Stack:** React, Tailwind CSS.\n**Impact:** Established a strong online presence, enabling the company to reach a wider audience and generate new business leads.",
    website: "https://www.verticaltechniques.co.ke/",
    github: "https://github.com/Leon8M/Anchored-Heights",
    image: projectImages.anchored,
    technologies: ["React", "Tailwind CSS"],
    category: "Web",
  },
  {
    id: "the-nex-journal",
    title: "The Nex Journal",
    description:
      "A personal blogging platform with a React frontend and Flask backend.",
    longDescription:
      "**Problem:** The need for a personal blogging platform with full content management capabilities.\n**Solution:** A full-stack blogging platform with a React frontend and Flask backend, allowing for CRUD operations, image uploads, and admin authentication.\n**Stack:** React, Python, Flask, Tailwind CSS, PostgreSQL, Azure, Render.\n**Impact:** Provides a robust and scalable platform for personal blogging, with a seamless content management experience.",
    website: "https://blog-9k5.pages.dev/",
    github: "https://github.com/Leon8M/Blog",
    image: projectImages.blog,
    technologies: [
      "React",
      "Python",
      "Flask",
      "Tailwind CSS",
      "PostgreSQL",
      "Azure",
      "Render",
    ],
    category: "Full-Stack",
  },
  {
    id: "linkedlist-api",
    title: "LinkedList API",
    description:
      "A web application demonstrating a LinkedList implementation with a Rust backend.",
    longDescription:
      "**Problem:** The need to demonstrate a strong understanding of data structures and backend development.\n**Solution:** A web application that visualizes a LinkedList data structure, with a high-performance backend built in Rust.\n**Stack:** Rust, React, Tailwind CSS.\n**Impact:** Showcases expertise in both backend development and data structures, with a clear and interactive frontend.",
    website:
      "https://github.com/Leon8M/LinkedList-API/blob/main/README.md",
    github: "https://github.com/Leon8M/LinkedList-API",
    image: projectImages.linked,
    technologies: ["Rust", "React", "Tailwind CSS"],
    category: "Full-Stack",
  },
  {
    id: "me-manager",
    title: "Me Manager",
    description:
      "An intuitive personal management application for finances, tasks, and more.",
    longDescription:
      "**Problem:** The need for a simple tool to manage personal finances, tasks, and other responsibilities.\n**Solution:** An intuitive personal management application that streamlines daily organization.\n**Stack:** React, Flask, Python, Tailwind CSS.\n**Impact:** Enhances productivity and organization by providing a single, cohesive platform for managing personal tasks and finances.",
    website: "https://me-manager.vercel.app/",
    github: "https://github.com/Leon8M/Me-Manager",
    image: projectImages.money,
    technologies: ["React", "Flask", "Python", "Tailwind CSS"],
    category: "Full-Stack",
  },
  {
    id: "peer-learn",
    title: "Peer-Learn",
    description:
      "A peer-to-peer learning platform designed for university students.",
    longDescription:
      "**Problem:** University students often struggle to find peers for collaborative learning and study groups.\n**Solution:** A peer-to-peer learning platform that connects students for academic collaboration.\n**Stack:** React, Flask, Python, Tailwind CSS.\n**Impact:** Fosters a supportive academic environment and leverages the collective intelligence of the student community.",
    website: "https://eeba3d15.e-learning-74b.pages.dev/",
    github: "https://github.com/Leon8M/E-learning",
    image: projectImages.peer,
    technologies: ["React", "Flask", "Python", "Tailwind CSS"],
    category: "Full-Stack",
  },
  {
    id: "anthony-portfolio",
    title: "Anthony's Portfolio",
    description:
      "A professional portfolio website for an auditor, Anthony Njeru.",
    longDescription:
      "**Problem:** An auditor needed a professional website to showcase his expertise and services.\n**Solution:** A clean, elegant portfolio website that highlights his professional background and achievements.\n**Stack:** React, Tailwind CSS, TypeScript.\n**Impact:** Provides a compelling online presence for clients and a professional network.",
    website: "https://anthonynjeru.netlify.app/",
    github: "https://github.com/Leon8M/Anthony-Njeru",
    image: projectImages.screen,
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    category: "Web",
  },
  {
    id: "former-portfolio",
    title: "My Former Portfolio",
    description:
      "A previous version of my developer portfolio, demonstrating earlier work and design.",
    longDescription:
      "This project represents an earlier iteration of my personal developer portfolio. It showcases my foundational work and design approach from a previous phase of my career. While no longer my primary portfolio, it serves as a valuable artifact, demonstrating my evolution in web development and design principles over time.",
    website: "https://zealous-desert-0df9b7c10.5.azurestaticapps.net/",
    github: "https://github.com/Leon8M/New-Portfolio",
    image: projectImages.og,
    technologies: ["React", "Tailwind CSS"],
    category: "Web",
  },
  {
    id: "luminous-solutions",
    title: "Luminous Solutions Website",
    description:
      "Official company website for Luminous Solutions, providing solar energy systems.",
    longDescription:
      "This is the official company website for **Luminous Solutions**, a company dedicated to offering reliable and affordable solar solutions. The website highlights their range of solar products and services, catering to various needs from residential to commercial installations. It serves as a key informational hub, outlining their commitment to sustainable energy and providing an accessible platform for potential customers.",
    website: "https://gray-flower-030c17610.4.azurestaticapps.net/",
    github: "https://github.com/Leon8M/Luminous",
    image: projectImages.luminous,
    technologies: ["React", "Tailwind CSS"],
    category: "Web",
  },
  {
    id: "wellbe",
    title: "WellBe",
    description:
      "A simple Flask application for managing personal journals and goals.",
    longDescription:
      "WellBe is a straightforward yet effective Flask application designed to assist users in managing their personal journals and tracking their goals. It offers a clean and intuitive interface for logging daily thoughts, reflections, and progress towards personal objectives, promoting self-awareness and accountability.",
    website: "https://wellbe.onrender.com/",
    github: "https://github.com/Leon8M/WellBe",
    image: projectImages.wellbe,
    technologies: ["Python", "Flask", "JavaScript", "HTML"],
    category: "Full-Stack",
  },
  {
    id: "leads-chrome-addon",
    title: "Leads Chrome Add-on",
    description:
      "A Chrome browser extension for saving and managing website URLs.",
    longDescription:
      "Leads is a convenient Chrome browser add-on designed to streamline your web browsing by allowing you to easily save and manage URLs of websites you visit. This tool is perfect for quickly bookmarking interesting articles, resources, or anything you want to revisit later, enhancing productivity and organization.",
    website: "#",
    github: "https://github.com/Leon8M/Url-saver-for-chrome",
    image: projectImages.leads,
    technologies: ["JavaScript", "HTML", "jQuery"],
    category: "Web",
  },
];
