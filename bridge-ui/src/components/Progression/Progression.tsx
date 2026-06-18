import { cn } from '../../lib/cn';

export interface ProgressionProps {
  /** Completion percentage, 0–100. */
  percent?: number;
  /** Show the "<percent>%" label after the track. */
  showLabel?: boolean;
  className?: string;
}

/**
 * Progression — a horizontal linear progress bar with an optional percent label.
 * Figma: Progression (Percent = 25 | 50 | 75 | 100).
 * Track = Background/Tertiary, fill = Content/Brand/Brand sized by `percent`.
 */
export function Progression({ percent = 0, showLabel = true, className }: ProgressionProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={cn('inline-flex flex-row items-center gap-2', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-1 w-[100px] overflow-hidden rounded-full bg-background-tertiary">
        <div
          className="h-1 rounded-full bg-content-brand-brand"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-display text-label-tiny text-content-primary">{clamped}%</span>
      )}
    </div>
  );
}
