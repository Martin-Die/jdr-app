import React from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-content">
        {content}
      </div>
    </div>
  );
}; 