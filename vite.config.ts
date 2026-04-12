import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import prerender from 'vite-plugin-prerenderer';
// @ts-ignore
import renderer from '@prerenderer/renderer-puppeteer';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [
      react(),
      // Only run prerenderer during production build to avoid dev server issues
      isBuild && prerender({
        staticDir: resolve(process.cwd(), 'dist'),
        routes: ['/', '/about', '/services', '/catalog', '/portfolio', '/contact'],
        renderer: new renderer({
          renderAfterDocumentEvent: 'render-event',
          headless: true,
        }),
      }),
    ].filter(Boolean),
  };
});
