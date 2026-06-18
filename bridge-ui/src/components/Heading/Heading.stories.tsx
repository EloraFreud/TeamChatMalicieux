import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Button } from '../Button';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  argTypes: { variant: { control: 'inline-radio', options: ['heading', 'subheading'] } },
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const WithActions: Story = {
  args: { title: 'Payment', variant: 'heading' },
  render: (args) => (
    <div className="w-[640px]">
      <Heading
        {...args}
        actions={
          <>
            <Button variant="outline" size="base">
              Cancel
            </Button>
            <Button variant="primary" size="base">
              Refund
            </Button>
          </>
        }
      />
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { title: 'Settings', variant: 'heading' },
  render: (args) => (
    <div className="w-[640px]">
      <Heading {...args} />
    </div>
  ),
};

export const Subheading: Story = {
  args: { title: 'General', variant: 'subheading' },
};
