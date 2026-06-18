import { useId } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';

export interface PaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Total number of items (for the "X-Y sur Z" range text). */
  total?: number;
  /** Items per page. */
  perPage?: number;
  /** Selectable per-page sizes. */
  perPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  /** Show a "Go to page" field on the right (default off). */
  showGoTo?: boolean;
  className?: string;
}

const MAX_BUTTONS = 5;

/**
 * Build the list of page tokens to render: numbers + 'ellipsis' markers.
 * Always shows first & last; keeps the current page centered when possible.
 */
function buildPages(page: number, pageCount: number): Array<number | 'ellipsis'> {
  if (pageCount <= MAX_BUTTONS) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages: Array<number | 'ellipsis'> = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pageCount - 1, page + 1);

  if (start > 2) pages.push('ellipsis');
  for (let p = start; p <= end; p += 1) pages.push(p);
  if (end < pageCount - 1) pages.push('ellipsis');

  pages.push(pageCount);
  return pages;
}

/**
 * Pagination — per-page control + range text on the left, page navigation on the right.
 * Figma: Pagination. Reuses Button for all controls; the per-page select is a minimal
 * native <select> styled with DS tokens (no sibling Select dependency).
 */
export function Pagination({
  page,
  pageCount,
  total,
  perPage = 10,
  perPageOptions = [10, 25, 50],
  onPageChange,
  onPerPageChange,
  showGoTo = false,
  className,
}: PaginationProps) {
  const autoId = useId();
  const perPageId = `${autoId}-per-page`;
  const goToId = `${autoId}-go-to`;

  const goTo = (target: number) => {
    const clamped = Math.min(Math.max(target, 1), pageCount);
    if (clamped !== page) onPageChange?.(clamped);
  };

  const rangeStart = total != null ? Math.min((page - 1) * perPage + 1, total) : null;
  const rangeEnd = total != null ? Math.min(page * perPage, total) : null;

  const pages = buildPages(page, pageCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-row items-center justify-between gap-4', className)}
    >
      <div className="flex flex-row items-center gap-3">
        <label htmlFor={perPageId} className="text-paragraph-small text-content-primary">
          Par page
        </label>
        <select
          id={perPageId}
          value={perPage}
          onChange={(event) => onPerPageChange?.(Number(event.target.value))}
          className="rounded-lg border border-border-primary bg-background-primary px-3 py-2 text-paragraph-small text-content-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand"
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {rangeStart != null && rangeEnd != null && (
          <span className="text-paragraph-small text-content-tertiary">
            {rangeStart}-{rangeEnd} sur {total}
          </span>
        )}
      </div>

      <div className="flex flex-row items-center gap-1">
        <Button
          variant="plain"
          size="base"
          iconLeading={<ArrowLeft size={16} />}
          disabled={page <= 1}
          onClick={() => goTo(page - 1)}
        >
          Back
        </Button>

        {pages.map((token, index) =>
          token === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden
              className="px-2 text-paragraph-small text-content-tertiary"
            >
              …
            </span>
          ) : (
            <Button
              key={token}
              variant={token === page ? 'outline' : 'plain'}
              size="base"
              aria-label={`Page ${token}`}
              aria-current={token === page ? 'page' : undefined}
              onClick={() => goTo(token)}
            >
              {token}
            </Button>
          ),
        )}

        <Button
          variant="plain"
          size="base"
          iconTrailing={<ArrowRight size={16} />}
          disabled={page >= pageCount}
          onClick={() => goTo(page + 1)}
        >
          Next
        </Button>

        {showGoTo && (
          <div className="flex flex-row items-center gap-2 pl-2">
            <label htmlFor={goToId} className="text-paragraph-small text-content-primary">
              Aller à
            </label>
            <input
              id={goToId}
              type="number"
              min={1}
              max={pageCount}
              defaultValue={page}
              onKeyDown={(event) => {
                if (event.key === 'Enter') goTo(Number(event.currentTarget.value));
              }}
              className="w-16 rounded-lg border border-border-primary bg-background-primary px-3 py-2 text-paragraph-small text-content-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
