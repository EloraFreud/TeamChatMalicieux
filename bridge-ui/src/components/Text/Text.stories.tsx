import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const Link = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M6.5 9.5l3-3M7 4.5l.8-.8a2.5 2.5 0 013.5 3.5l-.8.8M9 11.5l-.8.8a2.5 2.5 0 01-3.5-3.5l.8-.8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  args: { children: 'Text', href: '#' },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Link_: Story = {
  name: 'Link (icon + underline + strong)',
  args: { underline: true, strong: true, iconLeading: <Link />, iconTrailing: <Arrow /> },
};

export const Plain: Story = { args: { iconLeading: <Link />, iconTrailing: <Arrow /> } };

export const Code: Story = {
  args: { type: 'code', href: undefined, children: 'npm install' },
};

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Text href="#" underline strong iconLeading={<Link />} iconTrailing={<Arrow />}>
        Underline + Strong
      </Text>
      <Text href="#" underline iconLeading={<Link />} iconTrailing={<Arrow />}>
        Underline
      </Text>
      <Text href="#" strong iconLeading={<Link />} iconTrailing={<Arrow />}>
        Strong
      </Text>
      <Text href="#" iconLeading={<Link />} iconTrailing={<Arrow />}>
        Default (hover me)
      </Text>
      <Text type="code">const x = 1</Text>
    </div>
  ),
};
