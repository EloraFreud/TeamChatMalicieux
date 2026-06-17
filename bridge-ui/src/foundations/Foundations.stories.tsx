import type { Meta, StoryObj } from '@storybook/react';

/**
 * Foundations — a smoke test that the token pipeline and fonts render.
 * Not a DS component; it just surfaces generated tokens so /dev-init can be
 * verified visually (and the light/dark toolbar exercised).
 */
const meta: Meta = {
  title: 'Foundations/Overview',
};
export default meta;

type Story = StoryObj;

const Swatch = ({ name, className }: { name: string; className: string }) => (
  <div className="flex flex-col gap-1">
    <div className={`h-12 w-full rounded border border-border-primary ${className}`} />
    <span className="text-content-secondary text-paragraph-tiny">{name}</span>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 max-w-2xl">
      <Swatch name="background-primary" className="bg-background-primary" />
      <Swatch name="background-secondary" className="bg-background-secondary" />
      <Swatch name="background-brand-brand" className="bg-background-brand-brand" />
      <Swatch name="background-brand-accent" className="bg-background-brand-accent" />
      <Swatch name="content-primary" className="bg-content-primary" />
      <Swatch name="content-secondary" className="bg-content-secondary" />
      <Swatch name="background-extensions-error" className="bg-background-extensions-error" />
      <Swatch name="background-extensions-success" className="bg-background-extensions-success" />
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="font-display text-heading-large">Cal Sans — Heading Large</p>
      <p className="font-display text-label-base">Cal Sans — Label Base</p>
      <p className="font-sans text-paragraph-base">DM Sans — Paragraph Base (body text)</p>
      <p className="font-sans text-paragraph-small text-content-secondary">
        DM Sans — Paragraph Small, secondary content.
      </p>
    </div>
  ),
};
