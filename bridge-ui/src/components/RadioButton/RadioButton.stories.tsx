import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  args: { label: 'Allow tickets to be resold', name: 'demo' },
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const WithDescription: Story = {
  args: {
    label: 'Allow tickets to be resold',
    description: 'Customers can resell or transfer their tickets if they can’t make it to the event.',
    defaultChecked: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioButton name="plan" label="Free" description="For individuals." defaultChecked />
      <RadioButton name="plan" label="Pro" description="For growing teams." />
      <RadioButton name="plan" label="Enterprise" description="Advanced controls." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioButton name="s1" label="Unselected" />
      <RadioButton name="s2" label="Selected" defaultChecked />
      <RadioButton name="s3" label="Disabled (unselected)" disabled />
      <RadioButton name="s4" label="Disabled (selected)" disabled defaultChecked />
    </div>
  ),
};
