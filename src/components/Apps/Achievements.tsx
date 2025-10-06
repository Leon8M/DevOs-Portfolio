import React from 'react';

const Achievements: React.FC = () => {
  const metrics = [
    { label: 'Projects Completed', value: 15 },
    { label: 'APIs Developed', value: 5 },
    { label: 'Lines of Code', value: '50,000+' },
  ];

  return (
    <div className="p-4 bg-[#ECE9D8] font-['Tahoma',_sans-serif] text-sm">
      <h2 className="text-lg font-bold mb-4">Achievements</h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-4 border border-gray-400 shadow-inner rounded-sm">
            <p className="text-2xl font-bold text-[#003B7C]">{metric.value}</p>
            <p className="text-xs text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
