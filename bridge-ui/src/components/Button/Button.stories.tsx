import type { Meta, StoryObj } from '@storybook/react';
import { Plus, ArrowRight } from '@phosphor-icons/react';
import { Button, type ButtonVariant, type ButtonSize } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'plain'] },
    size: { control: 'inline-radio', options: ['sm', 'base', 'l', 'xl'] },
  },
  args: { children: 'Button text', variant: 'primary', size: 'base' },
};
export default meta;

type Story = StoryObj<typeof Button>;

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'plain'];
const SIZES: ButtonSize[] = ['sm', 'base', 'l', 'xl'];

export const Primary: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {VARIANTS.map((v) => (
        <Button key={v} variant={v}>
          Button text
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SIZES.map((s) => (
        <Button key={s} size={s}>
          Button text
        </Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  args: { iconLeading: <Plus size={16} />, iconTrailing: <ArrowRight size={16} />, children: 'New report' },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} iconOnly aria-label="Add">
          <Plus size={18} />
        </Button>
      ))}
    </div>
  ),
};

// Full Type × State matrix. Hover/Press/Focus are forced via the pseudo-states addon
// so every Figma state is documented statically.
const STATES = [
  { label: 'Default', cls: '', disabled: false },
  { label: 'Hover', cls: 'pseudo-hover', disabled: false },
  { label: 'Pressed', cls: 'pseudo-press', disabled: false },
  { label: 'Focus', cls: 'pseudo-focus', disabled: false },
  { label: 'Disabled', cls: '', disabled: true },
];

export const States: Story = {
  parameters: {
    pseudo: {
      hover: ['.pseudo-hover'],
      active: ['.pseudo-press'],
      focusVisible: ['.pseudo-focus'],
    },
  },
  render: () => (
    <div className="flex flex-col gap-5">
      {VARIANTS.map((v) => (
        <div key={v} className="flex items-end gap-5">
          <span className="w-20 text-paragraph-small capitalize text-content-secondary">{v}</span>
          {STATES.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <Button variant={v} size="base" className={s.cls} disabled={s.disabled}>
                Button text
              </Button>
              <span className="text-paragraph-tiny text-content-tertiary">{s.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
