import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  // Default content = label + description (the full default state).
  args: {
    label: 'Show on Events Page',
    description: 'Make this event visible on your profile.',
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const WithDescription: Story = { args: { defaultChecked: true } };

export const LabelOnly: Story = { args: { description: undefined } };

export const DescriptionOnly: Story = { args: { label: undefined } };

export const Unchecked: Story = { args: { defaultChecked: false } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" description={undefined} />
      <Checkbox label="Checked" description={undefined} defaultChecked />
      <Checkbox label="Disabled (unchecked)" description={undefined} disabled />
      <Checkbox label="Disabled (checked)" description={undefined} disabled defaultChecked />
    </div>
  ),
};
