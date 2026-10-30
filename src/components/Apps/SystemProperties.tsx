'use client';

import React from 'react';
import { profile } from '@/lib/data/profile';
import { useWindowStore } from '@/lib/store/windowStore';
import { openPath } from '@/lib/launcher';

const TABS = ['General', 'Computer Name', 'Hardware', 'Advanced'];

/** XP System Properties, General tab: what this "computer" is and how it's built. */
export default function SystemProperties({ windowId }: { windowId: string }) {
  const removeWindow = useWindowStore((s) => s.removeWindow);

  return (
    <div className="flex h-full flex-col bg-[#ece9d8] p-2 text-[11px]">
      <div className="flex gap-0.5 overflow-x-auto" role="tablist">
        {TABS.map((tab) => (
          <span
            key={tab}
            role="tab"
            aria-selected={tab === 'General'}
            className={`whitespace-nowrap rounded-t border border-b-0 px-2 py-0.5 ${
              tab === 'General' ? 'relative top-px border-[#919b9c] bg-[#fcfcfe] font-bold' : 'border-[#c4c3b4] text-[#8a8a8a]'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 gap-4 overflow-y-auto border border-[#919b9c] bg-[#fcfcfe] p-4 xp-scrollbar">
        <div className="hidden flex-shrink-0 flex-col items-center sm:flex">
          <img src="/xp-icons/start-icon.svg" alt="" className="h-16 w-16" />
          <span className="mt-1 text-lg font-bold italic text-[#0a246a]">LeonOS</span>
        </div>
        <dl className="space-y-3">
          <div>
            <dt>System:</dt>
            <dd className="pl-4">
              LeonOS Portfolio Edition
              <br />
              Version 2.0 (Build 2026)
            </dd>
          </div>
          <div>
            <dt>Registered to:</dt>
            <dd className="pl-4">
              {profile.name}
              <br />
              {profile.title}
              <br />
              {profile.location}
            </dd>
          </div>
          <div>
            <dt>Computer:</dt>
            <dd className="pl-4">
              Next.js 16 · React 19 · TypeScript
              <br />
              Tailwind CSS 4 · Zustand · Framer Motion
              <br />
              Hosted on Vercel
            </dd>
          </div>
          <div>
            <button
              type="button"
              className="text-[#0000ee] underline"
              onClick={() => openPath(['C:', 'WINDOWS', 'LeonOS.ini'])}
            >
              How this site is built (LeonOS.ini)
            </button>
          </div>
        </dl>
      </div>

      <div className="flex justify-end gap-1.5 pt-2">
        <button type="button" className="xp-button" onClick={() => removeWindow(windowId)}>
          OK
        </button>
      </div>
    </div>
  );
}
