// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import accessibility from 'vite-plugin-accessibility'

export default defineConfig({
  plugins: [
    vue(),
    accessibility({
      checks: {
        'color-contrast': { level: 'AA' },
        'aria-allowed-attr': true
      },
      rules: {
        'heading-order': { enabled: true }
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
