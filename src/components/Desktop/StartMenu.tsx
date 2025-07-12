import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/lib/store/windowStore';
import Image from "next/image";

// Import your existing app components
import Projects from '@/components/Apps/Projects';
import AboutMe from '@/components/Apps/AboutMe';
import ContactMe from '@/components/Apps/ContactMe';
import Calculator from '@/components/Apps/Calculator';
import Calendar from '@/components/Apps/Calendar';
import DevShell from '@/components/Apps/DevShell';
import Experience from '@/components/Apps/Experience';
import Education from '@/components/Apps/Education';
import Skills from '@/components/Apps/Skills';

// Import the new components we just created
import MyResume from '@/components/Apps/MyResume';
import TechStack from '@/components/Apps/TechStack';
import ThemeSettings from '@/components/Apps/ThemeSettings';
import ContactSocials from '@/components/Apps/ContactSocials';


// Define the type for our app items
type AppItem = {
    label: string;
    icon: string;
    component: React.ReactNode;
    isFeatured?: boolean;
    defaultSize?: { width: string | number; height: string | number }; // <--- NEW: Add default size
};

// --- App Definitions ---
const mainApps: AppItem[] = [
    { label: 'My Projects', icon: '/xp-icons/projects-icon.png', component: <Projects />, isFeatured: true, defaultSize: { width: 800, height: 500 } },
    { label: 'Experience', icon: '/xp-icons/experience-icon.png', component: <Experience />, isFeatured: true, defaultSize: { width: 700, height: 450 } },
    { label: 'Education', icon: '/xp-icons/education-icon.png', component: <Education />, defaultSize: { width: 600, height: 400 } },
    { label: 'Skills', icon: '/xp-icons/skills-icon.png', component: <Skills />, defaultSize: { width: 500, height: 350 } },
    { label: 'About Me', icon: '/xp-icons/about-me-icon.png', component: <AboutMe />, defaultSize: { width: 450, height: 300 } },
];

const utilityApps: AppItem[] = [
    { label: 'Contact Me', icon: '/xp-icons/contact-me-icon.png', component: <ContactMe />, defaultSize: { width: 400, height: 380 } },
    { label: 'Calculator', icon: '/xp-icons/calculator-icon.png', component: <Calculator />, defaultSize: { width: 280, height: 380 } },
    { label: 'Calendar', icon: '/xp-icons/calendar-icon.png', component: <Calendar />, defaultSize: { width: 320, height: 480 } },
    { label: 'DevShell', icon: '/xp-icons/terminal-icon.png', component: <DevShell />, defaultSize: { width: 600, height: 400 } },
];

// --- System links for the right panel ---
const systemLinks: AppItem[] = [
    { label: 'My Resume', icon: '/xp-icons/my-documents-icon.png', component: <MyResume />, isFeatured: true, defaultSize: { width: 700, height: 550 } },
    { label: 'Tech Stack', icon: '/xp-icons/my-computer-icon.png', component: <TechStack />, isFeatured: true, defaultSize: { width: 600, height: 450 } },
];

const settingsLinks: AppItem[] = [
    { label: 'Theme Settings', icon: '/xp-icons/control-panel-icon.png', component: <ThemeSettings />, defaultSize: { width: 400, height: 300 } },
    { label: 'Contact & Socials', icon: '/xp-icons/program-access-icon.png', component: <ContactSocials />, defaultSize: { width: 450, height: 350 } },
];


// --- Helper Components for Styling ---
const MenuItem = ({ item, onClick }: { item: AppItem; onClick: () => void; }) => (
    <li
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#316ac5] hover:text-white cursor-pointer transition-colors duration-150"
    >
        <Image src={item.icon} alt={item.label} className={item.isFeatured ? "w-8 h-8" : "w-6 h-6"} width={32} height={32} loading="lazy" />
        <span className={item.isFeatured ? "font-bold" : ""}>{item.label}</span>
    </li>
);

const Separator = () => <div className="my-1 border-t border-[#a3b3c5]"></div>;


