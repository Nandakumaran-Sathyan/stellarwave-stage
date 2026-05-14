import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Raise the warning limit slightly — large chunks from three/gsap are expected
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy 3-D / animation libs into separate chunks
          // so the critical path (React + router) loads first
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-three': ['three', 'ogl'],
          'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
          'vendor-lottie': ['@lottiefiles/dotlottie-react'],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim'],
        },
      },
    },
    // Inline tiny assets (< 4 kB) directly into JS to save round-trips
    assetsInlineLimit: 4096,
    // Optimize CSS
    cssMinify: 'lightningcss',
  },
  // Optimize deps for faster startup
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})