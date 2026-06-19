import type { ReactNode } from 'react';
import { ArrowFatUp, Backspace, Smiley } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

export interface KeyboardProps {
  className?: string;
}

const ROW_1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const ROW_2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const ROW_3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

const KEY_BASE =
  'flex h-10 min-w-0 items-center justify-center rounded-md text-label-base font-sans text-content-primary shadow-sm';

/** A single presentational key. Rendered as a non-interactive <button>. */
function Key({
  children,
  special = false,
  className,
  label,
}: {
  children: ReactNode;
  special?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      className={cn(
        KEY_BASE,
        special ? 'bg-background-secondary' : 'bg-background-primary',
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * Keyboard — stylized iOS QWERTY keyboard (presentational). Figma: 390x342.
 * A Background/Tertiary tray with rounded top corners holding four rows of keys.
 * Keys are rendered as non-interactive <button>s (no input behaviour); special keys
 * (shift, delete, 123, emoji, return) sit on Background/Secondary.
 */
export function Keyboard({ className }: KeyboardProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex w-[390px] max-w-full select-none flex-col gap-2.5 rounded-t-3xl bg-background-tertiary p-1.5',
        className,
      )}
    >
      {/* Row 1 */}
      <div className="flex gap-1.5">
        {ROW_1.map((k) => (
          <Key key={k} className="flex-1">
            {k}
          </Key>
        ))}
      </div>

      {/* Row 2 — inset so the 9 keys sit centred under row 1 */}
      <div className="flex gap-1.5 px-4">
        {ROW_2.map((k) => (
          <Key key={k} className="flex-1">
            {k}
          </Key>
        ))}
      </div>

      {/* Row 3 — shift + letters + delete */}
      <div className="flex gap-1.5">
        <Key special label="Shift" className="basis-12">
          <ArrowFatUp size={20} />
        </Key>
        {ROW_3.map((k) => (
          <Key key={k} className="flex-1">
            {k}
          </Key>
        ))}
        <Key special label="Delete" className="basis-12">
          <Backspace size={20} />
        </Key>
      </div>

      {/* Row 4 — 123 + emoji + space + return */}
      <div className="flex gap-1.5">
        <Key special label="Numbers" className="basis-12 text-label-small">
          123
        </Key>
        <Key special label="Emoji" className="basis-10">
          <Smiley size={20} />
        </Key>
        <Key className="flex-[5] text-label-small">space</Key>
        <Key special label="Return" className="basis-16 text-label-small">
          return
        </Key>
      </div>
    </div>
  );
}
