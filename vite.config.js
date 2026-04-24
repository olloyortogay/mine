import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "turkdunyasi",
    project: "turkdunyasi-anasite"
  })],
  build: {
    // Split large bundle into smaller chunks for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — always needed, cached separately
          'vendor-react': ['react', 'react-dom'],
          // Framer Motion — large library, lazy-loaded pages benefit
          'vendor-motion': ['framer-motion'],
          // Router — separate chunk
          'vendor-router': ['react-router-dom'],
          // i18n — only affects text, not critical render path
          'vendor-i18n': ['i18next', 'react-i18next'],
        }
      }
    },

    // Warn only if a single chunk exceeds 600KB
    chunkSizeWarningLimit: 600,

    sourcemap: true
  }
})
