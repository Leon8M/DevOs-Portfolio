import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Wallpaper {
  id: string;
  name: string;
  /** CSS background value. */
  background: string;
}

export const WALLPAPERS: Wallpaper[] = [
  { id: 'bliss', name: 'Bliss', background: "center / cover no-repeat url('/wallpaper.jpg')" },
  { id: 'classic', name: 'Windows Classic', background: '#3a6ea5' },
  { id: 'teal', name: 'Teal', background: '#008080' },
  { id: 'azul', name: 'Azul', background: 'linear-gradient(160deg, #1d5fd1 0%, #0b2f7a 100%)' },
  { id: 'none', name: '(None)', background: '#004e98' },
];

interface SettingsStore {
  wallpaperId: string;
  setWallpaper: (id: string) => void;
}

/** Display preferences, remembered per browser. */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      wallpaperId: 'bliss',
      setWallpaper: (wallpaperId) => set({ wallpaperId }),
    }),
    { name: 'leonos-settings' }
  )
);

export const wallpaperById = (id: string) => WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
