import { cn } from '../../lib/cn';

export type AvatarSize = 20 | 24 | 32 | 40;

export interface AvatarProps {
  type?: 'circular' | 'rounded';
  size?: AvatarSize;
  /** Image URL. When absent, initials are shown on an inverse-primary background. */
  src?: string;
  alt?: string;
  initials?: string;
  className?: string;
}

// box dimensions map to the spacing scale (20/24/32/40px).
const BOX: Record<AvatarSize, string> = {
  20: 'h-5 w-5',
  24: 'h-6 w-6',
  32: 'h-8 w-8',
  40: 'h-10 w-10',
};

// initials type scale per size. 24/32/40 map to Label tokens; 20px (10px font) has no
// DS text style — Figma uses an un-tokenized 10px there, mirrored with an arbitrary value.
const FONT: Record<AvatarSize, string> = {
  20: 'text-[10px] leading-none',
  24: 'text-label-tiny',
  32: 'text-label-small',
  40: 'text-label-base',
};

/**
 * Avatar — circular or rounded, image or initials. Figma: Avatar (Type × Size × Initials).
 */
export function Avatar({
  type = 'circular',
  size = 40,
  src,
  alt = '',
  initials = 'TW',
  className,
}: AvatarProps) {
  const shape = type === 'circular' ? 'rounded-full' : 'rounded-md';
  const base = cn('inline-flex shrink-0 overflow-hidden', BOX[size], shape, className);

  if (src) {
    return (
      <span className={base}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        base,
        'items-center justify-center bg-background-inverseprimary font-display text-content-inverseprimary',
        FONT[size],
      )}
      aria-label={alt || initials}
      role="img"
    >
      {initials}
    </span>
  );
}
