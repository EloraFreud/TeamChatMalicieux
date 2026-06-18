import { useId, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  className?: string;
}

/**
 * TextArea — labelled multi-line field with optional description + helper text.
 * Figma: TextArea. Field background is Background/Primary (white).
 */
export function TextArea({
  label,
  description,
  helperText,
  id,
  className,
  ...rest
}: TextAreaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label != null && (
        <label htmlFor={inputId} className="font-display text-label-small text-content-primary">
          {label}
        </label>
      )}
      {description != null && (
        <span className="text-paragraph-small text-content-secondary">{description}</span>
      )}
      <textarea
        id={inputId}
        className="min-h-[117px] w-full rounded-lg border border-border-primary bg-background-primary px-3 py-3 text-paragraph-base text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-content-brand-brand"
        {...rest}
      />
      {helperText != null && (
        <span className="text-paragraph-small text-content-tertiary">{helperText}</span>
      )}
    </div>
  );
}
