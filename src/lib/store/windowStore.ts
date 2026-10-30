import type React from 'react';
import { create } from 'zustand';

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
  position: { x: number; y: number };
  size: { width: string | number; height: string | number };
  minimized: boolean;
  focused: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;

  addWindow: (
    id: string,
    title: string,
    content: React.ReactNode,
    initialPosition?: { x: number; y: number },
    initialSize?: { width: string | number; height: string | number },
    icon?: string
  ) => void;
  removeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  /** Taskbar button behaviour: restore if minimized, minimize if already focused, else focus. */
  toggleWindow: (id: string) => void;
  /** Apps such as Explorer retitle their window as the user navigates. */
  updateWindow: (id: string, patch: Partial<Pick<WindowState, 'title' | 'icon'>>) => void;
  closeAll: () => void;
}

const TASKBAR_HEIGHT = 30;

/** Keep new windows on screen: shrink them to the viewport and pull them back inside it. */
function fitToViewport(
  position: { x: number; y: number },
  size: { width: string | number; height: string | number }
) {
  if (typeof window === 'undefined') return { position, size };
  const maxW = window.innerWidth - 16;
  const maxH = window.innerHeight - TASKBAR_HEIGHT - 16;
  const width = typeof size.width === 'number' ? Math.min(size.width, maxW) : size.width;
  const height = typeof size.height === 'number' ? Math.min(size.height, maxH) : size.height;
  const w = typeof width === 'number' ? width : maxW;
  const h = typeof height === 'number' ? height : maxH;
  return {
    size: { width, height },
    position: {
      x: Math.max(8, Math.min(position.x, window.innerWidth - w - 8)),
      y: Math.max(8, Math.min(position.y, window.innerHeight - TASKBAR_HEIGHT - h - 8)),
    },
  };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 1000,

  addWindow: (id, title, content, initialPosition, initialSize, icon) => {
    // Opening something that is already open brings that window back instead of duplicating it.
    if (get().windows.some((win) => win.id === id)) {
      get().restoreWindow(id);
      return;
    }
    set((state) => {
      const newZIndex = state.nextZIndex + 1;
      const cascade = (state.windows.length % 8) * 26;
      const fitted = fitToViewport(
        // Start right of the first column of desktop icons so they stay visible.
        initialPosition || { x: 120 + cascade, y: 36 + cascade },
        initialSize || { width: 720, height: 500 }
      );
      const newWindow: WindowState = {
        id,
        title,
        content,
        icon,
        position: fitted.position,
        size: fitted.size,
        minimized: false,
        focused: true,
        zIndex: newZIndex,
      };
      return {
        windows: [...state.windows.map((win) => ({ ...win, focused: false })), newWindow],
        nextZIndex: newZIndex,
      };
    });
  },

  removeWindow: (id) => {
    set((state) => ({ windows: state.windows.filter((win) => win.id !== id) }));
    const { windows } = get();
    if (!windows.some((win) => win.focused)) {
      const next = [...windows].filter((w) => !w.minimized).sort((a, b) => b.zIndex - a.zIndex)[0];
      if (next) get().focusWindow(next.id);
    }
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((win) => (win.id === id ? { ...win, minimized: true, focused: false } : win)),
    }));
    const next = [...get().windows].filter((w) => !w.minimized).sort((a, b) => b.zIndex - a.zIndex)[0];
    if (next) get().focusWindow(next.id);
  },

  restoreWindow: (id) =>
    set((state) => {
      const newZIndex = state.nextZIndex + 1;
      return {
        windows: state.windows.map((win) =>
          win.id === id
            ? { ...win, minimized: false, focused: true, zIndex: newZIndex }
            : { ...win, focused: false }
        ),
        nextZIndex: newZIndex,
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      const target = state.windows.find((win) => win.id === id);
      if (!target || (target.focused && target.zIndex === state.nextZIndex)) return state;
      const newZIndex = state.nextZIndex + 1;
      return {
        windows: state.windows.map((win) =>
          win.id === id ? { ...win, focused: true, zIndex: newZIndex } : { ...win, focused: false }
        ),
        nextZIndex: newZIndex,
      };
    }),

  toggleWindow: (id) => {
    const win = get().windows.find((w) => w.id === id);
    if (!win) return;
    if (win.minimized) get().restoreWindow(id);
    else if (win.focused) get().minimizeWindow(id);
    else get().focusWindow(id);
  },

  updateWindow: (id, patch) =>
    set((state) => ({
      windows: state.windows.map((win) => (win.id === id ? { ...win, ...patch } : win)),
    })),

  closeAll: () => set({ windows: [] }),
}));
