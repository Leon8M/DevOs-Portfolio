'use client';

import React from 'react';

/** Adobe Reader-style window. Mobile browsers often can't render PDFs inline, so links are always offered. */
export default function PdfViewer({ fileName, src }: { fileName: string; src: string }) {
  return (
    <div className="flex h-full flex-col bg-[#ece9d8]">
      <div className="flex flex-shrink-0 flex-wrap items-center gap-1 border-b border-[#aca899] bg-gradient-to-b from-[#fbfbf9] to-[#e5e2d6] px-2 py-1">
        <a className="xp-tool-button" href={src} download={fileName}>
          <img src="/xp-icons/download-icon.png" alt="" className="h-4 w-4" /> Save a Copy
        </a>
        <a className="xp-tool-button" href={src} target="_blank" rel="noopener noreferrer">
          <img src="/xp-icons/fs/pdf.svg" alt="" className="h-4 w-4" /> Open in new tab
        </a>
        <span className="ml-auto hidden text-xs text-[#555] sm:inline">{fileName}</span>
      </div>
      <iframe src={`${src}#view=FitH`} title={fileName} className="min-h-0 w-full flex-1 border-0 bg-[#808080]" />
    </div>
  );
}
