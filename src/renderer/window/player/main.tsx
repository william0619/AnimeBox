import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Player from '@renderer/app/Player.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Player />
  </StrictMode>
)
