import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'soft'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: { variant: 'default', orientation: 'horizontal' },
  render: (args) => (
    <div className="w-64">
      <Divider {...args} />
    </div>
  ),
};

export const Soft: Story = {
  args: { variant: 'soft', orientation: 'horizontal' },
  render: (args) => (
    <div className="w-64">
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { variant: 'default', orientation: 'vertical' },
  render: (args) => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-content-secondary text-paragraph-small">Left</span>
      <Divider {...args} />
      <span className="text-content-secondary text-paragraph-small">Right</span>
    </div>
  ),
};
