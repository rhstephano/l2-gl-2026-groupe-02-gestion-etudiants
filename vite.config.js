import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuration de Vite (le "moteur" qui lance le projet)
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',   // utile pour l'aperçu en ligne, ne gêne pas en local
    port: 5173,
    allowedHosts: true
  }
})
