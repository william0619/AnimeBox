import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Player from '@renderer/app/player.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Player />
  </StrictMode>
)
