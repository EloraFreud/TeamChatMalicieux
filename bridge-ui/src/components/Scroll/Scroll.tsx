import { cn } from '../../lib/cn';

export interface ScrollProps {
  /** Scroll position 0–100, where 0 = top and 100 = bottom. */
  value?: number;
  /** Thumb height as a percentage of the track (1–100). */
  thumbSize?: number;
  className?: string;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * Scroll — a minimal scrollbar indicator. Figma 12×112: a 12-wide track with a
 * 4-wide rounded-full thumb on the right. The thumb height is `thumbSize`% of the
 * track; its vertical position is derived from `value` (0 = top, 100 = bottom).
 */
export function Scroll({ value = 0, thumbSize = 55, className }: ScrollProps) {
  const size = clamp(thumbSize, 1, 100);
  const pos = clamp(value, 0, 100);
  // The thumb travels over the remaining (100 - size)% of the track.
  const top = ((100 - size) * pos) / 100;

  return (
    <div
      role="scrollbar"
      aria-orientation="vertical"
      aria-valuenow={pos}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative h-28 w-3', className)}
    >
      <span className="absolute inset-y-0 right-0 w-1 rounded-full bg-background-tertiary" />
      <span
        className="absolute right-0 w-1 rounded-full bg-border-primary"
        style={{ height: `${size}%`, top: `${top}%` }}
      />
    </div>
  );
}
