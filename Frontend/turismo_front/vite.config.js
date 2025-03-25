import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
  server: {
    host: '0.0.0.0',
    port: 3000, // Railway maneja el puerto automáticamente
    strictPort: true,
    cors: true,
    proxy: {
      // Redirige todas las solicitudes que comienzan con /api al backend
      '/api': {
        target: 'https://pi-dh-infradeploy-backend-production.up.railway.app', // URL de tu backend en Railway
        changeOrigin: true, // Cambia el origen de la solicitud para que coincida con el backend
        secure: false, // Desactiva la verificación de certificados SSL (útil si tu backend no tiene un certificado válido)
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: true,
    allowedHosts: ['pi-dh-infradeploytest-production.up.railway.app'],
  },
});