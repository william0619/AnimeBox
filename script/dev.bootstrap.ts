/**
 author: william   email:362661044@qq.com
 create_at:2024/8/29
 **/
import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process'
import chalk from 'chalk'
import * as path from 'node:path'
import { EventEmitter } from 'node:events'

class MyEmitter extends EventEmitter {
  alreadyPreload = false
  alreadyMain = false
  preloadProcess?: ChildProcessWithoutNullStreams
  mainProcess?: ChildProcessWithoutNullStreams
}

const createProcessWatch = (path: string, entry: string, cb: () => void) => {
  const _process = spawn('tsx', [path, `--entry=${entry}`, '--watch'], {
    // shell: true
    // stdio: 'inherit'
  })
    .on('close', (code) => process.exit(code))
    .on('error', (spawnError) => console.error(spawnError))

  const onData = (data: any) => {
    process.stdout.write(chalk.blue(data.toString()))
    if (data.toString().includes('built')) {
      cb()
      _process.stdout.off('data', onData)
    }
  }
  _process.stdout.on('data', onData)
  return _process
}

async function main() {
  const configPath = path.join(process.cwd(), './config')
  const buildScript = path.join(configPath, './vite-build.main.ts')

  const rendererPath = path.join(configPath, './vite.config.renderer.ts')

  const myEmitter = new MyEmitter()

  myEmitter.on('start', () => {
    // 运行
    if (myEmitter.alreadyMain && myEmitter.alreadyPreload) {
      spawn('cross-env', ['ELE_START=true', 'vite', '--config', rendererPath], {
        shell: true,
        stdio: 'inherit'
      })
        .on('close', (code) => {
          myEmitter.preloadProcess?.kill()
          myEmitter.mainProcess?.kill()
          process.exit(code)
        })
        .on('error', (spawnError) => {
          myEmitter.preloadProcess?.kill()
          myEmitter.mainProcess?.kill()
          console.error(spawnError)
        })
    }
  })

  myEmitter.preloadProcess = createProcessWatch(buildScript, 'preload', () => {
    if (myEmitter.alreadyPreload === false) {
      myEmitter.alreadyPreload = true
      myEmitter.emit('start')
    }
  })

  myEmitter.mainProcess = createProcessWatch(buildScript, 'main', () => {
    if (myEmitter.alreadyMain === false) {
      myEmitter.alreadyMain = true
      myEmitter.emit('start')
    }
  })
}
main()
