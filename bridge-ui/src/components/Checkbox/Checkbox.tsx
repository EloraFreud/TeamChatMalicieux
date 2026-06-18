import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
}

/**
 * Checkbox — control + optional label/description. Figma: Checkbox.
 * Checked state uses the brand token; the check glyph reveals via peer-checked.
 */
export function Checkbox({ label, description, id, className, ...rest }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  // Center the control on a single line; top-align (with a nudge) when a description
  // wraps onto multiple lines.
  const hasDescription = description != null;

  return (
    <label
      htmlFor={inputId}
      className={cn('flex gap-3', hasDescription ? 'items-start' : 'items-center', className)}
    >
      <span className={cn('relative inline-flex shrink-0', hasDescription && 'mt-0.5')}>
        <input
          id={inputId}
          type="checkbox"
          className={cn(
            'peer h-4 w-4 appearance-none rounded-sm border border-border-primary bg-background-secondary',
            'checked:border-content-brand-brand checked:bg-content-brand-brand',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...rest}
        />
        <Check
          weight="bold"
          className="pointer-events-none absolute inset-0 m-auto hidden h-3 w-3 text-content-inverseprimary peer-checked:block"
          aria-hidden
        />
      </span>
      {(label != null || description != null) && (
        <span className="flex flex-col gap-1">
          {label != null && <span className="font-display text-label-small text-content-primary">{label}</span>}
          {description != null && <span className="text-paragraph-small text-content-secondary">{description}</span>}
        </span>
      )}
    </label>
  );
}
