import { useId, useState, type ReactNode } from 'react';
import { CaretUpDown, Check } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export interface SelectItem {
  value: string;
  label: ReactNode;
}

export interface SelectProps {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: ReactNode;
  /** Optional header row rendered at the top of the menu panel. */
  header?: ReactNode;
  items: SelectItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * Select — single-select dropdown form control. Figma: Select.
 * Trigger button toggles a menu panel; each item selects + closes. A fixed
 * backdrop handles click-away. Controlled (value) + uncontrolled (defaultValue).
 */
export function Select({
  label,
  description,
  placeholder = 'Select',
  header,
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: SelectProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const autoId = useId();
  const triggerId = useId();
  const listId = `${autoId}-list`;

  const selectedItem = items.find((item) => item.value === selected);

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label != null && (
        <label htmlFor={triggerId} className="font-display text-label-small text-content-primary">
          {label}
        </label>
      )}
      {description != null && (
        <span className="text-paragraph-small text-content-tertiary">{description}</span>
      )}
      <div className="relative">
        <button
          type="button"
          id={triggerId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'inline-flex w-full items-center justify-between gap-3 rounded-lg border border-border-primary bg-background-primary px-3 py-2 text-paragraph-small',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
            selectedItem ? 'text-content-primary' : 'text-content-secondary',
          )}
        >
          <span className="truncate">{selectedItem ? selectedItem.label : placeholder}</span>
          <CaretUpDown size={16} className="shrink-0 text-content-secondary" aria-hidden />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" aria-hidden onClick={() => setOpen(false)} />
            <div
              id={listId}
              role="listbox"
              className="absolute left-0 right-0 top-full z-20 mt-1 flex flex-col rounded-md border border-border-primary bg-background-secondary p-1 shadow-box-shadow-shadow-md"
            >
              {header != null && (
                <div className="px-2 py-1 text-label-tiny text-content-tertiary">{header}</div>
              )}
              {items.map((item) => {
                const isSelected = item.value === selected;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => select(item.value)}
                    className="inline-flex w-full items-center gap-2 rounded-[5px] px-1.5 py-1 text-label-tiny text-content-primary hover:bg-background-tertiary"
                  >
                    <Check
                      size={16}
                      className={cn('shrink-0', isSelected ? 'opacity-100' : 'opacity-0')}
                      aria-hidden
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
