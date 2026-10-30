'use client';

import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '@/lib/store/windowStore';

/** Phones get every window full-screen; dragging tiny windows around a phone is no fun. */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

/**
 * An XP "Luna" window: blue title bar, minimize/maximize/close, drag by the title bar, resize
 * from any edge, double-click the title to maximize. Positioned inside the window layer, which
 * ends at the top of the taskbar, so maximized windows never cover it.
 */
export default function Window({ id, children }: WindowProps) {
  const win = useWindowStore((s) => s.windows.find((w) => w.id === id));
  const { removeWindow, minimizeWindow, focusWindow } = useWindowStore.getState();
  const isMobile = useIsMobile();
  const [maximized, setMaximized] = useState(false);
  const [rect, setRect] = useState(() => ({
    x: win?.position.x ?? 60,
    y: win?.position.y ?? 40,
    width: win?.size.width ?? 720,
    height: win?.size.height ?? 500,
  }));

  if (!win) return null;
  const full = maximized || isMobile;

  return (
    <Rnd
      size={full ? { width: '100%', height: '100%' } : { width: rect.width, height: rect.height }}
      position={full ? { x: 0, y: 0 } : { x: rect.x, y: rect.y }}
      onDragStop={(_, d) => setRect((r) => ({ ...r, x: d.x, y: d.y }))}
      onResizeStop={(_, __, ref, ___, pos) =>
        setRect({ x: pos.x, y: pos.y, width: ref.offsetWidth, height: ref.offsetHeight })
      }
      minWidth={260}
      minHeight={180}
      bounds="parent"
      enableResizing={!full}
      disableDragging={full}
      dragHandleClassName="xp-titlebar"
      cancel=".xp-titlebar-buttons"
      className={`xp-window pointer-events-auto ${win.focused ? 'focused' : 'inactive'} ${full ? 'maximized' : ''}`}
      style={{ zIndex: win.zIndex, display: win.minimized ? 'none' : 'flex' }}
      onMouseDownCapture={() => focusWindow(id)}
      onTouchStartCapture={() => focusWindow(id)}
    >
      <div
        className="xp-titlebar"
        onDoubleClick={() => !isMobile && setMaximized((m) => !m)}
      >
        <div className="flex min-w-0 items-center gap-1.5">
          {win.icon && <img src={win.icon} alt="" className="h-4 w-4 flex-shrink-0" />}
          <span className="truncate">{win.title}</span>
        </div>
        <div className="xp-titlebar-buttons">
          <TitleButton label="Minimize" icon="/xp-icons/minimize-icon.png" onClick={() => minimizeWindow(id)} />
          {!isMobile && (
            <TitleButton
              label={maximized ? 'Restore' : 'Maximize'}
              icon={maximized ? '/xp-icons/restore-icon.png' : '/xp-icons/maximize-icon.png'}
              onClick={() => setMaximized((m) => !m)}
            />
          )}
          <TitleButton label="Close" icon="/xp-icons/close-icon.png" onClick={() => removeWindow(id)} close />
        </div>
      </div>
      <div className="xp-window-body">{children}</div>
    </Rnd>
  );
}

function TitleButton({ label, icon, onClick, close }: { label: string; icon: string; onClick: () => void; close?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`xp-title-button ${close ? 'close' : ''}`}
    >
      <img src={icon} alt="" className="h-3.5 w-3.5" />
    </button>
  );
}
