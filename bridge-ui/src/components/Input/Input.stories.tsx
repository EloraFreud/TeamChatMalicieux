import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const Mail = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <rect x="2.5" y="4" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'About', placeholder: 'Jane Doe' },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { required: true, helperText: 'Helper text', leadingIcon: <Mail /> },
  render: (args) => (
    <div className="w-[420px]">
      <Input {...args} />
    </div>
  ),
};

export const Plain: Story = {
  render: (args) => (
    <div className="w-[420px]">
      <Input {...args} placeholder="Type here" />
    </div>
  ),
};
