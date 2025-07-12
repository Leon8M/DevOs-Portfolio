import React from 'react';

interface SpinnerProps {
  size?: number; 
  className?: string;
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