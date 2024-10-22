import { app, BrowserWindow } from 'electron'
import { UtilMain } from './utils/util.main'
import path from 'node:path'
import { winName } from './const'
import log from 'electron-log'
import { ipcMainHandler } from './ipc/ipc-main-handler.ts'
import { UtilCommon } from './utils/util.common'

type ICreateBrowser = {
  name: winName | string
}

// const isMac = os.platform() === 'darwin'

class BrowserHandler {
  browserMap = new Map<string, BrowserWindow>()

  get isProductPackage() {
    return app.isPackaged && process.env['VITE_ENV'] === 'production'
  }

  constructor() {
    this.listener()
  }

  private listener() {
    ipcMainHandler.onMulti({
      channels: ['minimize', 'shutdown', 'changeMaximize', 'reload'],
      handle: (params) => {
        const { channel, data } = params
        switch (channel) {
          case 'shutdown':
            this.onClose(data.winName)
            break
          case 'minimize':
            this.onMinimize(data.winName)
            break
          case 'changeMaximize':
            this.onChangeMaximize(data.winName)
            break
          case 'reload': {
            const win = this.browserMap.get(data.winName)
            if (win) {
              win.webContents.reload()
            }
            break
          }
        }
      }
    })
  }

  // 创建单一个种类窗体
  createBrowser(args: ICreateBrowser): BrowserWindow {
    const { name } = args
    const _width = 1080
    const _height = 728
    // https://www.electronjs.org/zh/docs/latest/tutorial/esm
    const win = new BrowserWindow({
      width: _width,
      minWidth: _width,
      height: _height,
      minHeight: _height,
      icon: path.resolve(UtilCommon.dirname, '../build/24x24.png'),
      autoHideMenuBar: true,
      title: process.env['VITE_APP_TITLE'],
      maximizable: true,
      // transparent: true,
      titleBarStyle: 'hidden',
      // titleBarOverlay: true,
      // titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
      // trafficLightPosition: { x: 16, y: 6 },
      frame: false,
      disableAutoHideCursor: false,
      webPreferences: {
        sandbox: false,
        devTools: true,
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(UtilCommon.dirname, 'preload.mjs'),
        webSecurity: true
        // scrollBounce: isMac
      }
    })

    // 获取 窗口名字
    win.webContents.ipc.handle('getWinName', () => {
      return name
    })

    const loadUrl = UtilMain.resolveHtmlPath(`${name}/index.html`)
    win.loadURL(loadUrl).catch((e) => {
      log.info('loadUrl error', e)
    })

    // 默认打开控制台
    if (!this.isProductPackage) {
      setTimeout(() => {
        win.webContents.openDevTools({ mode: 'detach', activate: true })
      }, 1000)
    }

    win.once('ready-to-show', () => {
      if (!win) {
        throw new Error('"mainWindow" is not defined')
      }
      if (process.env.START_MINIMIZED) {
        win.minimize()
      } else {
        win.show()
      }
      // ipcMainHandler.sendToBrowserInvoke()
      // ipcMainHandler.sendToBrowser({ win, channel: 'setWinName', data: name })
    })

    // win.on('show', () => {
    //   // console.log('show')
    //   console.log(' win.isFocused()', win.isFocused())
    //   // win.focus()
    // })

    win.on('closed', () => {
      // console.log('closed')
      this.browserMap.delete(name)
    })

    win.on('maximize', () => {
      ipcMainHandler.sendToBrowser({
        win,
        channel: 'changeMaximize',
        data: { state: 'maximize' }
      })
    })

    win.on('unmaximize', () => {
      ipcMainHandler.sendToBrowser({
        win,
        channel: 'changeMaximize',
        data: { state: 'unmaximize' }
      })
    })

    // 刷新后逻辑，防止渲染线程 winName 丢失
    win.webContents.on('did-finish-load', () => {
      console.log('did-finish-load')
      // log.info('did-finish-load')
      // setTimeout(() => {
      //   ipcMainHandler.sendToBrowser({ win, channel: 'setWinName', data: name })
      // }, 1000)
    })

    if (name === winName.main) {
      win.webContents.once('did-finish-load', () => {
        // 直接打开软件的话开发环境的启动参数为2，安装包为1，大于这个数的话说明是通过伪协议拉起软件的
        // (app.isPackaged ? 1 : 2)
        if (process.argv.length > 0) {
          // log.info('2 once did process.argv')
          // 我们这里主动触发 'second-instance'，传入process.argv，在那边统一处理了
          //  console.log('send did to instance')
          app.emit('second-instance', null, process.argv)
        }
      })
    }

    this.browserMap.set(name, win)

    return win
  }

  createMultiBrowser(args: ICreateBrowser & { id: string }) {
    const { name: _name, id } = args
    const name = _name + '-' + id
    this.createBrowser({ name })
  }

  private onMinimize(name: string) {
    const win = this.browserMap.get(name)
    if (win) {
      win.minimize()
    }
  }

  private onChangeMaximize(name: string) {
    const win = this.browserMap.get(name)
    if (win) {
      const currentState = win.isMaximized()
      currentState ? win.unmaximize() : win.maximize()
    }
  }

  private onClose(name: string) {
    const win = this.browserMap.get(name)
    if (win) {
      if (name === winName.main) {
        this.browserMap.forEach((win) => {
          win.close()
        })
      } else {
        win.close()
      }
    }
  }
}

export const browserHandler = new BrowserHandler()
