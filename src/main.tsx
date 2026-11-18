/**
 * Entry point
 *
 * Loads the global styles and mounts <App /> into the #root element of index.html.
 * Throws a clear error if #root is missing instead of silently rendering nothing.
 * StrictMode runs extra development-only checks to surface bugs early.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('root element not found in index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
