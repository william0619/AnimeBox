import { BrowserWindow, ipcMain } from 'electron'
import { IpcMainEvent } from 'electron'
import { IToMainEvents, IToRendererEvents } from '../types/ipc-event'
import { IToMainInvoke } from '../types/ipc-invoke'
import { IToRendererInvoke } from '../types/ipc-event'

type ISend<K extends keyof IToRendererEvents> = {
  win: BrowserWindow
  channel: K
  data: IToRendererEvents[K]
}

type ISendInvoke<K extends keyof IToRendererInvoke> = {
  win: BrowserWindow
  channel: K
  data: IToRendererInvoke[K]['toRVal']
}

type IOnMulti = {
  channels: Array<keyof IToMainEvents>
  handle: (params: { event: IpcMainEvent; channel: keyof IToMainEvents; data: any }) => void
}

class IpcMainHandler {
  onMulti(args: IOnMulti) {
    const { channels = [], handle } = args
    channels.forEach((channel) => {
      ipcMain.on(channel, (event, args) => {
        handle({ event, channel, data: args })
      })
    })
  }

  on<K extends keyof IToMainEvents>(channel: K, func: (args: IToMainEvents[K]) => void) {
    ipcMain.on(channel, (_event, args) => {
      func(args)
    })
  }

  once<K extends keyof IToMainEvents>(channel: K, func: (args: IToMainEvents[K]) => void) {
    ipcMain.once(channel, (_event, args) => {
      func(args)
    })
  }

  sendToBrowser<K extends keyof IToRendererEvents>(args: ISend<K>) {
    const { win, channel, data } = args
    win.webContents.send(channel, data)
  }

  // 发送消息给 win 然后再获取win返回的信息
  sendToBrowserInvoke<K extends keyof IToRendererInvoke>(args: ISendInvoke<K>) {
    const { win, channel, data } = args
    // ipcRenderer once 监听
    win.webContents.send(channel, data)
    return new Promise((resolve, _reject) => {
      ipcMain.once(channel, (_even, args) => {
        resolve(args)
      })
    })
  }

  handle<K extends keyof IToMainInvoke>(
    channel: K,
    func: (args: IToMainInvoke[K]['args']) => IToMainInvoke[K]['return'] | Promise<IToMainInvoke[K]['return']>
  ) {
    ipcMain.handle(channel, async (_, args) => {
      return func(args)
    })
  }

  handleOnce<K extends keyof IToMainInvoke>(
    channel: K,
    func: (args: IToMainInvoke[K]['args']) => IToMainInvoke[K]['return'] | Promise<IToMainInvoke[K]['return']>
  ) {
    ipcMain.handleOnce(channel, (_, args) => {
      return func(args)
    })
  }

  removeHandler<K extends keyof IToMainInvoke>(channel: K) {
    ipcMain.removeHandler(channel)
  }
}

export const ipcMainHandler = new IpcMainHandler()
