import type { Meta, StoryObj } from '@storybook/react';
import { Circle } from '@phosphor-icons/react';
import { Badge, type BadgeColor } from './Badge';

// Phosphor glyph standing in for the DS icon slot (inherits currentColor).
const Dot = () => <Circle size={12} aria-hidden />;

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

// Figma Default/Hover (hover adds a subtle Background/HoverOverlay) — forced via pseudo-states.
export const States: Story = {
  parameters: { pseudo: { hover: ['.pseudo-hover'] } },
  render: () => (
    <div className="flex items-start gap-6">
      {[
        ['Default', ''],
        ['Hover', 'pseudo-hover'],
      ].map(([label, cls]) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <Badge color="blue" icon={<Dot />} className={cls}>
            badge
          </Badge>
          <span className="text-paragraph-tiny text-content-tertiary">{label}</span>
        </div>
      ))}
    </div>
  ),
};
