import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    labelPosition: { control: 'inline-radio', options: ['leading', 'trailing'] },
  },
  args: { label: 'Allow embedding', labelPosition: 'leading' },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Leading: Story = {
  args: {
    label: 'Allow embedding',
    description: 'Allow others to embed your event details on their own site.',
    labelPosition: 'leading',
  },
  render: (args) => (
    <div className="w-[480px]">
      <Switch {...args} />
    </div>
  ),
};

export const Trailing: Story = {
  args: { label: 'Allow embedding', description: undefined, labelPosition: 'trailing' },
};

export const Standalone: Story = { args: { label: undefined, description: undefined } };

export const OnByDefault: Story = {
  args: { label: 'Notifications', defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: 'Locked setting', disabled: true, defaultChecked: true },
};
