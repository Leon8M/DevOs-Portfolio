import React, { useState, useEffect } from 'react';
import { useWindowStore } from '@/lib/store/windowStore';
import moment from 'moment'; // For date/time formatting

interface TaskbarProps {
  onStartButtonClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onStartButtonClick }) => {
  const { windows, restoreWindow, focusWindow } = useWindowStore();
  const [currentTime, setCurrentTime] = useState(moment());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 60 * 1000); // Update every 60 seconds

    return () => clearInterval(timer);
  }, []);

  const handleWindowClick = (id: string, minimized: boolean) => {
    if (minimized) {
      restoreWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-xp-taskbar border-t border-xp-taskbar-border flex items-center px-1 z-50 font-xp-ui text-xs">
      {/* Start Button */}
      <button
        onClick={onStartButtonClick}
        className="start-button-xp"
      >
        <img src="/xp-icons/start-icon.svg" alt="Start" className="w-4 h-4 mr-1" />
        <span>Start</span>
      </button>

      {/* Taskbar items (open windows) */}
      <div className="flex-grow flex items-center ml-2 space-x-[1px] h-full overflow-x-auto custom-scrollbar-taskbar">
        {windows.map((win) => {
          // Determine the icon to display. Use a default if win.icon is not provided.
          const iconSrc = win.icon || '/xp-icons/default-app-icon.png'; 
          return (
            <button
              key={win.id}
              onClick={() => handleWindowClick(win.id, win.minimized)}
              // Apply XP-specific taskbar button styles
              className={`taskbar-button-xp ${win.focused ? 'focused' : ''} ${win.minimized ? 'minimized' : ''}`}
            >
              <img src={iconSrc} alt={win.title} className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{win.title}</span> {/* Truncate long titles */}
            </button>
          );
        })}
      </div>

      {/* System Tray & Clock */}
      <div className="h-full flex items-center px-2 ml-2 bg-xp-tray-bg border-xp-tray-border text-white text-xs font-bold whitespace-nowrap">
        {/* Placeholder for other system tray icons */}
        <div className="flex items-center space-x-1 mr-2">
            {/* Example: Speaker icon */}
            <img src="/xp-icons/speaker-icon.png" alt="Speaker" className="w-4 h-4" />
        </div>
        
        {/* Actual functional clock */}
        <span className="text-xp-clock-blue text-[11px]">
          {currentTime.format('h:mm A')}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;