'use client';

import React, { useEffect, useState } from 'react';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from '@/components/Window/Window';
import { IconImage } from '@/components/Apps/Explorer';
import { useWindowStore } from '@/lib/store/windowStore';
import { useSettingsStore, wallpaperById } from '@/lib/store/settingsStore';
import { useCoarsePointer } from '@/lib/useCoarsePointer';
import { openApp, openFile, openPath } from '@/lib/launcher';
import { type FileNode, PATHS, getNode, iconFor } from '@/lib/fs';

const desktopFolder = getNode(PATHS.desktop);
const desktopItems: FileNode[] =
  desktopFolder?.kind === 'folder' ? desktopFolder.children.filter((c): c is FileNode => c.kind === 'file') : [];

/** First visit only: point people at the two things recruiters look for. */
const WELCOME_KEY = 'leonos-welcomed';

export default function Desktop() {
  const windows = useWindowStore((s) => s.windows);
  const wallpaperId = useSettingsStore((s) => s.wallpaperId);
  const [startOpen, setStartOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const coarse = useCoarsePointer();

  // Open About Me on a visitor's first visit so the desktop never looks empty or confusing.
  useEffect(() => {
    try {
      if (localStorage.getItem(WELCOME_KEY)) return;
      localStorage.setItem(WELCOME_KEY, '1');
    } catch {
      return;
    }
    openPath(PATHS.aboutMe);
  }, []);

  const openItem = (item: FileNode) => {
    setSelected(null);
    openFile(item, [...PATHS.desktop, item.name]);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: wallpaperById(wallpaperId).background }}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY });
      }}
      onClick={() => {
        setSelected(null);
        setMenu(null);
      }}
    >
      {/* Desktop icons: top-down, then the next column, like Windows. */}
      <div
        key={refreshKey}
        role="list"
        aria-label="Desktop"
        className="absolute inset-x-0 top-0 bottom-[30px] grid auto-cols-[86px] grid-flow-col grid-rows-[repeat(auto-fill,86px)] content-start gap-y-1 p-2"
      >
        {desktopItems.map((item) => {
          const isSelected = selected === item.name;
          return (
            <button
              type="button"
              role="listitem"
              key={item.name}
              title={item.info ?? item.name}
              className="flex h-[84px] w-[86px] flex-col items-center gap-1 p-1 text-center outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setMenu(null);
                if (coarse) openItem(item);
                else setSelected(item.name);
              }}
              onDoubleClick={() => openItem(item)}
              onKeyDown={(e) => e.key === 'Enter' && openItem(item)}
              onFocus={() => setSelected(item.name)}
            >
              <IconImage src={iconFor(item)} arrow={item.arrow} selected={isSelected} size="h-10 w-10" />
              <span className={`xp-desktop-label line-clamp-2 ${isSelected ? 'selected' : ''}`}>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Window layer: stops at the taskbar. Only the windows themselves take clicks. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[30px]">
        {windows.map((win) => (
          <Window key={win.id} id={win.id}>
            {win.content}
          </Window>
        ))}
      </div>

      {menu && (
        <ul
          className="xp-menu fixed"
          style={{ left: Math.min(menu.x, window.innerWidth - 190), top: Math.min(menu.y, window.innerHeight - 200), zIndex: 9000003 }}
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { label: 'Refresh', onClick: () => setRefreshKey((k) => k + 1) },
            { label: 'Open My Documents', onClick: () => openPath(PATHS.myDocuments) },
            { label: 'Open DevShell here', onClick: () => openApp('devshell') },
            { label: 'New Folder', disabled: true },
            { label: 'Properties', onClick: () => openApp('display') },
          ].map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="xp-menu-item"
                disabled={item.disabled}
                onClick={() => {
                  setMenu(null);
                  item.onClick?.();
                }}
              >
                <span className="w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} />
      <Taskbar startOpen={startOpen} onStartButtonClick={() => setStartOpen((o) => !o)} />
    </div>
  );
}
