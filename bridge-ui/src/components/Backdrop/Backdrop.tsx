import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface BackdropProps {
  /** Content rendered on top of the glow (centered composition layer). */
  children?: ReactNode;
  className?: string;
}

/**
 * Backdrop — mobile screen backdrop with a colored glow. Figma: 390×844.
 * A dark Background/InversePrimary surface with a large blurred
 * Content/Brand/Accent glow ellipse near the top. Children render above the
 * glow (z-10) so it can sit behind sheets, onboarding, etc.
 */
export function Backdrop({ children, className }: BackdropProps) {
  return (
    <div
      className={cn(
        'relative h-[844px] w-[390px] max-w-full overflow-hidden rounded-3xl bg-background-inverseprimary',
        className,
      )}
    >
      {/* Glow ellipse */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-content-brand-accent opacity-40 blur-3xl"
      />
      {/* Composition layer */}
      <div className="relative z-10 flex h-full w-full flex-col">{children}</div>
    </div>
  );
}
