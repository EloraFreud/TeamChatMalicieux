import { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: { disable: true }, // theme is driven by data-theme + tokens, not SB backgrounds
  },
  globalTypes: {
    theme: {
      description: 'Light / Dark theme (data-theme on <html>)',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) || 'light';
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
      return (
        <div className="bg-background-primary text-content-primary font-sans p-8 min-h-[120px]">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
