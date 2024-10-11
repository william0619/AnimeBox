/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { ElectronHandler } from '../main/preload'

declare global {
  interface Window {
    winName?: string
    electron: ElectronHandler
  }
}

export {}
