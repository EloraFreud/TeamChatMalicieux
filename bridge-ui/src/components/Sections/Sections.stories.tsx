import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight } from '@phosphor-icons/react';
import { Sections } from './Sections';
import { Button } from '../Button';

const meta: Meta<typeof Sections> = {
  title: 'Components/Sections',
  component: Sections,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    imagePosition: { control: 'inline-radio', options: ['left', 'right'] },
  },
  args: {
    subtitle: 'Why Jujotte',
    title: 'Plan less, cook more',
    body: 'Build your weekly menu in minutes, generate a grocery list automatically, and rediscover the joy of cooking without the mental load.',
    items: [
      'Smart menus tailored to your tastes',
      'One-tap grocery lists, sorted by aisle',
      'Share and sync with your household',
    ],
    caption: 'Weeknight ratatouille',
    captionSub: 'Ready in 35 minutes',
    imageSrc:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    primaryAction: (
      <Button variant="primary" size="l" iconTrailing={<ArrowRight size={16} />}>
        Get started
      </Button>
    ),
    secondaryAction: (
      <Button variant="outline" size="l">
        Learn more
      </Button>
    ),
  },
};
export default meta;

type Story = StoryObj<typeof Sections>;

export const ImageLeft: Story = {
  args: { imagePosition: 'left' },
};

export const ImageRight: Story = {
  args: { imagePosition: 'right' },
};

export const Overview: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 bg-background-tertiary p-8">
      <Sections {...args} imagePosition="left" title="Plan less, cook more" />
      <Sections
        {...args}
        imagePosition="right"
        subtitle="Stay organised"
        title="Your kitchen, in sync"
        imageSrc={undefined}
        caption={undefined}
        captionSub={undefined}
      />
    </div>
  ),
};
