/**
 author: william   email:362661044@qq.com
 create_at:2024/8/29
 **/
import { spawn } from 'node:child_process'
import * as path from 'node:path'
import { EventEmitter } from 'node:events'

class MyEmitter extends EventEmitter {
  alreadyPreload = false
  alreadyMain = false
  alreadyRenderer = false
}

const createTask = (path: string, entry: string, cb: () => void) => {
  return spawn('tsx', [path, `--entry=${entry}`, '--package'], {
    shell: true,
    stdio: 'inherit'
  })
    .on('close', () => {
      cb()
    })
    .on('error', (spawnError) => console.error(spawnError))
}

async function main() {
  const configPath = path.join(process.cwd(), './config')
  const buildScript = path.join(configPath, './vite-build.main.ts')
  const rendererPath = path.join(configPath, './vite.config.renderer.ts')

  const myEmitter = new MyEmitter()

  myEmitter.on('package', () => {
    if (myEmitter.alreadyPreload && myEmitter.alreadyMain && myEmitter.alreadyRenderer) {
      console.log('all build finish')
      process.exit()
    }
  })

  createTask(buildScript, 'main', () => {
    myEmitter.alreadyMain = true
    myEmitter.emit('package')
  })
  createTask(buildScript, 'preload', () => {
    myEmitter.alreadyPreload = true
    myEmitter.emit('package')
  })

  spawn('cross-env', ['ELE_START=true', 'vite', 'build', '--config', rendererPath], {
    shell: true,
    stdio: 'inherit'
  })
    .on('close', () => {
      myEmitter.alreadyRenderer = true
      myEmitter.emit('package')
    })
    .on('error', (spawnError) => {
      console.error(spawnError)
    })
}
main()
