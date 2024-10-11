import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePaths from './config/vite.paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@renderer': vitePaths.rendererPath
    }
  }
})
