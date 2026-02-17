/**
 * Horizontal divider between sections. Theme-aware (primary tint).
 */
export function SectionDivider() {
  return (
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      aria-hidden
    />
  );
}
