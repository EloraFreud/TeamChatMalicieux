import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface DescriptionListItem {
  /** The term / label of the row (left column). */
  term: ReactNode;
  /** The detail / value of the row (right column). */
  details: ReactNode;
}

export interface DescriptionListProps {
  /** Term / detail pairs rendered as rows. */
  items: DescriptionListItem[];
  className?: string;
}

/**
 * DescriptionList — term/detail pairs. Figma: Description List.
 * Each row is a two-column flex (term + details) with a bottom divider.
 * Renders as a semantic <dl> with <dt>/<dd> pairs.
 */
export function DescriptionList({ items, className }: DescriptionListProps) {
  return (
    <dl className={cn('w-full', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex w-full flex-row border-b border-border-secondary py-2.5"
        >
          <dt className="flex-1 text-paragraph-small text-content-secondary">{item.term}</dt>
          <dd className="flex-1 text-paragraph-small text-content-primary">{item.details}</dd>
        </div>
      ))}
    </dl>
  );
}
