import React from 'react';

const TechStack: React.FC = () => {
  const systemInfo = {
    os: "LeonOS Portfolio Edition",
    version: "1.0 (Build 2024)",
    user: "Recruiter / Visitor",
  };

  const techSpecs = [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Next.js (App Router)', 'Framer Motion', 'React Three Fiber'],
    },
    {
      category: 'Styling',
      items: ['Tailwind CSS', 'ShadCN/UI', 'Custom Windows XP CSS'],
    },
    {
      category: 'State Management',
      items: ['Zustand', 'React Context'],
    },
    {
      category: 'Deployment & Platform',
      items: ['Vercel'],
    },
    {
      category: 'Tooling & Build',
      items: ['ESLint', 'Prettier', 'PostCSS', 'Webpack (via Next.js)'],
    },
    {
      category: 'Design System',
      items: ['Windows XP Theme', 'Retro UI Components'],
    },
  ];

  return (
    <div className="p-1 bg-[#ECE9D8] font-['Tahoma',_sans-serif] text-xs">
      <div className="border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-4">
        <h2 className="text-lg font-bold mb-4">System Properties</h2>

        <div className="bg-white p-3 border border-gray-400 shadow-inner">
          <div className="mb-4">
            <h3 className="font-bold border-b mb-2 pb-1">System:</h3>
            <p>{systemInfo.os}</p>
            <p>Version {systemInfo.version}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold border-b mb-2 pb-1">Registered to:</h3>
            <p>{systemInfo.user}</p>
          </div>

          <div>
            <h3 className="font-bold border-b mb-2 pb-1">Computer / Tech Stack:</h3>
            {techSpecs.map((spec) => (
              <div key={spec.category} className="flex mb-1">
                <p className="w-1/3 font-semibold">{spec.category}:</p>
                <p className="w-2/3">{spec.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="px-6 py-1 border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080] bg-[#ECE9D8] hover:bg-gray-200">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
