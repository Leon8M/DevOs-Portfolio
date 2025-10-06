import React, { useState } from 'react';
import { projects } from '@/lib/data/projects';
import { useWindowStore } from '@/lib/store/windowStore'; 
import ProjectDetailWindow from './ProjectDetailWindow'; 
import Image from "next/image";

const Projects: React.FC = () => {
  const { addWindow } = useWindowStore();
  const [filter, setFilter] = useState('All');

  // Function to open a project detail window
  const openProjectDetail = (project: typeof projects[0]) => { // Added type for project
    addWindow(
      `project-${project.id}`,
      `${project.title} - Details`,
      <ProjectDetailWindow project={project} />
    );
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <div className="p-3 md:p-5 w-full h-full overflow-y-auto bg-[#ECE9D8] text-sm font-['Tahoma',_Geneva,_sans-serif] xp-scrollbar">
      {/* Main Title - Enhanced with XP text shadow */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#003B7C] xp-text-shadow border-b border-gray-400 pb-2">
        My Projects
      </h2>

      <div className="flex justify-center mb-4">
        <div className="flex space-x-2 p-1 bg-gray-200 rounded-md">
          <button onClick={() => setFilter('All')} className={`px-3 py-1 text-xs font-semibold rounded-md ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>All</button>
          <button onClick={() => setFilter('Web')} className={`px-3 py-1 text-xs font-semibold rounded-md ${filter === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Web</button>
          <button onClick={() => setFilter('AI')} className={`px-3 py-1 text-xs font-semibold rounded-md ${filter === 'AI' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>AI</button>
          <button onClick={() => setFilter('Full-Stack')} className={`px-3 py-1 text-xs font-semibold rounded-md ${filter === 'Full-Stack' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Full-Stack</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap for visual separation */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => openProjectDetail(project)}
            className="
              bg-white 
              p-1 /* Added padding for inner content to avoid touching borders */
              xp-card-outset /* Custom XP outset border and shadow */
              rounded-sm 
              cursor-pointer 
              transform 
              transition-all duration-100 
              hover:translate-y-[-1px] hover:shadow-md /* Subtle lift and shadow on hover */
              active:translate-y-[0.5px] active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] /* Press effect on click */
            "
          >
            {/* Image Container - fixed aspect ratio and XP border */}
            <div className="w-full relative pt-[56.25%] mb-2 border xp-image-frame bg-gray-200"> {/* 16:9 aspect ratio, gray background fallback */}
              <Image
                src={project.image.src.src} /* Assuming project.image.src.src is the correct path */
                alt={project.image.alt}
                className="absolute top-0 left-0 w-full h-full object-cover" /* Ensure image covers the div */
                width={640}
                height={360}
                loading="lazy"
              />
            </div>

            <div className="p-2"> {/* Inner padding for content */}
              <h3 className="text-lg font-bold text-[#2F4F4F] mb-1 xp-text-shadow">{project.title}</h3>
              <p className="text-gray-700 text-sm mt-1 line-clamp-3 leading-relaxed">{project.description}</p> {/* Adjusted line-clamp, added leading-relaxed */}

              <div className="flex flex-wrap gap-1 mt-3 mb-3"> {/* Adjusted margin for spacing */}
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="
                      bg-[#D4D0C8] text-black text-xs px-2 py-0.5 
                      border border-gray-500 rounded-sm shadow-sm 
                      font-medium whitespace-nowrap /* Ensure tags don't break easily */
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-300"> {/* Use flex-wrap for links, added border-t */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} /* Prevent card click when clicking link */
                    className="xp-card-link-button"
                  >
                    <Image src="/xp-icons/github-icon.png" alt="GitHub" className="w-3 h-3" width={12} height={12} loading="lazy" /> {/* Add icon */}
                    GitHub
                  </a>
                )}
                {project.website && project.website !== '#' && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} /* Prevent card click when clicking link */
                    className="xp-card-link-button"
                  >
                    <Image src="/xp-icons/website-icon.png" alt="Live Demo" className="w-3 h-3" width={12} height={12} loading="lazy" /> {/* Add icon */}
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;