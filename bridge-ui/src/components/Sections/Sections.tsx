import type { ReactNode } from 'react';
import { Check } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export type SectionsImagePosition = 'left' | 'right';

export interface SectionsProps {
  /** Small eyebrow above the title. */
  subtitle?: ReactNode;
  /** Section heading. */
  title: ReactNode;
  /** Lead paragraph. */
  body?: ReactNode;
  /** Optional bulleted feature list (each gets a brand check icon). */
  items?: ReactNode[];
  /** Image URL; when absent a muted placeholder is shown. */
  imageSrc?: string;
  /** Caption under the image. */
  caption?: ReactNode;
  /** Secondary line under the caption. */
  captionSub?: ReactNode;
  /** Which side the image sits on. */
  imagePosition?: SectionsImagePosition;
  /** Primary CTA (e.g. a <Button variant="primary">). */
  primaryAction?: ReactNode;
  /** Secondary CTA (e.g. a <Button variant="outline">). */
  secondaryAction?: ReactNode;
  className?: string;
}

/**
 * Sections — marketing content block pairing an image with text. Figma: Sections
 * (Image = Left/Right, Device = Desktop/Mobile). Stacks vertically on small screens.
 */
export function Sections({
  subtitle,
  title,
  body,
  items,
  imageSrc,
  caption,
  captionSub,
  imagePosition = 'left',
  primaryAction,
  secondaryAction,
  className,
}: SectionsProps) {
  const hasCaption = caption != null || captionSub != null;

  return (
    <section
      className={cn(
        'flex flex-col gap-16 rounded-lg border border-border-primary bg-background-primary p-12',
        imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse',
        className,
      )}
    >
      {/* Image side */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="overflow-hidden rounded-lg bg-background-secondary">
          {imageSrc != null ? (
            <img src={imageSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="min-h-[300px] w-full" aria-hidden />
          )}
        </div>
        {hasCaption && (
          <div className="flex flex-col gap-1">
            {caption != null && (
              <span className="text-label-small text-content-secondary">{caption}</span>
            )}
            {captionSub != null && (
              <span className="text-paragraph-small text-content-tertiary">{captionSub}</span>
            )}
          </div>
        )}
      </div>

      {/* Content side */}
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-2">
          {subtitle != null && (
            <span className="font-display text-label-small text-content-tertiary">{subtitle}</span>
          )}
          <h2 className="font-display text-heading-large text-content-primary">{title}</h2>
        </div>

        {body != null && (
          <p className="text-paragraph-small text-content-secondary">{body}</p>
        )}

        {items != null && items.length > 0 && (
          <ul className="flex flex-col gap-3.5">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <Check
                  weight="bold"
                  size={20}
                  className="shrink-0 text-content-brand-brand"
                  aria-hidden
                />
                <span className="text-paragraph-small text-content-secondary">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {(primaryAction != null || secondaryAction != null) && (
          <div className="flex gap-4">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </section>
  );
}
