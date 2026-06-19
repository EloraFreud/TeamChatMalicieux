import type { ReactNode } from 'react';
import { UploadSimple, FileArrowUp } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';
import { Button } from '../Button';
import { Badge } from '../Badge';

export interface ImportCardProps {
  /** Title line, e.g. "Drag & drop or click to upload". */
  title?: ReactNode;
  /** Hint line below the title, e.g. "Taille maximale < 50Mb". */
  hint?: ReactNode;
  /** Accepted format labels rendered as zinc badges. */
  formats?: string[];
  /** Called when the upload button is clicked. */
  onUpload?: () => void;
  className?: string;
}

const DEFAULT_FORMATS = ['Excel (.xlsx)', 'PDF', 'Word (.docx)'];

/**
 * ImportCard — a file-upload drop card. Figma: Default | state2 (treated as a
 * hover emphasis via a slightly stronger border). Reuses Button + Badge.
 */
export function ImportCard({
  title = 'Drag & drop or click to upload',
  hint = 'Taille maximale < 50Mb',
  formats = DEFAULT_FORMATS,
  onUpload,
  className,
}: ImportCardProps) {
  return (
    <div
      className={cn(
        'flex w-[440px] flex-col items-center gap-4 rounded-sm border border-border-secondary bg-background-primary p-6 text-center',
        'transition-colors hover:border-border-primary',
        className,
      )}
    >
      <Button variant="outline" size="xl" iconOnly aria-label="Upload" onClick={onUpload}>
        <UploadSimple size={20} />
      </Button>

      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-label-small text-content-primary">{title}</span>
        <span className="text-paragraph-tiny text-content-secondary">{hint}</span>
      </div>

      <div className="flex gap-2">
        {formats.map((format) => (
          <Badge key={format} color="zinc" icon={<FileArrowUp size={12} />}>
            {format}
          </Badge>
        ))}
      </div>
    </div>
  );
}
