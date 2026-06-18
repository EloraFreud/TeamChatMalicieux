import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ChartProps {
  /** Progress value, 0–100. Default 0. */
  percent?: number;
  /** Optional sublabel rendered under the big percentage. */
  label?: ReactNode;
  /** Outer size in px (square). Default 80 (Figma). */
  size?: number;
  className?: string;
}

// Geometry from the Figma spec: viewBox 80×80, r=34, stroke-width=12.
const R = 34;
const C = 2 * Math.PI * R;

/**
 * Chart — a donut/ring progress with a center label. Figma: Chart 80×80
 * (Percent 25 | 50 | 75 | 100). Base ring uses Background/Tertiary; the progress
 * arc uses Content/Brand/Brand. Colors come from CSS vars so it stays tokenized.
 */
export function Chart({ percent = 0, label, size = 80, className }: ChartProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
        <circle cx={40} cy={40} r={R} fill="none" strokeWidth={12} stroke="var(--background-tertiary)" />
        <circle
          cx={40}
          cy={40}
          r={R}
          fill="none"
          strokeWidth={12}
          stroke="var(--content-brand-brand)"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - clamped / 100)}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-heading-tiny font-display text-content-primary">{Math.round(clamped)}%</span>
        {label != null && (
          <span className="text-paragraph-tiny text-content-secondary">{label}</span>
        )}
      </div>
    </div>
  );
}
