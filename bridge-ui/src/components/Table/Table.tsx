import type { ReactNode } from 'react';
import { DotsThree } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';
import { Pagination, type PaginationProps } from '../Pagination';

export type TableVariant = 'basic' | 'striped' | 'grid' | 'avatar' | 'dropdowns' | 'full-width';

export interface TableColumn<Row = Record<string, unknown>> {
  /** Key into the row object; also used as the React key for the cell. */
  key: string;
  header: ReactNode;
  align?: 'left' | 'right';
  /** Custom cell renderer. Falls back to `row[key]` when omitted. */
  render?: (row: Row, index: number) => ReactNode;
}

export interface TableProps<Row = Record<string, unknown>> {
  columns: TableColumn<Row>[];
  data: Row[];
  variant?: TableVariant;
  title?: ReactNode;
  getRowKey?: (row: Row, index: number) => string | number;
  /** When provided, a Pagination footer is rendered below the table. */
  pagination?: PaginationProps;
  className?: string;
}

/**
 * Table — semantic data table with a typed columns/data API. Figma: Table
 * (Type = Basic / Full-width / Striped rows / w/ Avatar / w/ Grid / w/ Dropdowns).
 * The dropdowns variant renders a DotsThree icon-button placeholder (no Dropdown import).
 */
export function Table<Row extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  variant = 'basic',
  title,
  getRowKey,
  pagination,
  className,
}: TableProps<Row>) {
  const isGrid = variant === 'grid';
  const isStriped = variant === 'striped';
  const isDropdowns = variant === 'dropdowns';
  const isFullWidth = variant === 'full-width';

  const table = (
    <table className={cn('w-full border-collapse text-left', !isFullWidth && 'max-w-full')}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className={cn(
                'border-b border-border-primary px-6 py-2.5 font-display text-label-small text-content-secondary',
                col.align === 'right' ? 'text-right' : 'text-left',
                isGrid && 'border-r border-border-secondary last:border-r-0',
              )}
            >
              {col.header}
            </th>
          ))}
          {isDropdowns && (
            <th
              scope="col"
              className="w-px border-b border-border-primary px-6 py-2.5"
              aria-label="Actions"
            />
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={getRowKey ? getRowKey(row, i) : i}
            className={cn(isStriped && i % 2 === 1 && 'bg-background-secondary')}
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={cn(
                  'border-b border-border-secondary px-6 py-4 text-paragraph-small text-content-primary',
                  col.align === 'right' ? 'text-right' : 'text-left',
                  isGrid && 'border-r border-border-secondary last:border-r-0',
                )}
              >
                {col.render ? col.render(row, i) : (row[col.key] as ReactNode)}
              </td>
            ))}
            {isDropdowns && (
              <td className="border-b border-border-secondary px-6 py-4 text-right">
                <Button variant="plain" size="base" iconOnly aria-label="Row actions">
                  <DotsThree size={20} />
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (isFullWidth) {
    return (
      <div className={cn('flex w-full flex-col gap-4', className)}>
        {title != null && (
          <span className="font-display text-label-base text-content-primary">{title}</span>
        )}
        {table}
        {pagination != null && <Pagination {...pagination} />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border-primary bg-background-primary p-8',
        className,
      )}
    >
      {title != null && (
        <span className="font-display text-label-base text-content-primary">{title}</span>
      )}
      {table}
      {pagination != null && <Pagination {...pagination} />}
    </div>
  );
}
