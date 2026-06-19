import type { Meta, StoryObj } from '@storybook/react';
import { Keyboard } from './Keyboard';

const meta = {
  title: 'Components/Keyboard',
  component: Keyboard,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    className: { control: false },
  },
} satisfies Meta<typeof Keyboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The keyboard pinned to the bottom of a phone-sized surface, as it appears in-app. */
export const Overview: Story = {
  render: () => (
    <div className="flex min-h-[420px] w-[390px] max-w-full flex-col justify-end bg-background-secondary">
      <Keyboard />
    </div>
  ),
};
