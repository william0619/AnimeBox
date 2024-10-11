/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/22
 **/
import { app, BrowserWindow } from 'electron'
import { release, platform } from 'os'
import { winName } from './const'
import log from 'electron-log'
import { DB } from './db'
import { browserHandler } from './browserHandler'

const isMac = platform() === 'darwin'

app.setName('AnimeBox')

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

global.willQuitApp = false

// 设置语言
app.commandLine.appendSwitch('lang', 'zh-CN')

async function main() {
  DB.Init()

  // 检查是否开机自启动，是的话直接设置
  // electronStore.setVersion()
  // 主窗体
  let mainWindow: BrowserWindow | null = null
  // const protocol = new Protocol(mainWindow)

  const createMainWindow = () => {
    mainWindow = browserHandler.createBrowser({ name: winName.main })
    // protocol.setMainWin(mainWindow)
    // 普通菜单
    // 右键菜单
    mainWindow.on('close', (e) => {
      // console.log('willQuitApp', willQuitApp)
      if (global.willQuitApp) {
        setTimeout(() => {
          app.exit(0)
        }, 500)
        return
      }

      if (isMac) {
        // console.log('isMac')
        if (mainWindow?.isFullScreen()) {
          // 全屏下默认调用 close
          mainWindow = null
        } else {
          e.preventDefault()
          mainWindow?.hide()
        }
      } else {
        // win 平台是走 shutdown
        mainWindow = null
      }
    })
  }

  /**
   * Add event listeners...
   */
  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      // mainWindow = null
      // console.log('window-all-closed')
      app.quit()
    }
  })

  app.on('before-quit', () => {
    // console.log('before-quit')
    global.willQuitApp = true
  })

  app
    .whenReady()
    .then(() => {
      createMainWindow()
      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        // console.log('activate', mainWindow)
        if (mainWindow === null) {
          createMainWindow()
        } else {
          mainWindow.show()
        }
      })
    })
    .catch((reason) => {
      log.info('whenReady', reason)
    })
}

// 是否已有实例
const gotTheLock = app.requestSingleInstanceLock()
try {
  if (!gotTheLock) {
    // 运行中的实例已经获取了单例锁，可以退出第二个实例
    app.quit()
    // app.exit()
  } else {
    main()
  }
} catch (e) {
  log.info('error:: ', e)
}

process.on('uncaughtException', (error) => {
  console.log('error', error)
  // logger?.error('error', error);
  process.exit(1)
})
