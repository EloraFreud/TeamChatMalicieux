import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface HeadingProps {
  title: ReactNode;
  variant?: 'heading' | 'subheading';
  /** Right-aligned actions, typically <Button>s. */
  actions?: ReactNode;
  /** Rule below the row. Defaults to true for 'heading', false for 'subheading'. */
  divider?: boolean;
  className?: string;
}

/**
 * Heading — a section header: title + optional actions, with a divider for the
 * 'heading' variant. Figma: Heading (Type=Heading/Subheading, button slots).
 */
export function Heading({ title, variant = 'heading', actions, divider, className }: HeadingProps) {
  const showDivider = divider ?? variant === 'heading';
  const isHeading = variant === 'heading';
  const TitleTag = isHeading ? 'h2' : 'h3';

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-4">
        <TitleTag
          className={cn(
            'font-display text-content-primary',
            isHeading ? 'text-heading-medium' : 'text-label-small',
          )}
        >
          {title}
        </TitleTag>
        {actions != null && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
      </div>
      {showDivider && <div className="h-px w-full bg-border-secondary" />}
    </div>
  );
}
