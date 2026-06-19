import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SidebarItem {
  icon?: ReactNode;
  label: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  /** Optional content above the nav body (logo, search…). */
  header?: ReactNode;
  /** Optional content below the nav body, separated by a Divider (profile, settings…). */
  footer?: ReactNode;
  /** Flat list of navigation items. */
  items: SidebarItem[];
  className?: string;
}

/**
 * Sidebar — vertical navigation. Figma: State=Default.
 * A 256px column over bg-background-primary with a right border. Optional header/footer
 * slots (padded) bracket a scrollable body of nav items. The active item gets a
 * background tint plus a small rounded indicator bar; inactive items tint on hover.
 */
export function Sidebar({ header, footer, items, className }: SidebarProps) {
  return (
    <nav
      aria-label="Sidebar"
      className={cn(
        'flex h-full min-h-[600px] w-64 flex-col border-r border-border-primary bg-background-primary',
        className,
      )}
    >
      {header != null && <div className="p-4">{header}</div>}

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
        {items.map((item, i) => {
          const active = item.active ?? false;
          return (
            <button
              key={i}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={item.onClick}
              className={cn(
                'relative flex w-full items-center gap-3 rounded-lg px-2 py-2 text-label-small font-display',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
                active
                  ? 'bg-background-secondary text-content-primary'
                  : 'text-content-secondary hover:bg-background-secondary',
              )}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-content-primary"
                />
              )}
              {item.icon != null && <span className="shrink-0">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {footer != null && (
        <div className="border-t border-border-primary p-4">{footer}</div>
      )}
    </nav>
  );
}
