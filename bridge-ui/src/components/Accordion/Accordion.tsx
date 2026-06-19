import { useId, useState, type ReactNode } from 'react';
import { CaretDown, CaretUp, Link, ArrowRight } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';
import { Text } from '../Text';

export interface AccordionItem {
  question: ReactNode;
  answer: ReactNode;
  /** Optional "learn more" link rendered in the open body panel. */
  href?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** 'single' (default) keeps only one item open; 'multiple' allows several. */
  type?: 'single' | 'multiple';
  /** Index of the item open on mount. */
  defaultOpenIndex?: number;
  className?: string;
}

/**
 * Accordion — FAQ-style expand/collapse list. Figma: Accordion (State Default/Open).
 * Each item is a rounded card with a header button (question + chevron toggle) and,
 * when open, a secondary body panel with the answer + optional "learn more" link.
 */
export function Accordion({
  items,
  type = 'single',
  defaultOpenIndex,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(
    () => (defaultOpenIndex != null ? new Set([defaultOpenIndex]) : new Set()),
  );

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (type === 'single') next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-border-secondary bg-background-primary"
          >
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-10 px-6 py-6 text-left"
            >
              <span className="font-display text-heading-small text-content-primary">
                {item.question}
              </span>
              <Button
                variant="plain"
                size="base"
                iconOnly
                tabIndex={-1}
                aria-hidden
                className="pointer-events-none shrink-0"
              >
                {isOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
              </Button>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="flex flex-col gap-6 border-t border-border-secondary bg-background-secondary px-10 py-8"
              >
                <div className="text-paragraph-base text-content-secondary">{item.answer}</div>
                {item.href != null && (
                  <Text
                    href={item.href}
                    className="text-content-primary"
                    iconLeading={<Link size={16} />}
                    iconTrailing={<ArrowRight size={16} />}
                  >
                    Learn more
                  </Text>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
