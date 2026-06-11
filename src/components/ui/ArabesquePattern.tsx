interface ArabesquePatternProps {
  opacity?: number;
  className?: string;
}

export function ArabesquePattern({ opacity = 0.05, className = "" }: ArabesquePatternProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true" style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arabesque" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 10 Q75 30 60 50 Q45 30 60 10Z" fill="none" stroke="#d4a843" strokeWidth="0.5" />
            <path d="M60 70 Q75 90 60 110 Q45 90 60 70Z" fill="none" stroke="#d4a843" strokeWidth="0.5" />
            <path d="M10 60 Q30 45 50 60 Q30 75 10 60Z" fill="none" stroke="#d4a843" strokeWidth="0.5" />
            <path d="M70 60 Q90 45 110 60 Q90 75 70 60Z" fill="none" stroke="#d4a843" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="2" fill="#d4a843" />
            <circle cx="60" cy="30" r="1" fill="#d4a843" opacity="0.5" />
            <circle cx="60" cy="90" r="1" fill="#d4a843" opacity="0.5" />
            <circle cx="30" cy="60" r="1" fill="#d4a843" opacity="0.5" />
            <circle cx="90" cy="60" r="1" fill="#d4a843" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabesque)" />
      </svg>
    </div>
  );
}
