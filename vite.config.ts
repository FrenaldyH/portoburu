/**
 * Vite config
 *
 * - React plugin: JSX and fast refresh during `pnpm dev`.
 * - Tailwind v4 plugin: scans the source files for class names and generates only the CSS that is
 *   actually used.
 * The build output goes to dist/ (static files, ready for any static host such as Vercel).
 */
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
