import React from 'react';

const LINK = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

/** Render plain text with URLs and email addresses as clickable links. */
export default function Linkify({ text }: { text: string }) {
  const parts = text.split(LINK);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part;
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-[#0000ee] underline">
            {part}
          </a>
        );
      })}
    </>
  );
}
