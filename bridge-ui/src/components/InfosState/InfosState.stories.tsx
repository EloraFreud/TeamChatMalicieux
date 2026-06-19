import type { Meta, StoryObj } from '@storybook/react';
import { InfosState } from './InfosState';

const meta: Meta<typeof InfosState> = {
  title: 'Components/InfosState',
  component: InfosState,
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'load'] },
  },
  args: {
    title: 'rapport-annuel.pdf',
    description: '2.4 MB',
  },
};
export default meta;

type Story = StoryObj<typeof InfosState>;

export const Default: Story = {
  args: { state: 'default' },
};

export const Load: Story = {
  args: { state: 'load', title: 'rapport-annuel.pdf', description: 'Téléversement…' },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InfosState state="default" title="rapport-annuel.pdf" description="2.4 MB" />
      <InfosState state="load" title="rapport-annuel.pdf" description="Téléversement…" />
    </div>
  ),
};
