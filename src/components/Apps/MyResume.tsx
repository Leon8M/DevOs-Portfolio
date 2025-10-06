import React from 'react';
import { motion } from 'framer-motion'; // For subtle button animations

const MyResume: React.FC = () => {
  return (
    <div className="p-3 md:p-5 w-full h-full overflow-y-auto bg-[#ECE9D8] text-sm font-['Tahoma',_Geneva,_sans-serif] xp-scrollbar">
      {/* Main Title - Enhanced with XP text shadow */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#003B7C] xp-text-shadow border-b border-gray-400 pb-2">
        My Resume
      </h2>

      <div className="bg-white p-5 rounded-sm border xp-panel-border-inset h-full flex flex-col"> {/* Applied xp-panel-border-inset */}
        <div className="text-center mb-6 flex-shrink-0">
          <h1 className="text-2xl font-bold text-[#003B7C] xp-text-shadow">Leon Munene</h1>
          <p className="text-gray-700 text-base">Software Engineer | Full-Stack Developer</p>
        </div>

        <div className="flex-grow mb-6">
          <iframe src="/resume.pdf" width="100%" height="100%" />
        </div>

        <div className="text-center mt-8 flex-shrink-0">
          <motion.a
            href="/resume.pdf" // Ensure this path is correct
            download="Leon_Munene_Resume.pdf" // This suggests the default filename for the download
            className="xp-download-button" // Applied the new XP button class
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src="/xp-icons/download-icon.png" alt="Download" className="w-4 h-4" />
            Download Full Resume (PDF)
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default MyResume;