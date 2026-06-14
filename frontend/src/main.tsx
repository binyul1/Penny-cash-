import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/App.css'
import RouterConfig from './config/RouterConfig'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" richColors />
    <RouterConfig />
  </StrictMode>,
)
