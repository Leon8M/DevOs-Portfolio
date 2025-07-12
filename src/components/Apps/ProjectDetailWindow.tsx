import React from 'react';
import { Project } from '@/lib/data/projects';
import Image from "next/image";

interface ProjectDetailWindowProps {
  project: Project;
}

const ProjectDetailWindow: React.FC<ProjectDetailWindowProps> = ({ project }) => {
  return (
    <div className="p-4 h-full overflow-y-auto font-xp bg-[#ECE9D8] custom-scrollbar-devshell text-sm">
      {/* Project Image */}
      <div className="text-center mb-4">
        <Image
          src={project.image.src.src}
          alt={project.image.alt}
          className="mx-auto max-w-full max-h-64 object-contain border border-gray-400 shadow-inner bg-white p-1"
          width={640}
          height={360}
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold mb-2 text-[#003B7C] border-b border-gray-400 pb-1">{project.title}</h2>

      {/* Description */}
      <p className="text-gray-800 whitespace-pre-line mb-4">
        {project.longDescription || project.description}
      </p>

      {/* Tech Stack */}
      <div className="mb-4">
        <h3 className="font-bold text-[#2F4F4F] mb-2">Technologies Used:</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-[#D4D0C8] border border-gray-500 text-black text-xs px-2 py-0.5 rounded-sm shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mt-6 pt-3 border-t border-gray-400">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-800 hover:underline"
          >
            <img src="/xp-icons/github-icon.png" alt="GitHub" className="w-4 h-4" />
            View on GitHub
          </a>
        )}
        {project.website && project.website !== '#' && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-800 hover:underline"
          >
            <img src="/xp-icons/website-icon.png" alt="Live Demo" className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailWindow;
