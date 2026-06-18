import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, type AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    type: { control: 'inline-radio', options: ['single', 'multiple'] },
  },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const FAQ: AccordionItem[] = [
  {
    question: 'How do I create an event?',
    answer:
      'Head to your dashboard and click "New event". Fill in the title, date and location, then publish. Your event goes live immediately and is shareable via a unique link.',
    href: '#',
  },
  {
    question: 'Can I invite guests by email?',
    answer:
      'Yes. Once your event is created, open the Guests tab and paste a list of email addresses. Each guest receives a personalised invitation with an RSVP button.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      'The free plan covers unlimited events for up to 25 guests each. Upgrade any time to raise the guest cap and unlock custom branding.',
    href: '#',
  },
];

export const Default: Story = {
  args: {
    items: FAQ,
    type: 'single',
    defaultOpenIndex: 0,
  },
};

export const AllOpen: Story = {
  args: {
    items: FAQ,
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args} key="all-open" />
  ),
};

export const Overview: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="font-display text-label-small text-content-secondary">Single (one open at a time)</span>
        <Accordion items={FAQ} type="single" defaultOpenIndex={0} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-display text-label-small text-content-secondary">Multiple</span>
        <Accordion items={FAQ} type="multiple" />
      </div>
    </div>
  ),
};
