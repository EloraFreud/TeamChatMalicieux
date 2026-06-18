import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TabBarItem {
  value: string;
  label: ReactNode;
  icon: ReactNode;
}

export interface TabBarProps {
  items: TabBarItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** iOS home-indicator bar at the bottom. */
  showHomeIndicator?: boolean;
  className?: string;
}

/**
 * TabBar — mobile bottom navigation. Figma: Tab Bar.
 * A row of vertical icon+label items (390px wide) over bg-background-primary with a
 * top border; the active item uses content-primary, inactive uses content-tertiary.
 * Optional iOS home-indicator bar sits below the items. Controlled + uncontrolled.
 */
export function TabBar({
  items,
  value,
  defaultValue,
  onValueChange,
  showHomeIndicator = true,
  className,
}: TabBarProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;
  const groupId = useId();

  const select = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <nav
      aria-label="Bottom navigation"
      className={cn(
        'flex w-[390px] flex-col border-t border-border-tertiary bg-background-primary',
        className,
      )}
    >
      <div role="tablist" className="flex flex-row">
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${groupId}-${item.value}`}
              aria-selected={isActive}
              onClick={() => select(item.value)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 pt-4',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
                isActive ? 'text-content-primary' : 'text-content-tertiary',
              )}
            >
              <span className="shrink-0" aria-hidden>
                {item.icon}
              </span>
              <span className="text-paragraph-tiny">{item.label}</span>
            </button>
          );
        })}
      </div>
      {showHomeIndicator && (
        <div className="flex h-[34px] items-center justify-center">
          <span className="h-1 w-[134px] rounded-full bg-border-primary" />
        </div>
      )}
    </nav>
  );
}
