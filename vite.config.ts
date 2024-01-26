import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      components: "/src/components",
      styles: "/src/styles",
      data: "/src/data",
      images: "/src/images",
      assets: "/src/assets",
      src: "."
    }
  },
})