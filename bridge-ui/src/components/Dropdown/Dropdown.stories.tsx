import type { Meta, StoryObj } from '@storybook/react';
import { User, Bell, CreditCard, Gear } from '@phosphor-icons/react';
import { Dropdown, type DropdownEntry } from './Dropdown';
import { Button } from '../Button';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    align: { control: 'inline-radio', options: ['start', 'end'] },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

const accountItems: DropdownEntry[] = [
  {
    type: 'item',
    label: 'Account',
    icon: <User size={16} />,
    description: 'Manage your profile',
    shortcut: '⌘A',
  },
  {
    type: 'item',
    label: 'Notifications',
    icon: <Bell size={16} />,
    description: 'Email & push alerts',
    shortcut: '⌘N',
  },
  {
    type: 'item',
    label: 'Billing',
    icon: <CreditCard size={16} />,
    description: 'Plans & invoices',
    shortcut: '⌘B',
  },
  { type: 'divider' },
  { type: 'heading', label: 'My events' },
  { type: 'item', label: 'Upcoming' },
  { type: 'item', label: 'Past' },
];

export const Basic: Story = {
  args: { items: accountItems, align: 'start' },
  render: (args) => (
    <div className="flex h-80 items-start p-4">
      <Dropdown {...args} />
    </div>
  ),
};

export const WithIconTrigger: Story = {
  args: { items: accountItems, align: 'start' },
  render: (args) => (
    <div className="flex h-80 items-start p-4">
      <Dropdown
        {...args}
        trigger={
          <Button variant="outline" size="base" iconOnly aria-label="Settings">
            <Gear size={16} />
          </Button>
        }
      />
    </div>
  ),
};

export const WithAvatarTrigger: Story = {
  args: { items: accountItems, align: 'end' },
  render: (args) => (
    <div className="flex h-80 items-start justify-end p-4">
      <Dropdown {...args} trigger={<Avatar initials="EL" />} />
    </div>
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex h-96 items-start gap-12 p-4">
      <Dropdown items={accountItems} />
      <Dropdown
        items={accountItems}
        trigger={
          <Button variant="outline" size="base" iconOnly aria-label="Settings">
            <Gear size={16} />
          </Button>
        }
      />
      <Dropdown items={accountItems} align="end" trigger={<Avatar initials="EL" />} />
    </div>
  ),
};
