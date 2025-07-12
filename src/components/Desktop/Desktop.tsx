"use client"
import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Window from '@/components/Window/Window'; // Assuming this is your Window component
import StartMenu from './StartMenu';
import AppIcon from './AppIcon';
import { useWindowStore } from '@/lib/store/windowStore';

// Import your application components
import Projects from '@/components/Apps/Projects';
import Experience from '@/components/Apps/Experience';
import Education from '@/components/Apps/Education';
import Skills from '@/components/Apps/Skills';
import AboutMe from '@/components/Apps/AboutMe';
import ContactMe from '@/components/Apps/ContactMe';
import Calculator from '@/components/Apps/Calculator';
import Calendar from '@/components/Apps/Calendar';
import DevShell from '@/components/Apps/DevShell';

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const { windows, addWindow } = useWindowStore();
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const toggleStartMenu = () => {
    setStartMenuOpen((prev) => !prev);
  };

  // Helper to generate a staggered position for new windows
  const getStaggeredPosition = (index: number) => ({
    x: 50 + (index * 15),
    y: 50 + (index * 15),
  });

  // Keep track of how many times each app type has been opened
  // This helps in giving unique IDs and better staggered positions for multiple instances of the same app
  const [openAppCounts, setOpenAppCounts] = useState<Record<string, number>>({});

  const handleAppIconClick = (appName: string, title: string, component: React.ReactNode, iconSrc: string, defaultSize: {width: string | number, height: string | number}) => {
    const currentCount = (openAppCounts[appName] || 0) + 1;
    setOpenAppCounts(prev => ({ ...prev, [appName]: currentCount }));

    const uniqueId = `${appName}-${Date.now()}`; // More robust unique ID
    const staggeredPosition = getStaggeredPosition(currentCount);

    addWindow(
      uniqueId,
      title,
      component,
      staggeredPosition, // Initial position
      defaultSize,      // Initial size
      iconSrc           // The icon path for the taskbar
    );
  };


  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-[url('/wallpaper.jpg')] bg-cover bg-center"
      style={{ backgroundSize: 'cover' }}
    >
      {children}

      <div className="absolute top-4 left-4 flex flex-col space-y-4">
        <AppIcon
          title="About Me"
          iconSrc="/xp-icons/about-me-icon.png"
          onClick={() => handleAppIconClick(
            'about-me',
            "About Me",
            <AboutMe />,
            "/xp-icons/about-me-icon.png",
            { width: 450, height: 300 }
          )}
        />
        <AppIcon
          title="Skills"
          iconSrc="/xp-icons/skills-icon.png"
          onClick={() => handleAppIconClick(
            'skills',
            "Skills",
            <Skills />,
            "/xp-icons/skills-icon.png",
            { width: 500, height: 350 }
          )}
        />
        <AppIcon
          title="My Projects"
          iconSrc="/xp-icons/projects-icon.png"
          onClick={() => handleAppIconClick(
            'projects',
            "My Projects",
            <Projects />,
            "/xp-icons/projects-icon.png",
            { width: 800, height: 500 }
          )}
        />
        <AppIcon
          title="Experience"
          iconSrc="/xp-icons/experience-icon.png"
          onClick={() => handleAppIconClick(
            'experience',
            "Experience",
            <Experience />,
            "/xp-icons/experience-icon.png",
            { width: 700, height: 450 }
          )}
        />
        <AppIcon
          title="Education"
          iconSrc="/xp-icons/education-icon.png"
          onClick={() => handleAppIconClick(
            'education',
            "Education",
            <Education />,
            "/xp-icons/education-icon.png",
            { width: 600, height: 400 }
          )}
        />
        
        
        <AppIcon
          title="Contact Me"
          iconSrc="/xp-icons/contact-me-icon.png"
          onClick={() => handleAppIconClick(
            'contact-me',
            "Contact Me",
            <ContactMe />,
            "/xp-icons/contact-me-icon.png",
            { width: 400, height: 380 }
          )}
        />
        
      </div>

      {/* Render open windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          initialPosition={win.position} // Pass position from store
          initialSize={win.size}       // Pass size from store
          isMinimized={win.minimized}
          isFocused={win.focused}
          zIndex={win.zIndex}
          icon={win.icon} // <--- Pass the icon from the store to the Window component itself!
        >
          {win.content}
        </Window>
      ))}

      <StartMenu isOpen={startMenuOpen} onClose={toggleStartMenu} />
      <Taskbar onStartButtonClick={toggleStartMenu} />
    </div>
  );
};

export default Desktop;