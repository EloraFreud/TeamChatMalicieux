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

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} disabled>
          Button text
        </Button>
      ))}
    </div>
  ),
};
