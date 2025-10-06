"use client"; 

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [showWelcomeText, setShowWelcomeText] = useState(false);

  useEffect(() => {
    // Show "Welcome" text after a short delay
    const textTimer = setTimeout(() => {
      setShowWelcomeText(true);
    }, 1000); // Text appears after 1 second

    // Transition to the desktop after the full animation duration
    const transitionTimer = setTimeout(() => {
      onComplete(); // Call the prop function to signal completion
    }, 4000); // Total animation duration: 4 seconds

    // Cleanup timers if the component unmounts prematurely
    return () => {
      clearTimeout(textTimer);
      clearTimeout(transitionTimer);
    };
  }, [onComplete]); // Re-run effect if onComplete function changes

  return (
    <motion.div
      // Full-screen container with XP Blue background, matching your image
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#3A6FCD] text-white"
      initial={{ opacity: 1 }} // Start fully opaque
      exit={{ opacity: 0 }}   // Fade out when removed from the DOM
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth fade-out transition
    >
      {/* Windows Logo with a continuous spin animation */}
      <motion.img
        src="/xp-icons/start-icon.svg" // Path to your start-icon.svg (Windows logo)
        alt="Windows Logo"
        className="w-24 h-24 mb-4 filter brightness-125" // Adjust size, brightness to enhance visibility
        animate={{ rotate: 360 }} // Rotate 360 degrees
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }} // Infinite loop, 2s per rotation
      />

      {/* "Welcome" Text with fade-in animation */}
      {showWelcomeText && (
        <motion.div
          className="text-lg md:text-xl font-bold xp-text-shadow" // Larger, bold text with XP shadow
          initial={{ opacity: 0, y: 20 }} // Start invisible, slightly below
          animate={{ opacity: 1, y: 0 }}  // Fade in, move up to position
          transition={{ duration: 0.5 }}  // Smooth transition
        >
          Welcome
        </motion.div>
      )}

      {/* Tagline */}
      {showWelcomeText && (
        <motion.div
          className="text-sm md:text-base text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          I build clean, creative, and technically ambitious web experiences — meet LeonOS.
        </motion.div>
      )}

      {/* Optional: Subtle "Please wait..." text at the bottom */}
      <motion.div
        className="absolute bottom-10 w-full text-center text-xs text-white opacity-70"
        initial={{ opacity: 0 }} // Start invisible
        animate={{ opacity: 0.7 }} // Fade in slightly transparent
        transition={{ delay: 3, duration: 0.5 }} // Appears later in the animation
      >
        Please wait...
      </motion.div>
    </motion.div>
  );
};

export default WelcomeAnimation;