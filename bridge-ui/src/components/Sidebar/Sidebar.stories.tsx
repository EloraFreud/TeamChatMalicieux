import type { Meta, StoryObj } from '@storybook/react';
import {
  House,
  ChartBar,
  Users,
  Calendar,
  Gear,
  SignOut,
} from '@phosphor-icons/react';
import { Sidebar } from './Sidebar';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { icon: <House size={16} />, label: 'Accueil', active: true },
  { icon: <ChartBar size={16} />, label: 'Statistiques' },
  { icon: <Users size={16} />, label: 'Équipe' },
  { icon: <Calendar size={16} />, label: 'Agenda' },
  { icon: <Gear size={16} />, label: 'Paramètres' },
];

export const Default: Story = {
  args: {
    header: (
      <span className="text-label-base font-display text-content-primary">
        Jujotte
      </span>
    ),
    items,
    footer: (
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-label-small font-display text-content-secondary hover:bg-background-secondary"
      >
        <SignOut size={16} />
        <span>Déconnexion</span>
      </button>
    ),
  },
};

export const WithAvatarFooter: Story = {
  args: {
    header: (
      <span className="text-label-base font-display text-content-primary">
        Jujotte
      </span>
    ),
    items,
    footer: (
      <div className="flex items-center gap-3">
        <Avatar size={32} initials="EF" />
        <div className="flex flex-col">
          <span className="text-label-small font-display text-content-primary">
            Elora F.
          </span>
          <span className="text-paragraph-tiny text-content-secondary">
            elora@jujotte.fr
          </span>
        </div>
      </div>
    ),
  },
};

export const NoHeaderNoFooter: Story = {
  args: { items },
};

export const Overview: Story = {
  args: { items },
  render: () => (
    <div className="flex h-[600px] gap-8 bg-background-secondary p-8">
      <Sidebar
        header={
          <span className="text-label-base font-display text-content-primary">
            Jujotte
          </span>
        }
        items={items}
        footer={
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-label-small font-display text-content-secondary hover:bg-background-secondary"
          >
            <SignOut size={16} />
            <span>Déconnexion</span>
          </button>
        }
      />
      <Sidebar items={items} />
    </div>
  ),
};
