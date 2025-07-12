import React, { useState, useEffect, useRef } from 'react';
import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
import { useWindowStore } from '@/lib/store/windowStore';
import Image from "next/image";

// Helper to check for mobile screen size
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return isMobile;
};

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number | string; height: number | string };
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 720, height: 500 },
  children,
}) => {
  const { removeWindow, minimizeWindow, focusWindow, windows } = useWindowStore();
  const windowState = windows.find((win) => win.id === id);

  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: initialSize.width, height: initialSize.height });
  const [position, setPosition] = useState(initialPosition);
  const preMaximizeState = useRef({ x: initialPosition.x, y: initialPosition.y, width: initialSize.width, height: initialSize.height });
  const rndRef = useRef<Rnd | null>(null);

  const isMobile = useIsMobile();

  if (!windowState || windowState.minimized) return null;

  const handleFocus = () => focusWindow(id);

  const handleToggleMaximize = () => {
    if (!rndRef.current) return;

    if (isMaximized) {
      // Restore to previous state
      setSize({ width: preMaximizeState.current.width, height: preMaximizeState.current.height });
      setPosition({ x: preMaximizeState.current.x, y: preMaximizeState.current.y });
      setIsMaximized(false);
    } else {
      const currentElement = rndRef.current.getSelfElement();
      if (currentElement) {
          preMaximizeState.current = {
              x: currentElement.offsetLeft,
              y: currentElement.offsetTop,
              width: currentElement.offsetWidth,
              height: currentElement.offsetHeight,
          };
      } else {
        console.error("Rnd self element not found for maximization state capture.");
      }

      setSize({ width: '100%', height: '100%' });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  const onDragStop: RndDragCallback = (e, d) => {
    setPosition({ x: d.x, y: d.y });
  };

  const onResizeStop: RndResizeCallback = (e, direction, ref, delta, newPosition) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
    });
    setPosition(newPosition);
  };

  const isFocused = windowState.focused;
  const isFullscreen = isMaximized || isMobile;

  return (
    <Rnd
      ref={rndRef}
      size={isFullscreen ? { width: '100%', height: '100%' } : size}
      position={isFullscreen ? { x: 0, y: 0 } : position}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      minWidth={280}
      minHeight={200}
      enableResizing={!isFullscreen}
      disableDragging={isFullscreen}
      bounds="parent"
      dragHandleClassName="window-header"
      className="flex flex-col rounded-t-lg overflow-hidden h-full"
      style={{
        zIndex: windowState.zIndex,
        border: isFullscreen ? 'none' : '1px solid #003B7C',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
      }}
      onMouseDownCapture={handleFocus}
    >
      {/* Blue Title Bar */}
      <div
        className={`window-header flex items-center justify-between h-[30px] px-1 pl-2 text-white font-bold text-sm select-none flex-shrink-0 ${
          isFocused ? 'bg-gradient-to-b from-[#0855e3] to-[#3679fc]' : 'bg-gradient-to-b from-[#7a9ad2] to-[#a3c4fa]'
        } ${!isFullscreen ? 'cursor-move' : ''}`}
        onDoubleClick={handleToggleMaximize}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <img src={icon} alt={title} className="w-4 h-4" />}
          <span>{title} - Microsoft Internet Explorer</span>
        </div>
        <div className="flex items-center space-x-1">
          <IconButton icon="/xp-icons/minimize-icon.png" alt="Minimize" onClick={() => minimizeWindow(id)} />
          <IconButton
            icon={isMaximized ? "/xp-icons/restore-icon.png" : "/xp-icons/maximize-icon.png"}
            alt={isMaximized ? "Restore" : "Maximize"}
            onClick={handleToggleMaximize}
          />
          <IconButton icon="/xp-icons/close-icon.png" alt="Close" onClick={() => removeWindow(id)} isCloseButton />
        </div>
      </div>

      {/* Main Window Body */}
      {/* ADDED h-full here to ensure this flex-col container fills the Rnd height */}
      <div className="flex flex-col flex-grow bg-[#EFEFEF] h-full"> 
        {/* Menu Bar */}
        <div className="flex items-center text-sm h-6 border-b border-gray-300 px-2 space-x-3 bg-gradient-to-b from-[#f5f5f5] to-[#dcdcdc] flex-shrink-0">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>

        {/* Address Bar */}
        <div className="flex items-center text-sm h-8 border-b border-gray-300 px-2 space-x-2 bg-gradient-to-b from-[#f5f5f5] to-[#dcdcdc] flex-shrink-0">
          <span className="text-gray-500">Address</span>
          <div className="flex-grow flex items-center bg-white border border-gray-400 h-6 px-1">
            <Image src="/xp-icons/projects-icon.png" alt="address-icon" className="w-4 h-4 mr-1" width={16} height={16} loading="lazy" />
            <input
              type="text"
              defaultValue={`C:\\Users\\Guest\\Documents\\${title.replace(/\s+/g, '')}`}
              className="bg-transparent text-sm w-full outline-none"
              readOnly
            />
          </div>
          <button className="flex items-center border border-gray-400 rounded-sm px-2 h-6 bg-gray-200 hover:bg-gray-300">
            <span className="text-sm font-bold text-green-700 mr-1">→</span> Go
          </button>
        </div>

        {/* Content Area - THIS IS WHERE THE SCROLLING HAPPENS */}
        {/* This div still needs overflow-y-auto and flex-grow */}
        <div className="flex-grow bg-white p-1 overflow-y-auto">
          {children}
        </div>
        
        {/* Status Bar */}
        <div className="h-6 border-t border-gray-300 px-2 flex items-center text-sm bg-[#EFEFEF] flex-shrink-0">
            Done
        </div>
      </div>
    </Rnd>
  );
};

// --- IconButton component (no changes needed here) ---
const IconButton: React.FC<{ icon: string; alt: string; onClick: () => void; isCloseButton?: boolean; }> = ({ icon, alt, onClick, isCloseButton = false }) => (
    <button
        onClick={onClick}
        className={`w-6 h-6 flex items-center justify-center border rounded-sm transition-colors focus:outline-none ${
            isCloseButton
                ? 'bg-[#E81123] hover:bg-[#F1707A] border-[#E81123]'
                : 'bg-gradient-to-b from-[#7192E5] to-[#4B75D2] hover:from-[#8AA9F2] hover:to-[#6087D9] border-[#2C4B8E]'
        }`}
    >
        <Image src={icon} alt={alt} className="w-4 h-4" width={16} height={16} loading="lazy" />
    </button>
);

export default Window;