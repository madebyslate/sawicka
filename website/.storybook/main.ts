import type { StorybookConfig } from '@storybook-astro/framework';

// Projekt nie używa React/Vue/Svelte island'ów — same komponenty .astro,
// więc bez integrations() z '@storybook-astro/framework/integrations'.
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts)'],
  framework: {
    name: '@storybook-astro/framework',
    options: {},
  },
};

export default config;
