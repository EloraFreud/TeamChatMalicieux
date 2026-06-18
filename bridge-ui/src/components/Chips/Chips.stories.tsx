import type { Meta, StoryObj } from '@storybook/react';
import { Chips } from './Chips';

const Dot = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

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
