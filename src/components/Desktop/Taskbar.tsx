'use client';

import React, { useEffect, useState } from 'react';
import { useWindowStore } from '@/lib/store/windowStore';

interface TaskbarProps {
  startOpen: boolean;
  onStartButtonClick: () => void;
}

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' });

export default function Taskbar({ startOpen, onStartButtonClick }: TaskbarProps) {
  const windows = useWindowStore((s) => s.windows);
  const toggleWindow = useWindowStore((s) => s.toggleWindow);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 flex h-[30px] items-center bg-xp-taskbar border-t border-xp-taskbar-border font-xp-ui text-xs"
      style={{ zIndex: 9000000 }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onStartButtonClick}
        className={`start-button-xp ${startOpen ? 'pressed' : ''}`}
        aria-expanded={startOpen}
        aria-haspopup="menu"
      >
        <img src="/xp-icons/start-icon.svg" alt="" className="mr-1 h-4 w-4" />
        <span>start</span>
      </button>

      <div className="ml-2 flex h-full min-w-0 flex-grow items-center gap-[2px] overflow-x-auto custom-scrollbar-taskbar">
        {windows.map((win) => (
          <button
            type="button"
            key={win.id}
            onClick={() => toggleWindow(win.id)}
            title={win.title}
            className={`taskbar-button-xp ${win.focused && !win.minimized ? 'focused' : ''} ${win.minimized ? 'minimized' : ''}`}
          >
            <img src={win.icon || '/xp-icons/default-app-icon.png'} alt="" className="mr-1 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      <div className="ml-2 flex h-full items-center whitespace-nowrap bg-xp-tray-bg border-xp-tray-border px-2.5 text-xs text-white">
        <img src="/xp-icons/speaker-icon.png" alt="Volume" className="mr-2 h-4 w-4" />
        <time dateTime={now.toISOString()} title={dateFormat.format(now)} className="text-[11px] text-xp-clock-blue">
          {timeFormat.format(now)}
        </time>
      </div>
    </div>
  );
}
