import React from 'react';
import { motion } from 'framer-motion';

interface AppIconProps {
  title: string;
  iconSrc: string;
  onClick: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ title, iconSrc, onClick }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-20 h-20 p-1 cursor-pointer text-white text-xs text-center"
      whileHover={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "8px" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <img src={iconSrc} alt={title} className="w-10 h-10 mb-1" />
      <span>{title}</span>
    </motion.div>
  );
};

export default AppIcon;
