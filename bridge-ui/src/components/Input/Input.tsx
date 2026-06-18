import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
}

/**
 * Input — labelled text field with optional icons + helper text. Figma: Input
 * (State Default). The Phone variant (country selector + dial code) is not built yet.
 */
export function Input({
  label,
  required,
  helperText,
  leadingIcon,
  trailingIcon,
  id,
  className,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label != null && (
        <label htmlFor={inputId} className="font-display text-label-small text-content-primary">
          {label}
          {required && <span className="text-content-extensions-error"> *</span>}
        </label>
      )}
      <div className="flex h-12 items-center gap-2 rounded-lg border border-border-primary bg-background-secondary px-4 focus-within:ring-2 focus-within:ring-content-brand-brand">
        {leadingIcon != null && <span className="shrink-0 text-content-tertiary">{leadingIcon}</span>}
        <input
          id={inputId}
          className="w-full bg-transparent text-paragraph-base text-content-primary placeholder:text-content-tertiary focus:outline-none"
          {...rest}
        />
        {trailingIcon != null && <span className="shrink-0 text-content-tertiary">{trailingIcon}</span>}
      </div>
      {helperText != null && (
        <span className="text-paragraph-small text-content-secondary">{helperText}</span>
      )}
    </div>
  );
}
