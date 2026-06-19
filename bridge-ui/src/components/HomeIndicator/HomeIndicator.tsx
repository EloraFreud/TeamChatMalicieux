import { cn } from '../../lib/cn';

export interface HomeIndicatorProps {
  className?: string;
}

/**
 * HomeIndicator — the iOS home-indicator bar. Figma 390x34:
 * a centered pill (134x4, rounded-full, Border/Primary) on a 34px-tall row.
 */
export function HomeIndicator({ className }: HomeIndicatorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex h-[34px] w-[390px] max-w-full items-center justify-center',
        className,
      )}
    >
      <div className="h-1 w-[134px] rounded-full bg-border-primary" />
    </div>
  );
}
