import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Components/ContactForm',
  component: ContactForm,
  parameters: { layout: 'padded' },
  args: {
    onSubmit: (e) => e.preventDefault(),
  },
};
export default meta;

type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <ContactForm {...args} />
    </div>
  ),
};

export const Overview: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-8">
      <ContactForm {...args} />
    </div>
  ),
};
