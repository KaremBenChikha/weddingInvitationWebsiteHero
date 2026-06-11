export function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8" aria-hidden="true">
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-accent/30 to-gold-accent/60" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
        <path d="M5 0L5.78 4.22L10 5L5.78 5.78L5 10L4.22 5.78L0 5L4.22 4.22L5 0Z" fill="#d4a843" />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold-accent/30 to-gold-accent/60" />
    </div>
  );
}
