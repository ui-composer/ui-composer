import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

async function reloadFigma() {
  const { $ } = await import('zx');
  $.verbose = false;
  return {
    name: 'vite-plugin-reload-figma',
    handleHotUpdate: function handleHotUpdate() {
      $`./scripts/reload-figma.sh`;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteSingleFile(), reloadFigma()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: './dist',
    rollupOptions: {
      inlineDynamicImports: true,
    },
  },
});
