import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/App.css'
import RouterConfig from './config/RouterConfig'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>,
)
