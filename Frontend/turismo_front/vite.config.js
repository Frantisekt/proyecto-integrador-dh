import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
  server: {
    host: '0.0.0.0',
    port: 3000, // Railway maneja el puerto automáticamente
    strictPort: true,
    cors: true,
    origin: 'https://pi-dh-infradeploytest-production.up.railway.app', // 🔥 Agregamos esto
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: true,
    allowedHosts: ['pi-dh-infradeploytest-production.up.railway.app'],
  },
})