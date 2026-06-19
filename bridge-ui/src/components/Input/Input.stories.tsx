import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EnvelopeSimple, Question } from '@phosphor-icons/react';
import { Input } from './Input';
import { Listbox } from '../Listbox';

const Mail = () => <EnvelopeSimple size={18} aria-hidden />;
const Help = () => <Question size={18} aria-hidden />;

// Circular band-flags, matching the round Figma Flags set. (Figma's flags are raster images;
// for the phone selector we render simple circular SVGs for the common dial codes.)
const CircleFlag = ({ bands, dir = 'v' }: { bands: string[]; dir?: 'v' | 'h' }) => (
  <span className="inline-block h-4 w-4 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
    <svg viewBox="0 0 3 3" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {bands.map((c, i) =>
        dir === 'v' ? (
          <rect key={i} x={i} y={0} width={1} height={3} fill={c} />
        ) : (
          <rect key={i} x={0} y={i} width={3} height={1} fill={c} />
        ),
      )}
    </svg>
  </span>
);

const COUNTRIES = [
  { value: 'fr', name: 'France', dial: '+33', flag: <CircleFlag bands={['#0055A4', '#ffffff', '#EF4135']} /> },
  { value: 'be', name: 'Belgium', dial: '+32', flag: <CircleFlag bands={['#2D2926', '#FFD90C', '#F31830']} /> },
  { value: 'it', name: 'Italy', dial: '+39', flag: <CircleFlag bands={['#009246', '#ffffff', '#CE2B37']} /> },
  { value: 'es', name: 'Spain', dial: '+34', flag: <CircleFlag dir="h" bands={['#AA151B', '#F1BF00', '#AA151B']} /> },
  { value: 'de', name: 'Germany', dial: '+49', flag: <CircleFlag dir="h" bands={['#000000', '#DD0000', '#FFCE00']} /> },
  { value: 'lu', name: 'Luxembourg', dial: '+352', flag: <CircleFlag dir="h" bands={['#ED2939', '#ffffff', '#00A1DE']} /> },
];

// Phone field: the DS Listbox is the country selector (selected flag in the trigger,
// dial code in each item label), wired as the Input `leadingAddon`.
function PhoneField(args: ComponentProps<typeof Input>) {
  const [country, setCountry] = useState('fr');
  const current = COUNTRIES.find((c) => c.value === country) ?? COUNTRIES[0];
  return (
    <div className="w-[520px]">
      <Input
        {...args}
        leadingAddon={
          <div className="w-44">
            <Listbox
              value={country}
              onValueChange={setCountry}
              triggerLeading={current.flag}
              items={COUNTRIES.map((c) => ({
                value: c.value,
                label: `${c.name} ${c.dial}`,
                leading: c.flag,
              }))}
            />
          </div>
        }
      />
    </div>
  );
}

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
    label: 'Phone',
    required: true,
    helperText: 'Helper text',
    placeholder: '00 00 00 00 00',
    trailingIcon: <Help />,
    inputMode: 'tel',
  },
  render: (args) => <PhoneField {...args} />,
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
