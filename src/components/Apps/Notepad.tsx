'use client';

import React, { useRef, useState } from 'react';
import MenuBar from '@/components/xp/MenuBar';
import Linkify from '@/components/xp/Linkify';
import { useWindowStore } from '@/lib/store/windowStore';

interface NotepadProps {
  windowId: string;
  fileName: string;
  text: string;
  /** A blank Notepad you can type into. Documents open read-only with clickable links. */
  editable?: boolean;
}

export default function Notepad({ windowId, fileName, text, editable = false }: NotepadProps) {
  const [wordWrap, setWordWrap] = useState(true);
  const [statusBar, setStatusBar] = useState(false);
  const [draft, setDraft] = useState(text);
  const [about, setAbout] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const removeWindow = useWindowStore((s) => s.removeWindow);

  const content = editable ? draft : text;
  const lines = content.split('\n').length;

  const selectAll = () => {
    if (editable) {
      textareaRef.current?.select();
      return;
    }
    const range = document.createRange();
    if (bodyRef.current) range.selectNodeContents(bodyRef.current);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const copyAll = () => navigator.clipboard?.writeText(content).catch(() => undefined);

  const textStyle = `font-['Lucida_Console',_'Courier_New',_monospace] text-[13px] leading-[1.35] text-black ${
    wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
  }`;

  return (
    <div className="flex h-full flex-col bg-white">
      <MenuBar
        menus={[
          {
            label: 'File',
            items: [
              { label: 'Copy all text', onClick: copyAll },
              { separator: true },
              { label: 'Exit', onClick: () => removeWindow(windowId) },
            ],
          },
          {
            label: 'Edit',
            items: [
              { label: 'Select All', shortcut: 'Ctrl+A', onClick: selectAll },
              { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => document.execCommand('copy') },
            ],
          },
          { label: 'Format', items: [{ label: 'Word Wrap', checked: wordWrap, onClick: () => setWordWrap((w) => !w) }] },
          { label: 'View', items: [{ label: 'Status Bar', checked: statusBar, onClick: () => setStatusBar((s) => !s) }] },
          { label: 'Help', items: [{ label: 'About Notepad', onClick: () => setAbout(true) }] },
        ]}
      />

      <div className="relative min-h-0 flex-1 border-t border-[#aca899]">
        {editable ? (
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            autoFocus
            aria-label={fileName}
            className={`h-full w-full resize-none p-1 outline-none xp-scrollbar ${textStyle}`}
          />
        ) : (
          <div ref={bodyRef} className={`h-full overflow-auto p-1 select-text xp-scrollbar ${textStyle}`}>
            <Linkify text={text} />
          </div>
        )}

        {about && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="xp-dialog w-72">
              <div className="xp-dialog-title">About Notepad</div>
              <div className="p-3 text-xs">
                <p className="font-bold">LeonOS Notepad</p>
                <p className="mt-1">
                  This document is generated from the same data as my resume, so it&apos;s always current.
                </p>
                <div className="mt-3 text-right">
                  <button type="button" className="xp-button" onClick={() => setAbout(false)}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {statusBar && (
        <div className="xp-statusbar justify-end">
          Ln {lines}, {content.length} characters
        </div>
      )}
    </div>
  );
}
