import type { ComponentType, ReactNode } from 'react';
import {
  Info,
  CheckCircle,
  Warning,
  WarningDiamond,
  X,
  type IconProps,
} from '@phosphor-icons/react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';

export type SnackbarSeverity = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarProps {
  severity?: SnackbarSeverity;
  title: ReactNode;
  description?: ReactNode;
  onClose?: () => void;
  className?: string;
}

// Literal class strings so Tailwind's JIT keeps them.
// bg = Background/Extensions/*, border = Border/Extensions/*, text = Content/Extensions/*.
const SEVERITY: Record<
  SnackbarSeverity,
  { iconBg: string; iconBorder: string; iconText: string; Icon: ComponentType<IconProps> }
> = {
  info: {
    iconBg: 'bg-background-extensions-info',
    iconBorder: 'border-border-extensions-info',
    iconText: 'text-content-extensions-info',
    Icon: Info,
  },
  success: {
    iconBg: 'bg-background-extensions-success',
    iconBorder: 'border-border-extensions-success',
    iconText: 'text-content-extensions-success',
    Icon: CheckCircle,
  },
  warning: {
    iconBg: 'bg-background-extensions-warning',
    iconBorder: 'border-border-extensions-warning',
    iconText: 'text-content-extensions-warning',
    Icon: Warning,
  },
  error: {
    iconBg: 'bg-background-extensions-error',
    iconBorder: 'border-border-extensions-error',
    iconText: 'text-content-extensions-error',
    Icon: WarningDiamond,
  },
};

/**
 * Snackbar — toast notification. Figma: Snackbar (Severity = Info/Success/Warning/Error).
 * Leading severity icon badge + title/description column + optional dismiss button.
 */
export function Snackbar({
  severity = 'info',
  title,
  description,
  onClose,
  className,
}: SnackbarProps) {
  const { iconBg, iconBorder, iconText, Icon } = SEVERITY[severity];

  return (
    <div
      className={cn(
        'inline-flex max-w-[472px] flex-row items-center gap-3 rounded-xl border border-border-secondary bg-background-primary p-3',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-md border',
          iconBg,
          iconBorder,
          iconText,
        )}
      >
        <Icon size={20} aria-hidden />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-heading-tiny text-content-primary">{title}</span>
        {description != null && (
          <span className="text-paragraph-small text-content-secondary">{description}</span>
        )}
      </div>
      {onClose != null && (
        <Button variant="plain" size="base" iconOnly aria-label="Dismiss" onClick={onClose}>
          <X size={16} />
        </Button>
      )}
    </div>
  );
}
