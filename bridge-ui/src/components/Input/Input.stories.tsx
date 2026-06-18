import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const Mail = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <rect x="2.5" y="4" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const Help = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7.2 7a1.8 1.8 0 113.1 1.3c-.6.5-1.3.9-1.3 1.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="9" cy="12.4" r="0.7" fill="currentColor" />
  </svg>
);

// Country selector shown inside the phone field (white pill: flag + up/down) + dial code.
const FrFlag = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden className="rounded-[2px]">
    <rect width="6" height="14" fill="#0055A4" />
    <rect x="6" width="6" height="14" fill="#ffffff" />
    <rect x="12" width="6" height="14" fill="#EF4135" />
  </svg>
);
const UpDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M4 5l2-2 2 2M4 7l2 2 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CountrySelect = () => (
  <>
    <button
      type="button"
      aria-label="Select country"
      className="inline-flex h-8 items-center gap-2 rounded border border-border-secondary bg-background-primary px-2 text-content-secondary"
    >
      <FrFlag />
      <UpDown />
    </button>
    <span className="text-paragraph-base text-content-secondary">+33</span>
  </>
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

export const Phone: Story = {
  args: {
    required: true,
    helperText: 'Helper text',
    placeholder: '00 00 00 00 00',
    leadingAddon: <CountrySelect />,
    trailingIcon: <Help />,
    inputMode: 'tel',
  },
  render: (args) => (
    <div className="w-[420px]">
      <Input {...args} />
    </div>
  ),
};
