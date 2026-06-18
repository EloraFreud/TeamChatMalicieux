import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  argTypes: {
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: { type: 'number' } },
  },
  args: { percent: 50, label: 'Complete' },
};
export default meta;

type Story = StoryObj<typeof Chart>;

export const TwentyFive: Story = { args: { percent: 25, label: 'Complete' } };
export const Fifty: Story = { args: { percent: 50, label: 'Complete' } };
export const SeventyFive: Story = { args: { percent: 75, label: 'Complete' } };
export const Hundred: Story = { args: { percent: 100, label: 'Complete' } };

const STEPS = [25, 50, 75, 100];

export const Overview: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {STEPS.map((p) => (
        <Chart key={p} percent={p} label="Complete" />
      ))}
    </div>
  ),
};
