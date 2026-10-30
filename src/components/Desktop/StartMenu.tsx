'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { openApp, openPath } from '@/lib/launcher';
import { type AppId, type Path, ICONS, PATHS } from '@/lib/fs';
import { profile } from '@/lib/data/profile';
import { useSessionStore } from '@/lib/store/sessionStore';

type Entry = {
  label: string;
  icon: string;
  /** Second line under pinned items, like "Internet Explorer" under "Internet". */
  sub?: string;
  bold?: boolean;
} & ({ path: Path } | { app: AppId });

const pinned: Entry[] = [
  { label: 'My Projects', sub: 'Case studies, demos & code', icon: ICONS.projects, path: PATHS.projects, bold: true },
  { label: 'About Me', sub: 'Notepad', icon: ICONS.text, path: PATHS.aboutMe, bold: true },
];

const recent: Entry[] = [
  { label: 'Resume.pdf', icon: ICONS.pdf, path: PATHS.resume },
  { label: 'Experience', icon: ICONS.experience, path: PATHS.experience },
  { label: 'DevShell', icon: ICONS.devshell, app: 'devshell' },
  { label: 'Contact Me', icon: ICONS.contact, app: 'contact' },
  { label: 'Calculator', icon: ICONS.calculator, app: 'calculator' },
  { label: 'Calendar', icon: ICONS.calendar, app: 'calendar' },
];

const places: Entry[] = [
  { label: 'My Documents', icon: ICONS.myDocuments, path: PATHS.myDocuments, bold: true },
  { label: 'Education', icon: ICONS.education, path: PATHS.education, bold: true },
  { label: 'Certificates', icon: ICONS.folder, path: PATHS.certificates, bold: true },
  { label: 'My Computer', icon: ICONS.myComputer, path: PATHS.myComputer, bold: true },
];

const system: Entry[] = [
  { label: 'Control Panel', icon: ICONS.display, app: 'display' },
  { label: 'Favorites', icon: '/xp-icons/program-access-icon.png', path: PATHS.favorites },
  { label: 'System Properties', icon: ICONS.system, app: 'system' },
  { label: 'Run...', icon: ICONS.devshell, app: 'devshell' },
];

export default function StartMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { logOff, setPhase } = useSessionStore();
  if (!isOpen) return null;

  const launch = (entry: Entry) => {
    onClose();
    if ('path' in entry) openPath(entry.path);
    else openApp(entry.app);
  };

  const Item = ({ entry, large }: { entry: Entry; large?: boolean }) => (
    <li>
      <button type="button" onClick={() => launch(entry)} className="xp-start-item" role="menuitem">
        <img src={entry.icon} alt="" className={large ? 'h-8 w-8' : 'h-6 w-6'} />
        <span className="min-w-0 text-left">
          <span className={`block truncate ${entry.bold ? 'font-bold' : ''}`}>{entry.label}</span>
          {entry.sub && <span className="xp-start-sub block truncate">{entry.sub}</span>}
        </span>
      </button>
    </li>
  );

  return (
    <>
      {/* Click anywhere outside the menu (including the Start button) to close it. */}
      <div className="fixed inset-0" style={{ zIndex: 9000001 }} onClick={(e) => { e.stopPropagation(); onClose(); }} />
      <motion.nav
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className="xp-start-menu fixed bottom-[30px] left-0 flex w-[min(400px,100vw)] flex-col"
        style={{ zIndex: 9000002 }}
        onClick={(e) => e.stopPropagation()}
        aria-label="Start menu"
      >
        <header className="xp-start-header">
          <img src="/xp-icons/user-avatar.jpg" alt="" className="h-12 w-12 rounded-[3px] border-2 border-white/80 object-cover" />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-bold">{profile.name}</span>
            <span className="block truncate text-[11px] font-normal opacity-90">{profile.title}</span>
          </span>
        </header>

        <div className="flex min-h-0 flex-1 border-t border-[#e98b2f]">
          <ul className="flex w-1/2 flex-col bg-white py-1.5" role="menu">
            {pinned.map((e) => <Item key={e.label} entry={e} large />)}
            <li className="mx-2 my-1.5 border-t border-[#d6d6d6]" role="separator" />
            {recent.map((e) => <Item key={e.label} entry={e} />)}
            <li className="mt-auto border-t border-[#d6d6d6] pt-1">
              <button
                type="button"
                className="xp-start-item justify-center font-bold"
                onClick={() => launch({ label: 'All Programs', icon: ICONS.folder, path: PATHS.programFiles })}
              >
                All Programs <span className="text-[#2d9c2d]">▶</span>
              </button>
            </li>
          </ul>
          <ul className="flex w-1/2 flex-col border-l border-[#95bdee] bg-[#d3e5fa] py-1.5 text-[#0a246a]" role="menu">
            {places.map((e) => <Item key={e.label} entry={e} />)}
            <li className="mx-2 my-1.5 border-t border-[#a8c6ee]" role="separator" />
            {system.map((e) => <Item key={e.label} entry={e} />)}
          </ul>
        </div>

        <footer className="xp-start-footer">
          <button type="button" onClick={() => { onClose(); logOff(); }} className="flex items-center gap-1.5">
            <img src="/xp-icons/logout-icon.png" alt="" className="h-6 w-6" />
            Log Off
          </button>
          <button type="button" onClick={() => { onClose(); setPhase('turnOff'); }} className="flex items-center gap-1.5">
            <img src="/xp-icons/shutdown-icon.png" alt="" className="h-6 w-6" />
            Turn Off Computer
          </button>
        </footer>
      </motion.nav>
    </>
  );
}
