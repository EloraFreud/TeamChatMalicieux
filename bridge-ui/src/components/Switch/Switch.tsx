import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  /** leading = label first (switch right), trailing = switch first (label right). */
  labelPosition?: 'leading' | 'trailing';
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Switch — a toggle with an optional label + description. Figma: Switch (Label=Leading/Trailing).
 *
 * Note vs Figma: only the OFF state is a Figma variant. The ON state is interactive and
 * not in the file — it's styled here with the brand token (content-brand-brand) and the
 * thumb translated; flag for review if a dedicated ON token gets added.
 */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  labelPosition = 'leading',
  disabled = false,
  id,
  className,
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const autoId = useId();
  const switchId = id ?? autoId;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onCheckedChange?.(!on);
  };

  const control = (
    <button
      type="button"
      role="switch"
      id={switchId}
      aria-checked={on}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'inline-flex h-5 w-8 shrink-0 items-center rounded-full border p-0.5 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
        on ? 'border-content-brand-brand bg-content-brand-brand' : 'border-border-primary bg-background-secondary',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span
        className={cn(
          'h-4 w-4 rounded-full border border-border-primary bg-background-primary transition-transform',
          on ? 'translate-x-3' : 'translate-x-0',
        )}
      />
    </button>
  );

  if (!label && !description) {
    return <span className={className}>{control}</span>;
  }

  const labelBlock = (
    <span className="flex flex-col gap-1">
      {label != null && (
        <label htmlFor={switchId} className="text-label-small text-content-primary">
          {label}
        </label>
      )}
      {description != null && (
        <span className="text-paragraph-small text-content-secondary">{description}</span>
      )}
    </span>
  );

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {labelPosition === 'leading' ? (
        <>
          <div className="flex-1">{labelBlock}</div>
          {control}
        </>
      ) : (
        <>
          {control}
          <div className="flex-1">{labelBlock}</div>
        </>
      )}
    </div>
  );
}
