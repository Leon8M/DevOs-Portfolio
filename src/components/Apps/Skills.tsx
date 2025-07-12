import React from 'react';
import { skills } from '@/lib/data/skills';

const Skills: React.FC = () => {
  return (
    <div className="p-4 bg-[#ECE9D8] font-xp text-sm">
      <h2 className="text-lg font-bold mb-4 border-b border-gray-400 pb-2 text-[#003B7C]">Skills</h2>

      <div className="space-y-4">
        {skills.map((category) => (
          <div
            key={category.category}
            className="bg-white p-4 border border-gray-400 shadow-inner rounded-sm"
          >
            <h3 className="text-md font-bold text-[#003B7C] mb-2">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-semibold text-black bg-[#D4D0C8] border border-gray-500 rounded-sm shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
