import type { Meta, StoryObj } from '@storybook/react';
import { Circle } from '@phosphor-icons/react';
import { Chips } from './Chips';

const Dot = () => <Circle size={16} aria-hidden />;

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  args: { label: 'Label', icon: <Dot /> },
};
export default meta;

type Story = StoryObj<typeof Chips>;

export const Default: Story = { args: { onRemove: () => {} } };

export const WithoutRemove: Story = {};

export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {['Design', 'Engineering', 'Product'].map((l) => (
        <Chips key={l} label={l} icon={<Dot />} onRemove={() => {}} />
      ))}
    </div>
  ),
};

// Figma states Default/Hover/Pressed — hover & pressed forced via the pseudo-states addon.
export const States: Story = {
  parameters: { pseudo: { hover: ['.pseudo-hover'], active: ['.pseudo-press'] } },
  render: () => (
    <div className="flex items-start gap-6">
      {[
        ['Default', ''],
        ['Hover', 'pseudo-hover'],
        ['Pressed', 'pseudo-press'],
      ].map(([label, cls]) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <Chips label="Label" icon={<Dot />} onRemove={() => {}} className={cls} />
          <span className="text-paragraph-tiny text-content-tertiary">{label}</span>
        </div>
      ))}
    </div>
  ),
};
