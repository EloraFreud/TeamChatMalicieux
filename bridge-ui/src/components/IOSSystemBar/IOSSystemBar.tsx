import { BatteryFull, CellSignalFull, WifiHigh } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export interface IOSSystemBarProps {
  /** Time shown on the left. */
  time?: string;
  className?: string;
}

/**
 * IOSSystemBar — iOS status bar. Figma 390x44.
 * Time on the left, signal + wifi + battery icons on the right, all Content/Primary.
 */
export function IOSSystemBar({ time = '9:41', className }: IOSSystemBarProps) {
  return (
    <div
      className={cn(
        'flex h-11 w-[390px] max-w-full flex-row items-center justify-between bg-transparent px-6 text-content-primary',
        className,
      )}
    >
      <span className="font-display text-label-base">{time}</span>
      <div className="flex items-center gap-1.5" aria-hidden>
        <CellSignalFull size={18} />
        <WifiHigh size={18} />
        <BatteryFull size={18} />
      </div>
    </div>
  );
}
