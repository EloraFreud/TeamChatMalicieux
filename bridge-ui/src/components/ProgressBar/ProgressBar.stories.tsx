import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: { value: 63 },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Empty: Story = { args: { value: 0 } };

export const Partial: Story = { args: { value: 63 } };

export const Full: Story = { args: { value: 100 } };

export const States: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {[
        ['Not started', 0],
        ['Start', 63],
        ['End', 100],
      ].map(([label, value]) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <ProgressBar value={value as number} />
          <span className="text-paragraph-tiny text-content-tertiary">{label}</span>
        </div>
      ))}
    </div>
  ),
};
