export function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6" aria-hidden="true">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-accent" />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L7.347 4.653L12 6L7.347 7.347L6 12L4.653 7.347L0 6L4.653 4.653L6 0Z" fill="#d4a843" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-accent" />
    </div>
  );
}
