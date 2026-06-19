import type { Meta, StoryObj } from '@storybook/react';
import { Progression } from './Progression';

const meta: Meta<typeof Progression> = {
  title: 'Components/Progression',
  component: Progression,
  argTypes: {
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showLabel: { control: 'boolean' },
  },
  args: { percent: 50, showLabel: true },
};
export default meta;

type Story = StoryObj<typeof Progression>;

export const Percent25: Story = { args: { percent: 25 } };
export const Percent50: Story = { args: { percent: 50 } };
export const Percent75: Story = { args: { percent: 75 } };
export const Percent100: Story = { args: { percent: 100 } };

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[25, 50, 75, 100].map((p) => (
        <Progression key={p} percent={p} />
      ))}
    </div>
  ),
};
