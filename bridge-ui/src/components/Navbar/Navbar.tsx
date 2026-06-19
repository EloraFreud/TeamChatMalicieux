import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Divider } from '../Divider';

export interface NavbarItem {
  label: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface NavbarProps {
  /** Optional leading brand/logo slot. */
  logo?: ReactNode;
  /** Primary navigation items. */
  items: NavbarItem[];
  /** Trailing actions slot (e.g. icon Buttons). */
  actions?: ReactNode;
  /** Optional trailing avatar slot (reuse <Avatar/>). */
  avatar?: ReactNode;
  className?: string;
}

/**
 * Navbar — desktop top navigation bar. Figma: Device Desktop/Mobile.
 * Leading: optional logo, a vertical Divider, and a row of nav items (each with a 2px
 * active underline). Trailing: an actions slot and an optional avatar.
 */
export function Navbar({ logo, items, actions, avatar, className }: NavbarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'flex w-full flex-row items-center justify-between',
        'border-b border-border-secondary bg-background-primary px-8 py-3',
        className,
      )}
    >
      <div className="flex items-center gap-8">
        {logo != null && <div className="flex items-center">{logo}</div>}
        {logo != null && items.length > 0 && (
          <Divider orientation="vertical" className="h-6" />
        )}
        <div className="flex gap-3">
          {items.map((item, i) => {
            const isActive = item.active ?? false;
            const Tag = item.href ? 'a' : 'button';
            return (
              <Tag
                key={i}
                {...(item.href ? { href: item.href } : { type: 'button' as const })}
                onClick={item.onClick}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-stretch',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
                )}
              >
                <span
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-2 py-2',
                    'text-label-small font-display transition-colors',
                    isActive
                      ? 'text-content-primary'
                      : 'text-content-secondary hover:text-content-primary',
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'h-0.5 w-full rounded-full',
                    isActive ? 'bg-content-primary' : 'bg-transparent',
                  )}
                />
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions != null && <div className="flex items-center gap-3">{actions}</div>}
        {avatar}
      </div>
    </nav>
  );
}
