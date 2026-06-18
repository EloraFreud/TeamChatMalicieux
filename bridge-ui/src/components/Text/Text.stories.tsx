import type { Meta, StoryObj } from '@storybook/react';
import { Link as LinkIcon, ArrowRight } from '@phosphor-icons/react';
import { Text } from './Text';

const Link = () => <LinkIcon size={16} aria-hidden />;
const Arrow = () => <ArrowRight size={16} aria-hidden />;

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
