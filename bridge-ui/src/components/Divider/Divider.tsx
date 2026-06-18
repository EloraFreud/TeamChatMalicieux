import { cn } from '../../lib/cn';

export interface DividerProps {
  /** Default = border-primary, soft = border-secondary (lighter). */
  variant?: 'default' | 'soft';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Divider — a 1px rule. Figma: Type=Default/Soft (horizontal) + Sidebar (vertical).
 * Horizontal fills its container width; vertical stretches to its container height.
 */
export function Divider({
  variant = 'default',
  orientation = 'horizontal',
  className,
}: DividerProps) {
  const color = variant === 'soft' ? 'bg-border-secondary' : 'bg-border-primary';
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        color,
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        className,
      )}
    />
  );
}
