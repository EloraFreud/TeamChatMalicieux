import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SegmentedItem {
  value: string;
  label: ReactNode;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
}

export interface SegmentedProps {
  items: SegmentedItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * Segmented — a row of mutually-exclusive segments (single-select control).
 * Container: pill with secondary background; each segment is a button.
 * Selected segments get a raised primary surface; unselected ones stay quiet.
 * Controlled (value) or uncontrolled (defaultValue + onValueChange).
 */
export function Segmented({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: SegmentedProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const selected = isControlled ? value : internal;
  const groupId = useId();

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div
      role="radiogroup"
      className={cn(
        'inline-flex flex-row gap-1 rounded-2xl border border-border-primary bg-background-secondary p-1',
        className,
      )}
    >
      {items.map((item) => {
        const isSelected = item.value === selected;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            id={`${groupId}-${item.value}`}
            aria-checked={isSelected}
            aria-selected={isSelected}
            onClick={() => select(item.value)}
            className={cn(
              'inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-3 transition-colors',
              'font-display text-label-small',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
              isSelected
                ? 'border-border-secondary bg-background-primary text-content-primary'
                : 'border-transparent text-content-tertiary hover:text-content-primary',
            )}
          >
            {item.iconLeading != null && <span className="shrink-0">{item.iconLeading}</span>}
            {item.label}
            {item.iconTrailing != null && <span className="shrink-0">{item.iconTrailing}</span>}
          </button>
        );
      })}
    </div>
  );
}
