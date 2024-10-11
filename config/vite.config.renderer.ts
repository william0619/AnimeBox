import { BuildOptions, defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePaths from './vite.paths'
import svgr from 'vite-plugin-svgr'
import electronServerDev from './plugin/server-dev'
import fs from 'node:fs'
import path from 'node:path'
// import { visualizer } from 'rollup-plugin-visualizer'

const windowPath = path.join(vitePaths.rendererPath, './window')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const getEntry = (): BuildOptions['rollupOptions']['input'] => {
  const windowNames = fs.readdirSync(windowPath)
  return windowNames.reduce<Record<any, string>>((obj, name) => {
    obj[name] = path.join(windowPath, name, 'index.html')
    return obj
  }, {})
}

// console.log('process', process.env.ELE_START)
// https://vitejs.dev/config/
export default defineConfig(() => {
  const eleStart = process.env.ELE_START || false
  return {
    publicDir: path.join(vitePaths.srcPath, './assets/'),
    // base: './',
    root: windowPath,
    build: {
      target: 'modules',
      outDir: vitePaths.distRenderer,
      rollupOptions: {
        input: getEntry(), // 多入口
        output: {
          manualChunks: {
            react: ['react', 'react-dom']
          }
        }
      },
      sourcemap: false,
      emptyOutDir: true,
      minify: true
    },
    plugins: [react(), svgr(), eleStart && electronServerDev()],
    resolve: {
      alias: {
        '@': vitePaths.srcPath,
        '@renderer': vitePaths.rendererPath
      }
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: false,
      cors: true,
      strictPort: true
    }
  } as UserConfig
})
