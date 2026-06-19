import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from './DescriptionList';

const meta: Meta<typeof DescriptionList> = {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  args: {
    items: [
      { term: 'Full name', details: 'Jane Cooper' },
      { term: 'Email', details: 'jane.cooper@example.com' },
      { term: 'Role', details: 'Product Designer' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <div className="max-w-[480px]">
      <DescriptionList
        items={[
          { term: 'Full name', details: 'Jane Cooper' },
          { term: 'Email', details: 'jane.cooper@example.com' },
          { term: 'Role', details: 'Product Designer' },
          { term: 'Location', details: 'Paris, France' },
          { term: 'Member since', details: 'June 2024' },
        ]}
      />
    </div>
  ),
};
