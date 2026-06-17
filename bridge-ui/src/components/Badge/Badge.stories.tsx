import type { Meta, StoryObj } from '@storybook/react';
import { Badge, type BadgeColor } from './Badge';

// Small ring glyph standing in for the DS icon slot (inherits currentColor).
const Dot = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'badge', icon: <Dot /> },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { color: 'zinc' } };

const ALL: BadgeColor[] = [
  'zinc', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];

export const AllColors: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-wrap gap-3">
      {ALL.map((c) => (
        <Badge key={c} color={c} icon={<Dot />}>
          {c}
        </Badge>
      ))}
    </div>
  ),
};

export const WithoutIcon: Story = { args: { color: 'green', icon: undefined } };
