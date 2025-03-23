import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/styles/index.scss';
import WordContainer from './components/WordContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WordContainer />
  </StrictMode>,
)
