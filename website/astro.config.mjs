// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { resolve } from 'path';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://sawickagrzyb.pl',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': resolve('./src/components'),
        '@sections': resolve('./src/components/sections'),
        '@ui': resolve('./src/components/ui'),
        '@seo': resolve('./src/components/seo'),
        '@data': resolve('./src/data'),
        '@layouts': resolve('./src/layouts'),
        '@styles': resolve('./src/styles'),
      },
    },
  },
  integrations: [sitemap()],
});
