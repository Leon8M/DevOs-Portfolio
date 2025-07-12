import { create } from 'zustand';

// Define the shape of a window's state
interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: string; // <--- NEW: Optional icon path
  position: { x: number; y: number }; // <--- NEW: Window position
  size: { width: string | number; height: string | number }; // <--- NEW: Window size
  minimized: boolean;
  focused: boolean;
  zIndex: number;
}

// Define the actions and properties of the window store
interface WindowStore {
  windows: WindowState[];
  nextZIndex: number; // <--- NEW: To manage z-index more reliably
  
  // <--- MODIFIED: addWindow now accepts position, size, and icon
  addWindow: (
    id: string,
    title: string,
    content: React.ReactNode,
    initialPosition?: { x: number; y: number },
    initialSize?: { width: string | number; height: string | number },
    icon?: string // <--- NEW: Icon parameter
  ) => void;
  removeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void; // <--- NEW: For dragging
  updateWindowSize: (id: string, width: string | number, height: string | number) => void; // <--- NEW: For resizing
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 1000, // Initial z-index

  addWindow: (id, title, content, initialPosition, initialSize, icon) => {
    set((state) => {
      // If window already exists, just focus it instead of adding new
      if (state.windows.some(win => win.id === id)) {
        get().focusWindow(id);
        return state; // No change to state if already exists
      }

      const newZIndex = state.nextZIndex + 1;
      const defaultPosition = { x: 50 + state.windows.length * 10, y: 50 + state.windows.length * 10 }; // Stagger new windows
      const defaultSize = { width: 720, height: 500 };

      const newWindow: WindowState = {
        id,
        title,
        content,
        icon, // <--- Store the icon
        position: initialPosition || defaultPosition, // Use provided or default
        size: initialSize || defaultSize, // Use provided or default
        minimized: false,
        focused: true,
        zIndex: newZIndex,
      };

      // Unfocus all other windows and set new window as focused
      const updatedWindows = state.windows.map((win) => ({
        ...win,
        focused: false,
      }));

      return { 
        windows: [...updatedWindows, newWindow],
        nextZIndex: newZIndex, // Update nextZIndex
      };
    });
  },

  removeWindow: (id) =>
    set((state) => {
      const filteredWindows = state.windows.filter((win) => win.id !== id);
      // If the removed window was focused, try to focus another non-minimized window
      if (!filteredWindows.some(win => win.focused) && filteredWindows.length > 0) {
        const nextFocusCandidate = filteredWindows.find(w => !w.minimized);
        if (nextFocusCandidate) {
          get().focusWindow(nextFocusCandidate.id);
        }
      }
      return { windows: filteredWindows };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const updatedWindows = state.windows.map((win) =>
        win.id === id ? { ...win, minimized: true, focused: false } : win
      );
      // If the minimized window was focused, focus the next available one
      const wasFocused = state.windows.find(win => win.id === id)?.focused;
      if (wasFocused) {
        const nextFocusedWindow = updatedWindows.find(w => !w.minimized && w.id !== id);
        if (nextFocusedWindow) {
          get().focusWindow(nextFocusedWindow.id);
        }
      }
      return { windows: updatedWindows };
    }),

  restoreWindow: (id) =>
    set((state) => {
      const newZIndex = get().nextZIndex + 1;
      const updatedWindows = state.windows.map((win) =>
        win.id === id
          ? { ...win, minimized: false, focused: true, zIndex: newZIndex }
          : { ...win, focused: false } // Unfocus others
      );
      return { 
        windows: updatedWindows,
        nextZIndex: newZIndex,
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      const newZIndex = get().nextZIndex + 1;
      const updatedWindows = state.windows.map((win) =>
        win.id === id
          ? { ...win, focused: true, zIndex: newZIndex }
          : { ...win, focused: false } // Unfocus others
      ).sort((a, b) => a.zIndex - b.zIndex); // Keep sorted by z-index for consistent rendering order

      return { 
        windows: updatedWindows,
        nextZIndex: newZIndex,
      };
    }),

  updateWindowPosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, position: { x, y } } : win
      ),
    })),

  updateWindowSize: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((win) =>
        win.id === id ? { ...win, size: { width, height } } : win
      ),
    })),
}));