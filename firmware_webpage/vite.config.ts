import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  plugins: [react(), svgr()],
  base: './',
  build: {
    modulePreload: false,
    target: 'esnext',
    outDir: '../firmware/main/embedded_files',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: `assets/[name].js`,
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: false,
  }
});
