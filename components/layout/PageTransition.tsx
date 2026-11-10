import type { ReactNode } from "react";

/**
 * Rendered from app/template.tsx, so it remounts on every navigation:
 * burgundy and espresso panels lift away (CSS, no JS needed) while the new page settles in.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-wipe" />
      <div className="page-enter">{children}</div>
    </>
  );
}
