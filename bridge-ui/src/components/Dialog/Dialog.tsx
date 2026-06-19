import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';

export interface DialogProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional content slot rendered between the description and the actions row. */
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Dialog — the confirmation dialog card. Figma: Dialog (the card itself). The overlay is a
 * separate concern: compose it over a <Backdrop> (or your own portal) for a true modal.
 * Structure: heading + description + optional slot + Cancel/Confirm actions.
 */
export function Dialog({
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  className,
}: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'flex w-[512px] max-w-full flex-col gap-4 rounded-xl border border-border-primary bg-background-primary p-6',
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="font-display text-label-small text-content-primary">{title}</span>
        {description != null && (
          <span className="text-paragraph-small text-content-tertiary">{description}</span>
        )}
      </div>
      {children}
      <div className="flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="primary" size="sm" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
