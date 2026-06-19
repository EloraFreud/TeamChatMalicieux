import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  args: { label: 'Label', placeholder: 'Jane Doe' },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Bio',
    description: 'This will be visible to clients on the project.',
    helperText: 'Write a few sentences about yourself.',
  },
  render: (args) => (
    <div className="w-[420px]">
      <TextArea {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-5">
      <TextArea label="Default" placeholder="Jane Doe" />
      <TextArea label="Filled" defaultValue="A few sentences about the project and what to expect." />
      <TextArea label="Disabled" placeholder="Jane Doe" disabled />
    </div>
  ),
};
