import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TextProps {
  type?: 'text' | 'code';
  strong?: boolean;
  underline?: boolean;
  /** Renders an <a> when set, otherwise a <span>. */
  href?: string;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Text — inline text / link. Figma: Text (Type=Text/Code, State, Underline, Strong)
 * with leading/trailing icon slots.
 *
 * Notes vs Figma:
 * - Strong → font-semibold on DM Sans. Figma's strong variant is authored in
 *   "Inter Display SemiBold" (almost certainly a leftover default) — using the DS body
 *   font here keeps it on-system.
 * - Hover recolors to background-inverseprimary (the token Figma's Hover state uses).
 * - Code uses background-secondary + border-primary; focus shows a brand ring.
 */
export function Text({
  type = 'text',
  strong = false,
  underline = false,
  href,
  iconLeading,
  iconTrailing,
  children,
  className,
}: TextProps) {
  const Tag = href ? 'a' : 'span';
  const interactive = href != null;

  return (
    <Tag
      {...(href ? { href } : {})}
      className={cn(
        'inline-flex items-center gap-2 text-paragraph-small text-content-primary',
        strong && 'font-semibold',
        underline && 'underline',
        interactive &&
          'hover:text-background-inverseprimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
        type === 'code' &&
          'rounded-md border border-border-primary bg-background-secondary px-1 py-0.5',
        className,
      )}
    >
      {iconLeading != null && <span className="shrink-0">{iconLeading}</span>}
      {children}
      {iconTrailing != null && <span className="shrink-0">{iconTrailing}</span>}
    </Tag>
  );
}
