import type { Meta, StoryObj } from '@storybook/react';
import { ListBullets, SquaresFour, Rows } from '@phosphor-icons/react';
import { Segmented } from './Segmented';

const meta: Meta<typeof Segmented> = {
  title: 'Components/Segmented',
  component: Segmented,
  args: {
    items: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
    defaultValue: 'week',
  },
};
export default meta;

type Story = StoryObj<typeof Segmented>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    items: [
      { value: 'list', label: 'List', iconLeading: <ListBullets size={16} /> },
      { value: 'grid', label: 'Grid', iconLeading: <SquaresFour size={16} /> },
      { value: 'rows', label: 'Rows', iconLeading: <Rows size={16} /> },
    ],
    defaultValue: 'grid',
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Segmented
        items={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
        defaultValue="day"
      />
      <Segmented
        items={[
          { value: 'list', label: 'List', iconLeading: <ListBullets size={16} /> },
          { value: 'grid', label: 'Grid', iconLeading: <SquaresFour size={16} /> },
        ]}
        defaultValue="list"
      />
      <Segmented
        items={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
        value="two"
      />
    </div>
  ),
};
