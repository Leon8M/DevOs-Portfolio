import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { experience } from '@/lib/data/experience'; // Updated data import
import SectionHeader from '@/components/common/SectionHeader'; // Assuming common SectionHeader

const Experience: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  return (
    <motion.div
      className="p-3 md:p-5 w-full h-full overflow-y-auto bg-[#ECE9D8] text-sm font-['Tahoma',_Geneva,_sans-serif] xp-scrollbar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#003B7C] xp-text-shadow border-b border-gray-400 pb-2">
        Work Experience
      </h2>

      <div className="space-y-4">
        {experience.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white p-4 rounded-sm shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] border xp-panel-border-inset flex items-start gap-3"
            variants={itemVariants}
          >
            <img src={item.icon} alt={item.company} className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-[#2F4F4F]">{item.role} at {item.company}</h3>
              <p className="text-gray-600 text-xs italic mb-1">{item.duration}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{item.summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;