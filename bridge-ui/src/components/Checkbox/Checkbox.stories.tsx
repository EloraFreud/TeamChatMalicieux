import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Show on Events Page' },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const WithDescription: Story = {
  args: {
    label: 'Show on Events Page',
    description: 'Make this event visible on your profile.',
    defaultChecked: true,
  },
};

export const LabelOnly: Story = {};

export const Unchecked: Story = { args: { defaultChecked: false } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
