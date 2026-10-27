'use client';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '923363294326';
  const message = encodeURIComponent('Assalam-o-Alaikum! I want to inquire about admissions and courses at Aspire Institute of Technology.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div 
      className="whatsappFloatingWrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="whatsappTooltip">
          <span>Chat with Admissions Office on WhatsApp!</span>
          <div className="whatsappTooltipArrow" />
        </div>
      )}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsappBtn"
        aria-label="Chat with Aspire Institute on WhatsApp"
      >
        <span className="whatsappPulse" />
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'relative', zIndex: 2 }}>
          <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.953.563 3.781 1.531 5.344L2 22l4.75-1.5c1.5 1 3.281 1.531 5.281 1.531 5.531 0 10.031-4.5 10.031-10.031S17.562 2 12.031 2zm5.844 14.281c-.25.688-1.438 1.313-2 1.375-.531.063-1.219.094-3.625-.875-2.875-1.156-4.719-4.094-4.875-4.281-.125-.188-1.156-1.531-1.156-2.938 0-1.406.75-2.094 1-2.375.25-.281.563-.344.75-.344.188 0 .375 0 .531.031.188 0 .406-.063.625.469.25.594.844 2.063.906 2.219.063.156.094.344 0 .531-.094.188-.156.313-.313.5-.156.188-.313.406-.469.563-.156.156-.313.344-.125.656.188.313.813 1.344 1.75 2.188 1.219 1.094 2.25 1.438 2.563 1.594.313.156.5.125.688-.094.188-.219.813-.938 1.031-1.25.219-.313.438-.25.75-.125.313.125 2 .938 2.344 1.094.344.188.563.281.656.438.094.156.094.906-.156 1.594z"/>
        </svg>
      </a>
    </div>
  );
}
