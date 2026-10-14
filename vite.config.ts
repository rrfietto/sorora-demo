import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Hash navigation keeps relative asset URLs valid under /sorora-demo/ and in local previews.
  base: './',
  plugins: [react(), tailwindcss()],
})
