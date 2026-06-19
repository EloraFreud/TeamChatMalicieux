import { useId, useState, type ReactNode } from 'react';
import { CaretUpDown, Check } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export interface ListboxItem {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  /** Leading visual (icon, flag, avatar…) shown before the label. */
  leading?: ReactNode;
}

export interface ListboxProps {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: ReactNode;
  items: ListboxItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Leading visual inside the trigger, before the selected label. */
  triggerLeading?: ReactNode;
  className?: string;
}

/**
 * Listbox — single-select with rich items (icon / flag / avatar leading). Figma: Listbox.
 * Trigger opens a popover menu; selecting an item closes it. Controlled (value) or
 * uncontrolled (defaultValue) with a click-away backdrop.
 */
export function Listbox({
  label,
  description,
  placeholder = 'Listbox',
  items,
  value,
  defaultValue,
  onValueChange,
  triggerLeading,
  className,
}: ListboxProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selectedValue = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const autoId = useId();
  const labelId = `${autoId}-label`;

  const selected = items.find((item) => item.value === selectedValue);

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label != null && (
        <span id={labelId} className="font-display text-label-small text-content-primary">
          {label}
        </span>
      )}
      {description != null && (
        <span className="text-paragraph-small text-content-tertiary">{description}</span>
      )}
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label != null ? labelId : undefined}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'inline-flex w-full items-center gap-3 rounded-lg border border-border-primary bg-background-primary px-3 py-2',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
          )}
        >
          {triggerLeading != null && (
            <span className="flex shrink-0 items-center">{triggerLeading}</span>
          )}
          <span
            className={cn(
              'text-paragraph-small',
              selected != null ? 'text-content-primary' : 'text-content-secondary',
            )}
          >
            {selected != null ? selected.label : placeholder}
          </span>
          <CaretUpDown size={16} className="ml-auto shrink-0 text-content-secondary" aria-hidden />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              aria-hidden
              onClick={() => setOpen(false)}
            />
            <ul
              role="listbox"
              aria-labelledby={label != null ? labelId : undefined}
              className={cn(
                'absolute left-0 right-0 top-full z-20 mt-1 flex flex-col rounded-xl border border-border-primary bg-background-primary p-1 shadow-md',
              )}
            >
              {items.map((item) => {
                const isSelected = item.value === selectedValue;
                return (
                  <li key={item.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => select(item.value)}
                      className="inline-flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-background-tertiary"
                    >
                      <Check
                        size={16}
                        className={cn(
                          'shrink-0 text-content-primary',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                        aria-hidden
                      />
                      {item.leading != null && (
                        <span className="flex shrink-0 items-center">{item.leading}</span>
                      )}
                      <span className="flex flex-col">
                        <span className="text-paragraph-small text-content-primary">{item.label}</span>
                        {item.description != null && (
                          <span className="text-paragraph-small text-content-secondary">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
