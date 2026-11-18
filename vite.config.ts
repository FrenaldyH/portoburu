import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite config: React plugin (JSX + fast refresh) and Tailwind v4 plugin
// (scans source files for class names and generates only the CSS that is used).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
