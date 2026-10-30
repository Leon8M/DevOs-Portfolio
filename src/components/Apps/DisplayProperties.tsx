'use client';

import React, { useState } from 'react';
import { WALLPAPERS, useSettingsStore, wallpaperById } from '@/lib/store/settingsStore';
import { useWindowStore } from '@/lib/store/windowStore';

const TABS = ['Themes', 'Desktop', 'Screen Saver', 'Appearance', 'Settings'];

/** XP Display Properties, Desktop tab: pick a wallpaper, preview it on the monitor, Apply/OK. */
export default function DisplayProperties({ windowId }: { windowId: string }) {
  const { wallpaperId, setWallpaper } = useSettingsStore();
  const [choice, setChoice] = useState(wallpaperId);
  const removeWindow = useWindowStore((s) => s.removeWindow);
  const preview = wallpaperById(choice);

  return (
    <div className="flex h-full flex-col bg-[#ece9d8] p-2 text-[11px]">
      <div className="flex gap-0.5 overflow-x-auto" role="tablist">
        {TABS.map((tab) => (
          <span
            key={tab}
            role="tab"
            aria-selected={tab === 'Desktop'}
            className={`whitespace-nowrap rounded-t border border-b-0 px-2 py-0.5 ${
              tab === 'Desktop' ? 'relative top-px border-[#919b9c] bg-[#fcfcfe] font-bold' : 'border-[#c4c3b4] text-[#8a8a8a]'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto border border-[#919b9c] bg-[#fcfcfe] p-3 xp-scrollbar">
        {/* Monitor preview */}
        <div className="flex flex-col items-center">
          <div className="rounded-[6px] border-[3px] border-[#3b3b3b] bg-[#2d2d2d] p-2 shadow-md">
            <div className="h-[100px] w-[150px] border border-black" style={{ background: preview.background }} />
          </div>
          <div className="h-3 w-10 bg-gradient-to-b from-[#6b6b6b] to-[#3b3b3b]" />
          <div className="h-1.5 w-24 rounded-sm bg-[#4a4a4a]" />
        </div>

        <div className="w-full">
          <label htmlFor={`${windowId}-bg`} className="mb-1 block">
            Background:
          </label>
          <ul id={`${windowId}-bg`} role="listbox" className="h-[110px] overflow-y-auto border border-[#7f9db9] bg-white xp-scrollbar">
            {WALLPAPERS.map((w) => (
              <li key={w.id} role="option" aria-selected={choice === w.id}>
                <button
                  type="button"
                  onClick={() => setChoice(w.id)}
                  onDoubleClick={() => setWallpaper(w.id)}
                  className={`flex w-full items-center gap-2 px-1.5 py-0.5 text-left ${choice === w.id ? 'bg-[#316ac5] text-white' : ''}`}
                >
                  <span className="h-3 w-4 border border-[#888]" style={{ background: w.background }} />
                  {w.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-1.5 pt-2">
        <button
          type="button"
          className="xp-button"
          onClick={() => {
            setWallpaper(choice);
            removeWindow(windowId);
          }}
        >
          OK
        </button>
        <button type="button" className="xp-button" onClick={() => removeWindow(windowId)}>
          Cancel
        </button>
        <button type="button" className="xp-button" disabled={choice === wallpaperId} onClick={() => setWallpaper(choice)}>
          Apply
        </button>
      </div>
    </div>
  );
}
