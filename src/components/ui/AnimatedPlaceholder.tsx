import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedPlaceholder = ({ placeholders }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 p-2 text-gray-500 pointer-events-none"
    >
      {placeholders[index]}
    </motion.div>
  );
};

export default AnimatedPlaceholder;
