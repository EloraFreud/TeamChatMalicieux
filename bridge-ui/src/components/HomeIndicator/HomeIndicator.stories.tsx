import type { Meta, StoryObj } from '@storybook/react';
import { HomeIndicator } from './HomeIndicator';

const meta = {
  title: 'Components/HomeIndicator',
  component: HomeIndicator,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HomeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <HomeIndicator />
      <div className="bg-background-inverseprimary">
        <HomeIndicator />
      </div>
    </div>
  ),
};
