import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type BadgeColor =
  | 'zinc' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald'
  | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia'
  | 'pink' | 'rose';

export interface BadgeProps {
  color?: BadgeColor;
  /** Optional leading icon (the DS shows a small glyph slot). */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

// Literal class strings so Tailwind's JIT keeps them. bg = Components/Tags/Background/*,
// text = Components/Tags/Content/*.
const COLOR: Record<BadgeColor, string> = {
  zinc: 'bg-components-tags-background-zinc text-components-tags-content-zinc',
  red: 'bg-components-tags-background-red text-components-tags-content-red',
  orange: 'bg-components-tags-background-orange text-components-tags-content-orange',
  amber: 'bg-components-tags-background-amber text-components-tags-content-amber',
  yellow: 'bg-components-tags-background-yellow text-components-tags-content-yellow',
  lime: 'bg-components-tags-background-lime text-components-tags-content-lime',
  green: 'bg-components-tags-background-green text-components-tags-content-green',
  emerald: 'bg-components-tags-background-emerald text-components-tags-content-emerald',
  teal: 'bg-components-tags-background-teal text-components-tags-content-teal',
  cyan: 'bg-components-tags-background-cyan text-components-tags-content-cyan',
  sky: 'bg-components-tags-background-sky text-components-tags-content-sky',
  blue: 'bg-components-tags-background-blue text-components-tags-content-blue',
  indigo: 'bg-components-tags-background-indigo text-components-tags-content-indigo',
  violet: 'bg-components-tags-background-violet text-components-tags-content-violet',
  purple: 'bg-components-tags-background-purple text-components-tags-content-purple',
  fuchsia: 'bg-components-tags-background-fuchsia text-components-tags-content-fuchsia',
  pink: 'bg-components-tags-background-pink text-components-tags-content-pink',
  rose: 'bg-components-tags-background-rose text-components-tags-content-rose',
};

/**
 * Badge — a small pill with a tag color. Figma: Badge (Color × State, Show icon).
 * Inherits its text color, so an icon passed in `icon` picks up the tag's content color.
 */
export function Badge({ color = 'zinc', icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center gap-1 overflow-hidden rounded-md px-2 py-1 text-paragraph-tiny',
        // Figma Hover = a subtle Background/HoverOverlay layer on top of the tag color.
        'after:pointer-events-none after:absolute after:inset-0 after:bg-background-hoveroverlay after:opacity-0 after:transition-opacity hover:after:opacity-100',
        COLOR[color],
        className,
      )}
    >
      {icon != null && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
