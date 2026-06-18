import type { Meta, StoryObj } from '@storybook/react';
import { EnvelopeSimple, Question, CaretUpDown } from '@phosphor-icons/react';
import { Input } from './Input';

const Mail = () => <EnvelopeSimple size={18} aria-hidden />;
const Help = () => <Question size={18} aria-hidden />;

// Country selector shown inside the phone field (white pill: flag + up/down) + dial code.
// TODO(DS): this is a placeholder. In Figma the selector is `.baseComponents/.ListboxButton`
// — replace <CountrySelect /> with the real DS <Select>/<Listbox> component once it's built
// (batch with Select/Dropdown/Listbox), wiring it as the Input `leadingAddon`.
// Note: the flag is a plain SVG — Phosphor has no country flags (Figma uses its own Flags set).
const FrFlag = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden className="rounded-[2px]">
    <rect width="6" height="14" fill="#0055A4" />
    <rect x="6" width="6" height="14" fill="#ffffff" />
    <rect x="12" width="6" height="14" fill="#EF4135" />
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
      <CaretUpDown size={12} />
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

export const States: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-5">
      <Input label="Default" placeholder="Jane Doe" leadingIcon={<Mail />} />
      <Input label="Filled" defaultValue="jane@doe.com" leadingIcon={<Mail />} />
      <Input label="Disabled" placeholder="Jane Doe" leadingIcon={<Mail />} disabled />
    </div>
  ),
};
