import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getBackendTarget() {
  try {
    const portPath = path.resolve(__dirname, '../.active_port')
    if (fs.existsSync(portPath)) {
      const port = fs.readFileSync(portPath, 'utf8').trim()
      if (port) {
        return `http://127.0.0.1:${port}`
      }
    }
  } catch (err) {
    // Ignore error and fallback to default
  }
  return 'http://127.0.0.1:8001'
}

export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
      '/uploads': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
      '/chat': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
    },
  },
  preview: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
      '/uploads': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
      '/chat': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        router: () => getBackendTarget(),
      },
    },
  },
  build: {
    assetsDir: 'static',
    // Inline small assets (< 8KB) as base64 to reduce HTTP requests
    assetsInlineLimit: 8192,
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
        },
      },
    },
  },
  plugins: [react()],
})