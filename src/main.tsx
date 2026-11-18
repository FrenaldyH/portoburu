import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

// Fail loudly if index.html is missing the mount point, instead of rendering nothing.
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('root element not found in index.html')
}

// Mount the app. StrictMode runs extra dev-only checks to surface bugs early.
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
