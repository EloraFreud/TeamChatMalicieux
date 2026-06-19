import type { Meta, StoryObj } from '@storybook/react';
import { User, Bell, CreditCard, Gear } from '@phosphor-icons/react';
import { Listbox, type ListboxItem } from './Listbox';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Listbox> = {
  title: 'Components/Listbox',
  component: Listbox,
  args: { label: 'Assignee', placeholder: 'Select an option' },
  render: (args) => (
    <div className="w-80">
      <Listbox {...args} />
    </div>
  ),
};
export default meta;

type Story = StoryObj<typeof Listbox>;

const basicItems: ListboxItem[] = [
  { value: 'low', label: 'Low priority' },
  { value: 'medium', label: 'Medium priority' },
  { value: 'high', label: 'High priority', description: 'Needs attention today' },
];

const iconItems: ListboxItem[] = [
  { value: 'profile', label: 'Profile', leading: <User size={16} className="text-content-secondary" /> },
  { value: 'alerts', label: 'Alerts', leading: <Bell size={16} className="text-content-secondary" /> },
  { value: 'billing', label: 'Billing', leading: <CreditCard size={16} className="text-content-secondary" /> },
  { value: 'settings', label: 'Settings', leading: <Gear size={16} className="text-content-secondary" /> },
];

const avatarItems: ListboxItem[] = [
  {
    value: 'ada',
    label: 'Ada Lovelace',
    description: 'ada@example.com',
    leading: <Avatar size={24} initials="AL" />,
  },
  {
    value: 'alan',
    label: 'Alan Turing',
    description: 'alan@example.com',
    leading: <Avatar size={24} initials="AT" />,
  },
  {
    value: 'grace',
    label: 'Grace Hopper',
    description: 'grace@example.com',
    leading: <Avatar size={24} initials="GH" />,
  },
];

const Flag = ({ children }: { children: string }) => (
  <span className="inline-flex h-4 w-5 items-center justify-center overflow-hidden rounded-sm text-[12px] leading-none">
    {children}
  </span>
);

const flagItems: ListboxItem[] = [
  { value: 'fr', label: 'France', leading: <Flag>🇫🇷</Flag> },
  { value: 'us', label: 'United States', leading: <Flag>🇺🇸</Flag> },
  { value: 'jp', label: 'Japan', leading: <Flag>🇯🇵</Flag> },
  { value: 'de', label: 'Germany', leading: <Flag>🇩🇪</Flag> },
];

export const Basic: Story = {
  args: { label: 'Priority', placeholder: 'Select priority', items: basicItems },
};

export const WithIcon: Story = {
  args: { label: 'Section', placeholder: 'Select a section', items: iconItems },
};

export const WithAvatar: Story = {
  args: { label: 'Assignee', placeholder: 'Assign to', items: avatarItems },
};

export const WithFlags: Story = {
  args: { label: 'Country', placeholder: 'Select a country', items: flagItems },
};

export const Open: Story = {
  args: { label: 'Section', placeholder: 'Select a section', items: iconItems, defaultValue: 'alerts' },
  render: (args) => (
    <div className="h-72 w-80">
      <Listbox {...args} />
    </div>
  ),
};
