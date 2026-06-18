import { useId, useState, type ReactNode } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

/** Selectable action row. */
export interface DropdownItem {
  type: 'item';
  label: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

/** Thin separator between groups. */
export interface DropdownDivider {
  type: 'divider';
}

/** Non-interactive group label. */
export interface DropdownHeading {
  type: 'heading';
  label: ReactNode;
}

export type DropdownEntry = DropdownItem | DropdownDivider | DropdownHeading;

export interface DropdownProps {
  /** Custom trigger (icon Button, Avatar…). Defaults to the Basic "Options" button. */
  trigger?: ReactNode;
  items: DropdownEntry[];
  /** Horizontal anchor of the menu panel relative to the trigger. */
  align?: 'start' | 'end';
  className?: string;
}

/**
 * Dropdown — action menu (not a form select). Figma: Dropdown
 * (Basic / Icon trigger / Avatar trigger / Navigation / Sidebar).
 * Open state is interactive (not a Figma variant): toggled on the trigger,
 * dismissed by a click-away backdrop.
 */
export function Dropdown({ trigger, items, align = 'start', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const defaultTrigger = (
    <button
      type="button"
      className="inline-flex items-center gap-3 rounded-lg border border-border-primary bg-background-primary px-3 py-2"
    >
      <span className="font-display text-label-small text-content-secondary">Options</span>
      <CaretDown size={16} className="text-content-secondary" aria-hidden />
    </button>
  );

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
        className="inline-flex"
      >
        {trigger ?? defaultTrigger}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10" aria-hidden onClick={() => setOpen(false)} />
          <div
            id={menuId}
            role="menu"
            className={cn(
              'absolute z-20 mt-2 flex min-w-[182px] flex-col rounded-xl border border-border-primary bg-background-secondary p-1 shadow-lg',
              align === 'end' ? 'right-0' : 'left-0',
            )}
          >
            {items.map((entry, i) => {
              if (entry.type === 'divider') {
                return <div key={i} className="my-1 mx-4 h-px bg-border-primary" aria-hidden />;
              }
              if (entry.type === 'heading') {
                return (
                  <div key={i} className="px-4 py-1 text-paragraph-tiny text-content-tertiary">
                    {entry.label}
                  </div>
                );
              }
              return (
                <button
                  key={i}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    entry.onSelect?.();
                    setOpen(false);
                  }}
                  className="inline-flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left hover:bg-background-tertiary"
                >
                  {entry.icon != null && (
                    <span className="shrink-0 text-content-secondary">{entry.icon}</span>
                  )}
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-label-small text-content-primary">
                      {entry.label}
                    </span>
                    {entry.description != null && (
                      <span className="text-paragraph-tiny text-content-secondary">
                        {entry.description}
                      </span>
                    )}
                  </span>
                  {entry.shortcut != null && (
                    <span className="ml-auto text-paragraph-small text-content-secondary">
                      {entry.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
