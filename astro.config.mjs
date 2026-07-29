// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  legacy: {
    collectionsBackwardsCompat: true,
  },
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },

});