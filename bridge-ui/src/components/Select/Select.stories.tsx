import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    items: [
      { value: 'fr', label: 'France' },
      { value: 'be', label: 'Belgium' },
      { value: 'ch', label: 'Switzerland' },
      { value: 'ca', label: 'Canada' },
    ],
  },
  render: (args) => (
    <div className="w-[320px]">
      <Select {...args} />
    </div>
  ),
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Closed: Story = {};

export const Open: Story = {
  render: (args) => (
    <div className="h-[260px] w-[320px]">
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>('[role="combobox"]');
    trigger?.click();
  },
};

export const WithSelection: Story = {
  args: { defaultValue: 'ch' },
};

export const WithHeader: Story = {
  args: {
    label: 'Country',
    description: 'Where the event takes place.',
    header: 'Suggested',
    defaultValue: 'fr',
  },
  render: (args) => (
    <div className="h-[300px] w-[320px]">
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>('[role="combobox"]');
    trigger?.click();
  },
};
