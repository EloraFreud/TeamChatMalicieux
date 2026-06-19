import { useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';

export interface DialogProps {
  /** Whether the dialog is visible. Renders nothing when false. */
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  /** Optional content slot rendered between the description and the actions row. */
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Dialog — modal confirmation. Figma: Dialog card rendered inside a fixed overlay.
 * Backdrop click and Escape both close (onCancel + onOpenChange(false)).
 */
export function Dialog({
  open,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  onOpenChange,
  className,
}: DialogProps) {
  const close = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  // Escape closes while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-content-primary/40 p-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'flex w-[512px] max-w-[90vw] flex-col gap-4 rounded-xl border border-border-primary bg-background-primary p-6',
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <span className="font-display text-label-small text-content-primary">{title}</span>
          {description != null && (
            <span className="text-paragraph-small text-content-tertiary">{description}</span>
          )}
        </div>
        {children}
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={close}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onConfirm?.();
              onOpenChange?.(false);
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
