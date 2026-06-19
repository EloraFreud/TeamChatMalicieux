import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    title: 'Refund this payment?',
    description:
      'The customer will be refunded the full amount. This action cannot be undone.',
    confirmLabel: 'Refund',
    cancelLabel: 'Cancel',
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Refund payment</Button>
        <Dialog {...args} open={open} onOpenChange={setOpen} onConfirm={() => {}} />
      </>
    );
  },
};

export const WithSlot: Story = {
  args: {
    title: 'Delete project',
    description: 'This will permanently remove the project and all of its data.',
    confirmLabel: 'Delete',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Delete project
        </Button>
        <Dialog {...args} open={open} onOpenChange={setOpen} onConfirm={() => {}}>
          <Checkbox
            label="I understand this is permanent"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
          />
        </Dialog>
      </>
    );
  },
};

export const Overview: Story = {
  render: () => {
    const [refundOpen, setRefundOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    return (
      <div className="flex flex-col items-start gap-3">
        <Button onClick={() => setRefundOpen(true)}>Refund payment</Button>
        <Dialog
          open={refundOpen}
          onOpenChange={setRefundOpen}
          title="Refund this payment?"
          description="The customer will be refunded the full amount. This action cannot be undone."
          confirmLabel="Refund"
          onConfirm={() => {}}
        />
        <Button variant="outline" onClick={() => setDeleteOpen(true)}>
          Delete project
        </Button>
        <Dialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Delete project"
          description="This will permanently remove the project and all of its data."
          confirmLabel="Delete"
          onConfirm={() => {}}
        />
      </div>
    );
  },
};
