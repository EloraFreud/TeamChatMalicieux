import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Components/ContactForm',
  component: ContactForm,
  parameters: { layout: 'padded' },
  argTypes: { device: { control: 'inline-radio', options: ['desktop', 'mobile'] } },
  args: {
    onSubmit: (e) => e.preventDefault(),
  },
};
export default meta;

type Story = StoryObj<typeof ContactForm>;

export const Desktop: Story = {
  args: { device: 'desktop' },
  render: (args) => (
    <div className="max-w-2xl">
      <ContactForm {...args} />
    </div>
  ),
};

export const Mobile: Story = {
  args: { device: 'mobile' },
  render: (args) => <ContactForm {...args} />,
};

export const Overview: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="max-w-2xl flex-1">
        <ContactForm {...args} device="desktop" />
      </div>
      <ContactForm {...args} device="mobile" />
    </div>
  ),
};
