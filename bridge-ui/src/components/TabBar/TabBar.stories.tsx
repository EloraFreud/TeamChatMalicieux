import type { Meta, StoryObj } from '@storybook/react';
import { House, MagnifyingGlass, Bell, CreditCard, User } from '@phosphor-icons/react';
import { TabBar, type TabBarItem } from './TabBar';

const items: TabBarItem[] = [
  { value: 'home', label: 'Home', icon: <House size={24} /> },
  { value: 'search', label: 'Search', icon: <MagnifyingGlass size={24} /> },
  { value: 'alerts', label: 'Alerts', icon: <Bell size={24} /> },
  { value: 'wallet', label: 'Wallet', icon: <CreditCard size={24} /> },
  { value: 'profile', label: 'Profile', icon: <User size={24} /> },
];

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  args: { items, defaultValue: 'home', showHomeIndicator: true },
};
export default meta;

type Story = StoryObj<typeof TabBar>;

export const FiveTabs: Story = {};

export const ActiveSearch: Story = {
  args: { defaultValue: 'search' },
};

export const WithoutHomeIndicator: Story = {
  args: { showHomeIndicator: false },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <TabBar items={items} defaultValue="home" />
      <TabBar items={items} defaultValue="alerts" />
      <TabBar items={items} defaultValue="profile" showHomeIndicator={false} />
    </div>
  ),
};
