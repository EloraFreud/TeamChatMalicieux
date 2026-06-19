import type { Meta, StoryObj } from '@storybook/react';
import { Scroll } from './Scroll';

const meta: Meta<typeof Scroll> = {
  title: 'Components/Scroll',
  component: Scroll,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    thumbSize: { control: { type: 'range', min: 1, max: 100, step: 1 } },
  },
};
export default meta;

type Story = StoryObj<typeof Scroll>;

export const Top: Story = {
  args: { value: 0, thumbSize: 55 },
};

export const Middle: Story = {
  args: { value: 50, thumbSize: 55 },
};

export const Bottom: Story = {
  args: { value: 100, thumbSize: 55 },
};

export const Overview: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      {[0, 50, 100].map((value) => (
        <div key={value} className="flex flex-col items-center gap-2">
          <Scroll value={value} />
          <span className="text-content-secondary text-paragraph-tiny">{value}</span>
        </div>
      ))}
    </div>
  ),
};
