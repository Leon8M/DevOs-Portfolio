import React from 'react';
import { motion } from 'framer-motion'; // For subtle button animations

const MyResume: React.FC = () => {
  return (
    <div className="p-3 md:p-5 w-full h-full overflow-y-auto bg-[#ECE9D8] text-sm font-['Tahoma',_Geneva,_sans-serif] xp-scrollbar">
      {/* Main Title - Enhanced with XP text shadow */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#003B7C] xp-text-shadow border-b border-gray-400 pb-2">
        My Resume
      </h2>

      <div className="bg-white p-5 rounded-sm border xp-panel-border-inset"> {/* Applied xp-panel-border-inset */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#003B7C] xp-text-shadow">Leon Munene</h1>
          <p className="text-gray-700 text-base">Software Engineer | Full-Stack Developer</p>
        </div>

        <div className="mb-6 xp-panel-border-inset p-3 bg-[#D4D0C8]"> {/* Summary in an inset panel */}
          <h3 className="font-bold text-[#003B7C] mb-2 xp-text-shadow">Summary</h3>
          <p className="text-gray-800 leading-relaxed">
            Passionate software developer skilled in Python, React, NextJs, Flask, and Rust, building scalable, user-friendly solutions. With strong
            problem-solving skills, I deliver clean, optimized code for robust applications. I also mentor peers as a Microsoft Student Ambassador
            and Community Tech Lead. Constantly learning, I thrive in dynamic environments, open to learning new technology. Let’s collaborate
            to bring ideas to life!
          </p>
        </div>

        {/* You can integrate your Experience and Education components here if you wish, e.g.:
        <div className="mb-6">
          <Experience />
        </div>
        <div className="mb-6">
          <Education />
        </div>
        */}

        <div className="text-center mt-8">
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