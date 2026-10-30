import { create } from 'zustand';
import { useWindowStore } from './windowStore';

/**
 * What the "computer" is doing: booting, at the Welcome (log-in) screen, on the desktop,
 * showing the Turn Off dialog, shutting down, or switched off.
 */
export type Phase = 'boot' | 'login' | 'desktop' | 'turnOff' | 'shuttingDown' | 'off';

const BOOTED_KEY = 'leonos-booted';

function hasBootedThisSession(): boolean {
  try {
    return sessionStorage.getItem(BOOTED_KEY) === '1';
  } catch {
    return false;
  }
}

interface SessionStore {
  phase: Phase;
  /** Where the Turn Off dialog was opened from, so Stand By / Cancel return there. */
  returnTo: 'desktop' | 'login';
  setPhase: (phase: Phase) => void;
  /** First visit in a tab shows the boot screen; reloads go straight to the desktop. */
  start: () => void;
  finishBoot: () => void;
  logOff: () => void;
  shutDown: () => void;
  restart: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  phase: 'boot',
  returnTo: 'desktop',
  setPhase: (phase) =>
    set((state) => ({
      phase,
      returnTo: phase === 'turnOff' && state.phase === 'login' ? 'login' : phase === 'turnOff' ? 'desktop' : state.returnTo,
    })),
  start: () => set({ phase: hasBootedThisSession() ? 'desktop' : 'boot' }),
  finishBoot: () => {
    try {
      sessionStorage.setItem(BOOTED_KEY, '1');
    } catch {
      // Private mode / blocked storage: the boot screen just shows again next time.
    }
    set({ phase: 'desktop' });
  },
  logOff: () => {
    useWindowStore.getState().closeAll();
    set({ phase: 'login' });
  },
  shutDown: () => {
    set({ phase: 'shuttingDown' });
    setTimeout(() => {
      useWindowStore.getState().closeAll();
      set({ phase: 'off' });
    }, 1800);
  },
  restart: () => {
    useWindowStore.getState().closeAll();
    set({ phase: 'boot' });
  },
}));
