import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'plain';
export type ButtonSize = 'sm' | 'base' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  /** Square button with a single icon (pass it as children or iconLeading). */
  iconOnly?: boolean;
}

// Figma States (Default/Hover/Press/Focus/Disabled) map to CSS pseudo-states.
// Tokens: Components/Buttons/{Type}/{Background|Border}/{State}, text Content/*.
const VARIANT: Record<ButtonVariant, string> = {
  primary: cn(
    'border-components-buttons-primary-border-default bg-components-buttons-primary-background-default text-content-inverseprimary shadow-buttons-inner-shadow',
    'hover:bg-components-buttons-primary-background-hover active:bg-components-buttons-primary-background-pressed',
    'disabled:border-components-buttons-primary-border-disabled disabled:bg-components-buttons-primary-background-disabled',
  ),
  secondary: cn(
    'border-components-buttons-secondary-border-default bg-components-buttons-secondary-background-default text-content-inverseprimary shadow-buttons-inner-shadow',
    'hover:bg-components-buttons-secondary-background-hover active:bg-components-buttons-secondary-background-pressed',
    'disabled:border-components-buttons-secondary-border-disabled disabled:bg-components-buttons-secondary-background-disabled',
  ),
  outline: cn(
    'border-components-buttons-outline-border-default bg-components-buttons-outline-background-default text-content-primary',
    'hover:bg-components-buttons-outline-background-hover active:bg-components-buttons-outline-background-pressed',
    'disabled:bg-components-buttons-outline-background-disabled disabled:text-content-secondary',
  ),
  plain: cn(
    'border-transparent text-content-primary',
    'hover:bg-components-buttons-outline-background-hover active:bg-components-buttons-outline-background-pressed',
    'disabled:text-content-secondary',
  ),
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-7 gap-1.5 rounded-md px-2 text-label-tiny',
  base: 'h-8 gap-1.5 rounded-lg px-2.5 text-label-tiny',
  l: 'h-[38px] gap-2 rounded-lg px-3 text-label-small',
  xl: 'h-12 gap-2 rounded-lg px-4 text-label-base',
};

const SIZE_ICON: Record<ButtonSize, string> = {
  sm: 'h-7 w-7 rounded-md',
  base: 'h-8 w-8 rounded-lg',
  l: 'h-10 w-10 rounded-lg',
  xl: 'h-12 w-12 rounded-lg',
};

export function Button({
  variant = 'primary',
  size = 'base',
  iconLeading,
  iconTrailing,
  iconOnly = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center justify-center border font-display transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-content-brand-brand',
        'disabled:cursor-not-allowed',
        iconOnly ? SIZE_ICON[size] : SIZE[size],
        VARIANT[variant],
        className,
      )}
    >
      {iconLeading != null && <span className="shrink-0">{iconLeading}</span>}
      {!iconOnly && children}
      {iconOnly && children}
      {iconTrailing != null && <span className="shrink-0">{iconTrailing}</span>}
    </button>
  );
}
