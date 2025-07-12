'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Resume data
const resumeData = {
  name: "Leon M. Njeru",
  title: "FULL-STACK DEVELOPER",
  contact: {
    phone: "+254759604380",
    email: "leonmunene254@gmail.com",
  },
  summary: `
    Hello! I'm Leon, a passionate software developer with a knack for building engaging and efficient web applications.
    My journey in tech started with a curiosity for how things work, which quickly evolved into a love for creating.
    
    Beyond the code, I'm an avid gamer who enjoys diving into virtual worlds and an enthusiastic music lover.
    I believe in continuous learning, constantly striving to improve my skills and explore new technologies.
    I thrive in dynamic environments and am always open to new challenges.
    Let's connect and create something amazing!
  `,
};

// Section header component
const SectionHeader: React.FC<{ title: string; iconSrc: string }> = ({ title, iconSrc }) => (
  <div className="flex items-center bg-gradient-to-b from-[#084ac1] via-[#1c64d1] to-[#2575e9] px-3 py-1 mb-3 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] border-t border-l border-white border-b-[#245DCF] border-r-[#245DCF]">
    <Image src={iconSrc} alt={title} width={20} height={20} className="mr-2 brightness-125" />
    <h3 className="text-sm font-bold text-white xp-text-shadow">{title}</h3>
  </div>
);

const AboutMe: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.div
      className="p-4 md:p-6 w-full h-full overflow-y-auto bg-[#D6D6D6] text-sm font-['Tahoma',_Geneva,_sans-serif] xp-scrollbar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#2F4F4F] xp-text-shadow border-b border-gray-400 pb-2">
        About Leon M. Njeru
      </h2>

      <motion.div
        className="bg-white p-4 mb-6 flex flex-col md:flex-row items-center rounded-sm shadow-[2px_2px_5px_rgba(0,0,0,0.4)] border xp-panel-border"
        variants={itemVariants}
      >
        <Image
          src="/xp-icons/user-avatar.jpg"
          alt="Leon M. Njeru"
          width={128}
          height={128}
          className="rounded-full mx-auto md:mx-0 md:mr-6 mb-4 md:mb-0 border-2 border-[#3D85E5] object-cover shadow-md"
        />
        <div className="text-center md:text-left flex-1">
          <h3 className="text-lg md:text-xl font-bold text-[#245DCF] mb-1">{resumeData.name}</h3>
          <p className="text-base text-[#2F4F4F] mb-1">{resumeData.title}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs mt-2">
            <span className="flex items-center gap-1 text-gray-700">
              <Image src="/xp-icons/phone-icon.png" alt="Phone" width={12} height={12} />
              {resumeData.contact.phone}
            </span>
            <a href={`mailto:${resumeData.contact.email}`} className="flex items-center gap-1 text-blue-700 hover:underline">
              <Image src="/xp-icons/contact-me-icon.png" alt="Email" width={12} height={12} />
              {resumeData.contact.email}
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mb-6 bg-white p-4 rounded-sm shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] border xp-panel-border-inset"
        variants={itemVariants}
      >
        <SectionHeader title="A Bit About Me" iconSrc="/xp-icons/info-icon.png" />
        <p className="text-gray-800 text-justify leading-relaxed">{resumeData.summary}</p>
      </motion.div>

      <motion.div className="text-center p-4 bg-white rounded-sm shadow-[2px_2px_5px_rgba(0,0,0,0.4)] border xp-panel-border" variants={itemVariants}>
        <p className="text-gray-800 text-base">
          For professional details or to connect, please refer to the dedicated applications in the Start Menu.
        </p>
        <p className="text-gray-800 text-base mt-2">You can reach me directly via:</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href={`mailto:${resumeData.contact.email}`} className="text-blue-700 hover:underline flex items-center gap-1">
            <Image src="/xp-icons/contact-me-icon.png" alt="Email" width={16} height={16} /> Email
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
