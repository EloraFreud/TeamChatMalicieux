import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from './Backdrop';

const meta = {
  title: 'Components/Backdrop',
  component: Backdrop,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty backdrop — the dark surface with its accent glow. */
export const Default: Story = {};

/** Some centered content composed on top of the glow. */
export const WithContent: Story = {
  render: () => (
    <Backdrop>
      <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
        <h1 className="font-display text-subtitle-large text-content-inverseprimary">
          Bienvenue
        </h1>
        <p className="text-paragraph-base text-content-inversesecondary">
          Un fond mobile avec un halo de marque, prêt à accueillir une feuille ou un onboarding.
        </p>
      </div>
    </Backdrop>
  ),
};

/** Overview — empty and populated backdrops side by side. */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <Backdrop />
      <Backdrop>
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <h1 className="font-display text-subtitle-large text-content-inverseprimary">
            Bienvenue
          </h1>
          <p className="text-paragraph-base text-content-inversesecondary">
            Un fond mobile avec un halo de marque.
          </p>
        </div>
      </Backdrop>
    </div>
  ),
};
