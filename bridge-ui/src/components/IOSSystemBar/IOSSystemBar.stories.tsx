import type { Meta, StoryObj } from '@storybook/react';
import { IOSSystemBar } from './IOSSystemBar';

const meta = {
  title: 'Components/IOSSystemBar',
  component: IOSSystemBar,
  parameters: { layout: 'centered' },
  argTypes: {
    time: { control: 'text' },
  },
} satisfies Meta<typeof IOSSystemBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { time: '9:41' },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <IOSSystemBar />
      <IOSSystemBar time="10:30" />
      <IOSSystemBar time="23:59" />
    </div>
  ),
};
