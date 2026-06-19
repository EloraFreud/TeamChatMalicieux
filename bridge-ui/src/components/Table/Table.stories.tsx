import type { Meta, StoryObj } from '@storybook/react';
import { Table, type TableColumn } from './Table';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['basic', 'striped', 'grid', 'avatar', 'dropdowns', 'full-width'],
    },
  },
};
export default meta;

type User = {
  name: string;
  email: string;
  access: string;
};

type Story = StoryObj<typeof Table<User>>;

const USERS: User[] = [
  { name: 'Camille Jourdain', email: 'camille@jujotte.fr', access: 'Admin' },
  { name: 'Théo Marchand', email: 'theo@jujotte.fr', access: 'Editor' },
  { name: 'Inès Lefèvre', email: 'ines@jujotte.fr', access: 'Viewer' },
  { name: 'Lucas Bonnet', email: 'lucas@jujotte.fr', access: 'Editor' },
];

// A cell that renders a primary line + secondary description.
const nameCell = (row: User) => (
  <div className="flex flex-col">
    <span className="font-display text-label-small text-content-primary">{row.name}</span>
    <span className="text-paragraph-small text-content-tertiary">{row.email}</span>
  </div>
);

const BASE_COLUMNS: TableColumn<User>[] = [
  { key: 'name', header: 'Name', render: nameCell },
  { key: 'email', header: 'Email' },
  { key: 'access', header: 'Access' },
];

const AVATAR_COLUMNS: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar size={32} initials={initials(row.name)} />
        {nameCell(row)}
      </div>
    ),
  },
  { key: 'email', header: 'Email' },
  { key: 'access', header: 'Access' },
];

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Basic: Story = {
  args: {
    variant: 'basic',
    title: 'Team members',
    columns: BASE_COLUMNS,
    data: USERS,
  },
};

export const Striped: Story = {
  args: {
    variant: 'striped',
    title: 'Team members',
    columns: BASE_COLUMNS,
    data: USERS,
  },
};

export const Grid: Story = {
  args: {
    variant: 'grid',
    title: 'Team members',
    columns: BASE_COLUMNS,
    data: USERS,
  },
};

export const WithAvatar: Story = {
  args: {
    variant: 'avatar',
    title: 'Team members',
    columns: AVATAR_COLUMNS,
    data: USERS,
  },
};

export const WithDropdowns: Story = {
  args: {
    variant: 'dropdowns',
    title: 'Team members',
    columns: AVATAR_COLUMNS,
    data: USERS,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'full-width',
    title: 'Team members',
    columns: AVATAR_COLUMNS,
    data: USERS,
    pagination: { page: 1, pageCount: 4, total: 32, perPage: 8 },
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Table title="Basic" columns={BASE_COLUMNS} data={USERS} />
      <Table variant="striped" title="Striped rows" columns={BASE_COLUMNS} data={USERS} />
      <Table variant="grid" title="With grid" columns={BASE_COLUMNS} data={USERS} />
      <Table variant="avatar" title="With avatar" columns={AVATAR_COLUMNS} data={USERS} />
      <Table variant="dropdowns" title="With dropdowns" columns={AVATAR_COLUMNS} data={USERS} />
    </div>
  ),
};
