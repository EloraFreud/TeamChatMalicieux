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

// Type × State × Underline × Strong. Hover/Focus forced via the pseudo-states addon.
export const States: Story = {
  parameters: { pseudo: { hover: ['.pseudo-hover'], focusVisible: ['.pseudo-focus'] } },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-3">
        <span className="text-paragraph-tiny uppercase tracking-wide text-content-tertiary">Text</span>
        <Text href="#" iconLeading={<Link />} iconTrailing={<Arrow />}>Default</Text>
        <Text href="#" className="pseudo-hover" iconLeading={<Link />} iconTrailing={<Arrow />}>Hover</Text>
        <Text href="#" strong iconLeading={<Link />} iconTrailing={<Arrow />}>Strong</Text>
        <Text href="#" underline iconLeading={<Link />} iconTrailing={<Arrow />}>Underline</Text>
        <Text href="#" strong underline iconLeading={<Link />} iconTrailing={<Arrow />}>Strong + Underline</Text>
      </div>
      <div className="flex flex-col items-start gap-3">
        <span className="text-paragraph-tiny uppercase tracking-wide text-content-tertiary">Code</span>
        <Text type="code">const x = 1</Text>
        <Text type="code" href="#" className="pseudo-focus">npm install (focus)</Text>
      </div>
    </div>
  ),
};
