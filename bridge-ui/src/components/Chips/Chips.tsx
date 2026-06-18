import type { ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export interface ChipsProps {
  label: ReactNode;
  icon?: ReactNode;
  /** When set, a remove (×) button is shown. */
  onRemove?: () => void;
  className?: string;
}

/**
 * Chips — a removable token. Figma: Chips (State Default/Hover/Pressed).
 * States map to CSS: bg Background/Primary → Secondary (hover) → Tertiary (pressed).
 */
export function Chips({ label, icon, onRemove, className }: ChipsProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border py-3 pl-2 pr-2.5',
        'border-border-secondary bg-background-primary',
        'hover:bg-background-secondary active:border-border-primary active:bg-background-tertiary',
        className,
      )}
    >
      {icon != null && <span className="shrink-0 text-content-secondary">{icon}</span>}
      <span className="font-display text-label-small text-content-primary">{label}</span>
      {onRemove != null && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="shrink-0 text-content-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand"
        >
          <X size={16} aria-hidden />
        </button>
      )}
    </span>
  );
}
