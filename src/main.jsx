import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/styles/index.scss';
import MapRenderer from './components/mapRenderer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MapRenderer />
  </StrictMode>,
)
