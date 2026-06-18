import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
}

/**
 * RadioButton — control + optional label/description. Figma: RadioButton.
 * Selected state shows a brand inner dot via peer-checked.
 */
export function RadioButton({ label, description, id, className, ...rest }: RadioButtonProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label htmlFor={inputId} className={cn('flex items-start gap-3', className)}>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={inputId}
          type="radio"
          className={cn(
            'peer h-4 w-4 appearance-none rounded-full border border-border-primary bg-background-secondary',
            'checked:border-content-brand-brand',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...rest}
        />
        <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-content-brand-brand peer-checked:block" />
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
