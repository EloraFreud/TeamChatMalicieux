import { cn } from '../../lib/cn';

export interface ProgressBarProps {
  /** Fill amount, 0–100. Default 0. */
  value?: number;
  className?: string;
}

/**
 * ProgressBar — a small vertical progress segment (Figma 8px × 38px).
 * The brand fill is anchored to the bottom of the track; its height is the
 * computed `value%` (inline style, since the percentage is dynamic).
 */
export function ProgressBar({ value = 0, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'relative h-[38px] w-2 overflow-hidden rounded-sm border border-border-primary bg-background-primary',
        className,
      )}
    >
      <div
        className="absolute inset-x-0 bottom-0 rounded-sm bg-content-brand-brand"
        style={{ height: pct + '%' }}
      />
    </div>
  );
}
