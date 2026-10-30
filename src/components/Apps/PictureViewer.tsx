'use client';

import React, { useEffect, useState } from 'react';
import { useWindowStore } from '@/lib/store/windowStore';

interface PictureViewerProps {
  windowId: string;
  images: { name: string; src: string }[];
  startIndex: number;
}

/** Windows Picture and Fax Viewer: best-fit image, previous/next through the folder, actual size. */
export default function PictureViewer({ windowId, images, startIndex }: PictureViewerProps) {
  const [index, setIndex] = useState(startIndex);
  const [actualSize, setActualSize] = useState(false);
  const updateWindow = useWindowStore((s) => s.updateWindow);
  const image = images[index];
  const many = images.length > 1;

  useEffect(() => {
    updateWindow(windowId, { title: `${image.name} - Windows Picture and Fax Viewer` });
  }, [image.name, updateWindow, windowId]);

  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div
      className="flex h-full flex-col bg-white"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      }}
    >
      <div className={`min-h-0 flex-1 bg-white ${actualSize ? 'overflow-auto' : 'flex items-center justify-center overflow-hidden p-3'}`}>
        <img
          src={image.src}
          alt={image.name}
          className={actualSize ? 'max-w-none' : 'max-h-full max-w-full object-contain shadow-[0_1px_4px_rgba(0,0,0,0.35)]'}
        />
      </div>

      <div className="flex flex-shrink-0 items-center justify-center gap-1 border-t border-[#d4d0c8] bg-gradient-to-b from-[#f6f6f3] to-[#e3e1d6] px-2 py-1.5">
        <button type="button" className="xp-tool-button" disabled={!many} onClick={() => step(-1)} title="Previous Image (Left Arrow)">
          <img src="/xp-icons/fs/back.svg" alt="" className="h-5 w-5" /> Previous
        </button>
        <button type="button" className="xp-tool-button" disabled={!many} onClick={() => step(1)} title="Next Image (Right Arrow)">
          Next <img src="/xp-icons/fs/forward.svg" alt="" className="h-5 w-5" />
        </button>
        <span className="mx-1 h-5 border-l border-[#b5b2a5]" />
        <button type="button" className="xp-tool-button" onClick={() => setActualSize((a) => !a)}>
          {actualSize ? 'Best Fit' : 'Actual Size'}
        </button>
        <a className="xp-tool-button" href={image.src} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
        {many && (
          <span className="ml-2 text-xs text-[#555]">
            {index + 1} of {images.length}
          </span>
        )}
      </div>
    </div>
  );
}
