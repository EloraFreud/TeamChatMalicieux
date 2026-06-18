import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { tokens } from '../tokens/tokens';

// The DS fontSize scale uses custom keys (label-base, paragraph-tiny, heading-large…).
// tailwind-merge doesn't know them, so it misreads `text-label-base` as a text-COLOR and
// drops a sibling `text-content-*` color. Register the keys as the font-size group so size
// and color no longer conflict. Keys come from the generated tokens → stays in sync.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: Object.keys(tokens.fontSize) }],
    },
  },
});

/** Merge Tailwind class names, resolving conflicts (last wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
