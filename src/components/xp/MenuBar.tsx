'use client';

import React, { useEffect, useRef, useState } from 'react';

export type MenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      onClick?: () => void;
      checked?: boolean;
      disabled?: boolean;
      shortcut?: string;
    };

export interface Menu {
  label: string;
  items: MenuItem[];
}

/**
 * Classic Windows menu bar. Click a title to open it; while one is open, hovering another
 * title switches to it. Clicking outside or pressing Escape closes it.
 */
export default function MenuBar({ menus }: { menus: Menu[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open === null) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="xp-menubar" role="menubar">
      {menus.map((menu, i) => (
        <div key={menu.label} className="relative">
          <button
            type="button"
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open === i}
            className={`xp-menubar-title ${open === i ? 'open' : ''}`}
            onClick={() => setOpen(open === i ? null : i)}
            onMouseEnter={() => open !== null && setOpen(i)}
          >
            {menu.label}
          </button>
          {open === i && (
            <ul className="xp-menu" role="menu">
              {menu.items.map((item, j) =>
                item.separator ? (
                  <li key={j} className="xp-menu-separator" role="separator" />
                ) : (
                  <li key={j} role="none">
                    <button
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={item.checked ?? false}
                      disabled={item.disabled}
                      className="xp-menu-item"
                      onClick={() => {
                        setOpen(null);
                        item.onClick?.();
                      }}
                    >
                      <span className="w-4 text-center">{item.checked ? '✓' : ''}</span>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.shortcut && <span className="pl-6 opacity-70">{item.shortcut}</span>}
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
