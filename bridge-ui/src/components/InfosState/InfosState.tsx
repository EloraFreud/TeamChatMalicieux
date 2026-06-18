import type { ReactNode } from 'react';
import { Check, CircleNotch } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export type InfosStateState = 'default' | 'load';

export interface InfosStateProps {
  /** Figma state: Default (Check) | Load (spinner). */
  state?: InfosStateState;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/**
 * InfosState — a compact status/info row (e.g. uploaded file status).
 * Figma: InfosState (State Default | Load). The leading icon box swaps a Check
 * glyph for an animated CircleNotch spinner while loading.
 */
export function InfosState({
  state = 'default',
  title,
  description,
  className,
}: InfosStateProps) {
  return (
    <div
      className={cn(
        'inline-flex flex-row items-center gap-3 rounded-lg border border-border-secondary bg-background-secondary p-2',
        className,
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-background-primary text-content-secondary">
        {state === 'load' ? (
          <CircleNotch size={16} className="animate-spin" aria-hidden />
        ) : (
          <Check size={16} aria-hidden />
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-display text-label-small text-content-primary">{title}</span>
        {description != null && (
          <span className="text-paragraph-tiny text-content-secondary">{description}</span>
        )}
      </span>
    </div>
  );
}
