import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface BackdropProps {
  /** Content rendered on top of the dim layer (at full opacity). */
  children?: ReactNode;
  className?: string;
}

/**
 * Backdrop — a dim overlay. Figma: a solid Background/InversePrimary fill at 64% opacity
 * (390×844 mobile surface). The tint is a separate layer so children render on top at full
 * opacity (sheets, dialogs, onboarding…).
 */
export function Backdrop({ children, className }: BackdropProps) {
  return (
    <div
      className={cn(
        'relative h-[844px] w-[390px] max-w-full overflow-hidden rounded-3xl',
        className,
      )}
    >
      {/* Dim layer: solid inverse-primary at 64% opacity */}
      <div aria-hidden className="absolute inset-0 bg-background-inverseprimary opacity-[0.64]" />
      {children != null && <div className="relative z-10 flex h-full w-full flex-col">{children}</div>}
    </div>
  );
}
