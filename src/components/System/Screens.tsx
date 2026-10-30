'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/lib/data/profile';
import { useSessionStore } from '@/lib/store/sessionStore';

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src="/xp-icons/start-icon.svg" alt="" className="h-14 w-14" />
      <div className={`leading-none ${dark ? 'text-white' : 'text-white'}`}>
        <div className="text-[13px] font-bold tracking-wide opacity-90">{profile.altName}</div>
        <div className="text-[44px] font-bold italic tracking-tight">
          Leon<span className="text-[#f78a1d]">OS</span>
        </div>
        <div className="text-right text-[13px] font-bold opacity-90">Portfolio Edition</div>
      </div>
    </div>
  );
}

/** XP boot screen with the sliding blue progress bar. Any click or key skips it. */
export function BootScreen() {
  const finishBoot = useSessionStore((s) => s.finishBoot);

  useEffect(() => {
    const timer = setTimeout(finishBoot, 2600);
    const skip = () => finishBoot();
    window.addEventListener('keydown', skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [finishBoot]);

  return (
    <div className="fixed inset-0 flex cursor-pointer flex-col items-center justify-center bg-black font-['Trebuchet_MS',_Tahoma,_sans-serif]" onClick={finishBoot}>
      <Logo dark />
      <div className="mt-14 h-[18px] w-[150px] overflow-hidden rounded-[4px] border-2 border-[#b2b2b2] p-[2px]" role="progressbar" aria-label="Loading LeonOS">
        <div className="xp-boot-bar flex h-full gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-full w-[9px] rounded-[1px] bg-gradient-to-b from-[#2838c7] via-[#3b7bfe] to-[#2838c7]" />
          ))}
        </div>
      </div>
      <p className="absolute bottom-8 text-xs text-[#8a8a8a]">Click anywhere to skip</p>
    </div>
  );
}

/** XP Welcome screen, shown after Log Off. */
export function LoginScreen() {
  const setPhase = useSessionStore((s) => s.setPhase);
  return (
    <div className="fixed inset-0 flex flex-col bg-[#5a7edc] font-['Tahoma',_sans-serif] text-white">
      <div className="h-[12%] min-h-[48px] bg-[#00309c]" />
      <div className="h-[2px] bg-gradient-to-r from-[#00309c] via-[#f5f5f5] to-[#00309c]" />
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 md:flex-row md:gap-0">
        <div className="flex flex-col items-center md:w-1/2 md:items-end md:pr-10">
          <Logo />
          <p className="mt-6 text-lg">To begin, click your user name</p>
        </div>
        <div className="hidden h-[60%] w-px bg-gradient-to-b from-transparent via-white/70 to-transparent md:block" />
        <div className="md:w-1/2 md:pl-10">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            onClick={() => setPhase('desktop')}
            className="flex items-center gap-4 rounded-lg p-2 text-left hover:bg-[#2d55b8]/60"
          >
            <img src="/xp-icons/user-avatar.jpg" alt="" className="h-16 w-16 rounded-md border-2 border-white object-cover" />
            <span>
              <span className="block text-xl">{profile.name}</span>
              <span className="block text-xs text-[#d6e3ff]">{profile.title}</span>
            </span>
          </motion.button>
        </div>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-[#00309c] via-[#f99736] to-[#00309c]" />
      <div className="flex h-[12%] min-h-[56px] items-center justify-between bg-[#00309c] px-6 text-xs">
        <button type="button" onClick={() => setPhase('turnOff')} className="flex items-center gap-2 hover:underline">
          <img src="/xp-icons/shutdown-icon.png" alt="" className="h-7 w-7" />
          Turn off LeonOS
        </button>
        <span className="hidden max-w-xs text-right opacity-80 sm:block">
          After you log on, you can explore my projects, experience and certificates.
        </span>
      </div>
    </div>
  );
}

/** The grayed-out screen with Stand By / Turn Off / Restart. */
export function TurnOffDialog({ from }: { from: 'desktop' | 'login' }) {
  const { setPhase, shutDown, restart } = useSessionStore();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/45 backdrop-grayscale" style={{ zIndex: 9100000 }}>
      <div className="w-[min(320px,92vw)] overflow-hidden rounded-md border border-[#0a2a8a] bg-[#2f5ed9] font-['Tahoma',_sans-serif] text-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#0a3fbe] px-4 py-3 text-lg">
          <span>Turn off computer</span>
          <img src="/xp-icons/start-icon.svg" alt="" className="h-7 w-7" />
        </div>
        <div className="flex justify-around bg-gradient-to-b from-[#7b9de8] to-[#5577d6] px-4 py-6 text-xs">
          {[
            { label: 'Stand By', color: 'bg-[#e8b800]', onClick: () => setPhase(from) },
            { label: 'Turn Off', color: 'bg-[#d62f18]', onClick: shutDown },
            { label: 'Restart', color: 'bg-[#2c9a2c]', onClick: restart },
          ].map((b) => (
            <button key={b.label} type="button" onClick={b.onClick} className="flex flex-col items-center gap-1.5 hover:underline">
              <span className={`flex h-9 w-9 items-center justify-center rounded-md border border-white/70 text-lg font-bold ${b.color}`}>⏻</span>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex justify-end bg-[#0a3fbe] px-4 py-2">
          <button type="button" className="xp-button text-black" onClick={() => setPhase(from)} autoFocus>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShuttingDownScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#5a7edc] font-['Tahoma',_sans-serif] text-white">
      <Logo />
      <p className="mt-8 text-lg">LeonOS is shutting down...</p>
    </div>
  );
}

export function OffScreen() {
  const restart = useSessionStore((s) => s.restart);
  return (
    <button
      type="button"
      onClick={restart}
      className="fixed inset-0 flex flex-col items-center justify-center gap-3 bg-black font-['Tahoma',_sans-serif] text-[#f78a1d]"
    >
      <span className="text-xl">It&apos;s now safe to turn off your computer.</span>
      <span className="text-sm text-[#9a9a9a]">Thanks for visiting. Click anywhere to start LeonOS again.</span>
    </button>
  );
}
