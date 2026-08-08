export function Crown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 14L12 22L24 6L36 22L44 14L40 34H8L4 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="10" r="2.5" fill="currentColor" />
      <circle cx="24" cy="4" r="2.5" fill="currentColor" />
      <circle cx="44" cy="10" r="2.5" fill="currentColor" />
      <line x1="10" y1="29" x2="38" y2="29" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
