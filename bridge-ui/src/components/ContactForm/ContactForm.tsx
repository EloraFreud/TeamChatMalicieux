import { type FormEvent } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';

export interface ContactFormProps {
  /** Called when the form is submitted. Default-prevents nothing — wire it yourself. */
  onSubmit?: (e: FormEvent) => void;
  /** Figma device variant: 'desktop' lays name/email rows side-by-side; 'mobile' stacks them. */
  device?: 'desktop' | 'mobile';
  className?: string;
}

/**
 * ContactForm — contact card composing the field components (Input, TextArea,
 * Checkbox, Button). Figma: Device Desktop/Mobile. On mobile the paired fields
 * stack and the padding tightens; desktop also stacks below the `sm` breakpoint.
 */
export function ContactForm({ onSubmit, device = 'desktop', className }: ContactFormProps) {
  const isMobile = device === 'mobile';
  const rowClass = isMobile ? 'flex flex-col gap-6' : 'flex flex-col gap-10 sm:flex-row';

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'rounded-2xl border border-border-primary bg-background-primary',
        isMobile && 'max-w-[342px]',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-10', isMobile ? 'p-8' : 'p-12')}>
        <div className="flex flex-col gap-8">
          <div className={rowClass}>
            <Input
              className="flex-1"
              label="Prénom"
              name="firstName"
              autoComplete="given-name"
              placeholder="Camille"
              required
            />
            <Input
              className="flex-1"
              label="Nom"
              name="lastName"
              autoComplete="family-name"
              placeholder="Durand"
              required
            />
          </div>
          <div className={rowClass}>
            <Input
              className="flex-1"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="camille.durand@exemple.fr"
              required
            />
            <Input
              className="flex-1"
              label="Téléphone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
            />
          </div>
          <TextArea
            label="Message"
            name="message"
            placeholder="Parlez-nous de votre événement…"
            helperText="Décrivez votre projet en quelques lignes."
            required
          />
        </div>
        <Checkbox
          name="consent"
          label="J'accepte d'être recontacté(e)"
          description="Vos données ne seront utilisées que pour répondre à votre demande."
          required
        />
        <Button type="submit" variant="primary" size="xl" iconTrailing={<ArrowRight size={20} />}>
          Envoyer
        </Button>
      </div>
    </form>
  );
}
