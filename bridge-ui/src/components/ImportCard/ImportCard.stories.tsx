import type { Meta, StoryObj } from '@storybook/react';
import { ImportCard } from './ImportCard';

const meta: Meta<typeof ImportCard> = {
  title: 'Components/ImportCard',
  component: ImportCard,
  argTypes: {
    title: { control: 'text' },
    hint: { control: 'text' },
    formats: { control: 'object' },
  },
  args: {
    title: 'Drag & drop or click to upload',
    hint: 'Taille maximale < 50Mb',
  },
};
export default meta;

type Story = StoryObj<typeof ImportCard>;

export const Default: Story = {};

export const CustomFormats: Story = {
  args: {
    title: 'Importer un fichier',
    hint: 'Formats acceptés ci-dessous',
    formats: ['CSV', 'JSON', 'XML'],
  },
};

// Figma Default | state2 — state2 is a hover emphasis (stronger border), forced here.
export const States: Story = {
  parameters: { pseudo: { hover: ['.pseudo-hover'] } },
  render: () => (
    <div className="flex items-start gap-6">
      {[
        ['Default', ''],
        ['Hover (state2)', 'pseudo-hover'],
      ].map(([label, cls]) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <ImportCard className={cls} />
          <span className="text-paragraph-tiny text-content-tertiary">{label}</span>
        </div>
      ))}
    </div>
  ),
};
