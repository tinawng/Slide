import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components', 'src/sections'],
      directoryAsNamespace: true,
    }),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Slide',
        short_name: 'Slide',
        description: 'Slide -- Mail client',
        start_url: "https://slide.tina.cafe/",
        scope: "https://slide.tina.cafe/",
        display: "standalone",
        background_color: "#F3F4F6",
        theme_color: '#F87171',
        orientation: "portrait-primary",
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  server: {
    host: '0.0.0.0',
    open: true,
  },
})
