import React from 'react';
import { motion } from 'framer-motion';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative flex items-center">
      {children}
      <motion.div
        className="absolute left-full ml-2 w-max p-2 bg-black text-white text-xs rounded-md shadow-lg"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default Tooltip;
