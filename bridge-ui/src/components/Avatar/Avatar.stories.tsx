import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, type AvatarSize } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    type: { control: 'inline-radio', options: ['circular', 'rounded'] },
    size: { control: 'inline-radio', options: [20, 24, 32, 40] },
  },
  args: { type: 'circular', size: 40, initials: 'TW' },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

const SIZES: AvatarSize[] = [20, 24, 32, 40];
const SAMPLE = 'https://i.pravatar.cc/80?img=5';

export const Initials: Story = {};

export const Image: Story = { args: { src: SAMPLE, alt: 'Sample user' } };

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {SIZES.map((s) => (
        <Avatar key={s} {...args} size={s} />
      ))}
    </div>
  ),
};

export const CircularVsRounded: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar type="circular" size={40} initials="TW" />
      <Avatar type="rounded" size={40} initials="TW" />
      <Avatar type="circular" size={40} src={SAMPLE} alt="Sample" />
      <Avatar type="rounded" size={40} src={SAMPLE} alt="Sample" />
    </div>
  ),
};

// Full Type × Size matrix (initials + image rows).
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      {(['circular', 'rounded'] as const).map((type) => (
        <div key={type} className="flex items-end gap-4">
          <span className="w-16 text-paragraph-small capitalize text-content-secondary">{type}</span>
          {SIZES.map((s) => (
            <Avatar key={`i-${s}`} type={type} size={s} initials="TW" />
          ))}
          {SIZES.map((s) => (
            <Avatar key={`img-${s}`} type={type} size={s} src={SAMPLE} alt="Sample" />
          ))}
        </div>
      ))}
    </div>
  ),
};
