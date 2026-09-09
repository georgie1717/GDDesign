import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Change this if the live domain ever changes. It is used for the sitemap
  // and for absolute social-share URLs.
  site: 'https://georgiedoesdesign.com',
  integrations: [mdx(), sitemap()],
  build: {
    format: 'directory',
  },
});
