import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, type SnackbarSeverity } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  argTypes: {
    severity: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] },
  },
  args: {
    title: 'Event updated',
    description: 'Your changes have been saved successfully.',
    onClose: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'Heads up',
    description: 'A new version of the app is available.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    title: 'Event updated',
    description: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: 'Storage almost full',
    description: 'You have used 90% of your available storage.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    title: 'Upload failed',
    description: 'Something went wrong. Please try again.',
  },
};

const ALL: { severity: SnackbarSeverity; title: string; description: string }[] = [
  { severity: 'info', title: 'Heads up', description: 'A new version of the app is available.' },
  { severity: 'success', title: 'Event updated', description: 'Your changes have been saved successfully.' },
  { severity: 'warning', title: 'Storage almost full', description: 'You have used 90% of your available storage.' },
  { severity: 'error', title: 'Upload failed', description: 'Something went wrong. Please try again.' },
];

export const States: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {ALL.map((s) => (
        <Snackbar key={s.severity} {...s} onClose={() => {}} />
      ))}
    </div>
  ),
};
