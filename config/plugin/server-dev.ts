import { spawn } from 'node:child_process'
import { Plugin } from 'vite'
import chalk from 'chalk'
import vitePaths from '../vite.paths'
import path from 'node:path'
import { fileExt } from '../utils.ts'

export default function electronServerDev(): Plugin {
  return {
    name: 'electron-server-dev',
    apply: 'serve',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        setTimeout(() => {
          const p = path.join(vitePaths.distMain, `./main.${fileExt}`)
          // console.log('p', p)
          // electronmon builder/release/main/main.js
          spawn('electronmon', [p], { shell: true, stdio: 'inherit' })
            .on('spawn', () => {
              console.log(chalk.green('Start Electron App...'))
            })
            .on('close', (code: number) => {
              // preloadProcess.kill()
              process.exit(code!)
            })
            .on('error', (spawnError) => {
              console.error(spawnError)
            })
        }, 250)
      })
    }
  }
}

// export async function startup(argv = ['.', '--no-sandbox']) {
//   const { spawn } = await import('node:child_process')
//   // @ts-ignore
//   const electron = await import('electron')
//   const electronPath = <any>(electron.default ?? electron)
//
//   startup.exit()
//   // Start Electron.app
//   process.electronApp = spawn(electronPath, argv, { stdio: 'inherit' })
//   // Exit command after Electron.app exits
//   process.electronApp.once('exit', process.exit)
//
//   if (!startup.hookProcessExit) {
//     startup.hookProcessExit = true
//     process.once('exit', startup.exit)
//   }
// }
// startup.hookProcessExit = false
// startup.exit = () => {
//   if (process.electronApp) {
//     process.electronApp.removeAllListeners()
//     process.electronApp.kill()
//   }
// }
