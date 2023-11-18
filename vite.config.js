import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      includeAssets: [
        './src/assets/favicon.ico',
        './src/assets/pwa-192x192.png',
        './src/assets/pwa-512x512.png'
      ],
      manifest: {
        name: 'Grocery Store',
        short_name: 'GroceryStore',
        description: 'This is a simple grocery store',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './src/assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: './src/assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: './src/assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
    // basicSsl()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'vee-validate', 'sass']
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    },
    manifest: true
  }
})