// --- Main Start Menu Component ---
const StartMenu: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { addWindow } = useWindowStore();

    // State to help with staggered positioning of new windows
    const [startMenuAppLaunchCount, setStartMenuAppLaunchCount] = useState<Record<string, number>>({});

    // Function to get a staggered position for new windows
    const getStaggeredPosition = (appName: string) => {
        const currentCount = (startMenuAppLaunchCount[appName] || 0) + 1;
        setStartMenuAppLaunchCount(prev => ({ ...prev, [appName]: currentCount }));
        // Start new windows slightly to the right/down from a base position
        return {
            x: 150 + (currentCount * 15),
            y: 100 + (currentCount * 15),
        };
    };

    // Handle opening an app from the menu
    const handleMenuItemClick = (item: AppItem) => {
       
        const uniqueId = `${item.label.replace(/\s/g, '-')}-${Date.now()}`;
        const staggeredPosition = getStaggeredPosition(item.label);

        addWindow(
            uniqueId, 
            item.label, 
            item.component, 
            staggeredPosition, 
            item.defaultSize || { width: 600, height: 400 }, 
            item.icon
        );
        onClose(); // Close the start menu after opening an app
    };

    const handleShutdown = () => {
  const screen = document.createElement("div");
  screen.style.position = "fixed";
  screen.style.top = "0";
  screen.style.left = "0";
  screen.style.width = "100vw";
  screen.style.height = "100vh";
  screen.style.backgroundColor = "black";
  screen.style.color = "lime";
  screen.style.fontFamily = "monospace";
  screen.style.fontSize = "20px";
  screen.style.zIndex = "9999";
  screen.style.display = "flex";
  screen.style.flexDirection = "column";
  screen.style.alignItems = "center";
  screen.style.justifyContent = "center";
  screen.innerHTML = `
    <div>Shutting down...</div>
    <div class="blink">🛑 System has been overloaded by creativity</div>
    <div>Tap anywhere or press any key to reboot.</div>
  `;
  document.body.appendChild(screen);

  const blink = document.createElement("style");
  blink.innerHTML = `
    .blink {
      animation: blink 1s step-start infinite;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(blink);

  // Cleanup handler
  const removeScreen = () => {
    if (document.body.contains(screen)) document.body.removeChild(screen);
    if (document.head.contains(blink)) document.head.removeChild(blink);
    document.removeEventListener("keydown", removeScreen);
    document.removeEventListener("click", removeScreen);
  };

  // Add both event listeners
  document.addEventListener("keydown", removeScreen, { once: true });
  document.addEventListener("click", removeScreen, { once: true });
};



    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-10 left-1 w-[380px] h-[500px] bg-[#d6d6d6] border-t border-l border-r border-[#0000008a] rounded-t-lg shadow-2xl flex flex-col font-['Tahoma',_sans-serif] text-sm text-black"
            style={{ boxShadow: '5px 5px 15px rgba(0,0,0,0.4)' }}
        >
            {/* Header */}
            <header className="flex items-center gap-3 p-2 bg-gradient-to-b from-[#084ac1] via-[#1c64d1] to-[#2575e9]">
                <div className="w-12 h-12 bg-white border border-gray-300 rounded-sm flex items-center justify-center">
                    <Image src="/xp-icons/user-avatar.jpg" alt="User" className="w-11 h-11" width={44} height={44} loading="lazy" />
                </div>
                <span className="font-bold text-white text-lg shadow-black/50 [text-shadow:_1px_1px_2px_var(--tw-shadow-color)]">
                    Leon Munene
                </span>
            </header>

            {/* Main Content (Two Columns) */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel (White) */}
                <div className="w-1/2 bg-white flex flex-col pt-1.5">
                    <ul className="flex-1">
                        {mainApps.map(app => (
                            <MenuItem key={app.label} item={app} onClick={() => handleMenuItemClick(app)} />
                        ))}
                        <Separator />
                        {utilityApps.map(app => (
                            <MenuItem key={app.label} item={app} onClick={() => handleMenuItemClick(app)} />
                        ))}
                    </ul>

                </div>

                {/* Right Panel (Light Gray) */}
                <div className="w-1/2 bg-[#d6e5f7] flex flex-col pt-1.5">
                    <ul>
                        {systemLinks.map(app => (
                            <MenuItem key={app.label} item={app} onClick={() => handleMenuItemClick(app)} />
                        ))}
                        <Separator />
                        {settingsLinks.map(app => (
                            <MenuItem key={app.label} item={app} onClick={() => handleMenuItemClick(app)} />
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <footer className="flex justify-end items-center gap-4 p-2 bg-gradient-to-b from-[#084ac1] via-[#1c64d1] to-[#2575e9] border-t border-white/50">
                <button onClick={onClose} className="flex items-center gap-1.5 text-white">
                    <Image src="/xp-icons/logout-icon.png" alt="Log Off" className="w-5 h-5" width={20} height={20} loading="lazy" />
                    <span className="font-semibold text-shadow-sm">Log Off</span>
                </button>
                <button onClick={handleShutdown} className="flex items-center gap-1.5 text-white">
                    <Image src="/xp-icons/shutdown-icon.png" alt="Turn Off Computer" className="w-5 h-5" width={20} height={20} loading="lazy" />
                    <span className="font-semibold">Turn Off</span>
                </button>
            </footer>
        </motion.div>
    );
};

export default StartMenu;