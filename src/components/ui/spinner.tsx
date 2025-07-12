// src/components/ui/spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: number; // Optional size in pixels
  className?: string; // Optional additional Tailwind classes
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, className = '' }) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{ width: size, height: size }}
      role="status" // For accessibility
      aria-label="Loading..." // For accessibility
    >
      <span className="sr-only">Loading...</span> {/* Screen reader only text */}
    </div>
  );
};

export default Spinner;