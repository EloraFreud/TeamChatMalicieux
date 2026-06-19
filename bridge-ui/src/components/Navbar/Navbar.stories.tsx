import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlass, Bell } from '@phosphor-icons/react';
import { Navbar } from './Navbar';
import { Button } from '../Button';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const logo = <span className="text-label-base font-display text-content-primary">Jujotte</span>;

const items = [
  { label: 'Home', href: '#', active: true },
  { label: 'Projects', href: '#' },
  { label: 'Team', href: '#' },
];

const actions = (
  <>
    <Button variant="plain" size="base" iconOnly aria-label="Search">
      <MagnifyingGlass size={18} />
    </Button>
    <Button variant="plain" size="base" iconOnly aria-label="Notifications">
      <Bell size={18} />
    </Button>
  </>
);

export const Default: Story = {
  args: {
    logo,
    items,
    actions,
    avatar: <Avatar size={32} initials="EF" />,
  },
};

export const Overview: Story = {
  args: { items },
  render: () => (
    <div className="flex flex-col gap-6">
      <Navbar logo={logo} items={items} actions={actions} avatar={<Avatar size={32} initials="EF" />} />
      <Navbar items={items} actions={actions} />
      <Navbar
        logo={logo}
        items={[
          { label: 'Overview', active: true },
          { label: 'Settings' },
        ]}
        avatar={<Avatar size={32} initials="TW" />}
      />
    </div>
  ),
};
