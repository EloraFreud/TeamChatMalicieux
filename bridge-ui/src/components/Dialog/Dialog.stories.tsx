import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'padded' },
  args: {
    title: 'Are you sure you want to refund this payment?',
    description:
      'The refund will be reflected in the customer’s bank account 2 to 3 business days after processing.',
    confirmLabel: 'Refund',
    cancelLabel: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};

export const WithSlot: Story = {
  args: {
    title: 'Delete project',
    description: 'This will permanently remove the project and all of its data.',
    confirmLabel: 'Delete',
  },
  render: (args) => (
    <Dialog {...args}>
      <Checkbox label="I understand this is permanent" />
    </Dialog>
  ),
};

// Modal composition: the Dialog card centered over a dim backdrop.
export const AsModal: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="relative flex h-[480px] items-center justify-center overflow-hidden bg-background-secondary">
      <div className="absolute inset-0 bg-background-inverseprimary opacity-[0.64]" aria-hidden />
      <Dialog {...args} className="relative z-10" />
    </div>
  ),
};
