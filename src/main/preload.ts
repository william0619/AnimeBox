import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import { IToMainEvents, IToRendererEvents } from './types/ipc-event'
import { IToMainInvoke } from './types/ipc-invoke'
import { IToRendererInvoke } from './types/ipc-event'

const ipcRendererBase = {
  // 发消息给 main
  send<K extends keyof IToMainEvents>(channel: K, args: IToMainEvents[K]) {
    ipcRenderer.send(channel, args)
  },
  // 从 main 接受消息
  on<K extends keyof IToRendererEvents>(channel: K, func: (args: IToRendererEvents[K]) => void) {
    const subscription = (_event: IpcRendererEvent, args: IToRendererEvents[K]) => func(args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  // 从 main 接受消息
  once<K extends keyof IToRendererEvents>(channel: K, func: (args: IToRendererEvents[K]) => void) {
    ipcRenderer.once(channel, (_event, args) => func(args))
  },

  // 发消息给 main 再异步获取
  invoke<K extends keyof IToMainInvoke>(
    channel: K,
    args?: IToMainInvoke[K]['args']
  ): Promise<IToMainInvoke[K]['return']> {
    return ipcRenderer.invoke(channel, args)
  },

  // 接受main 发过来的信息并 处理后返回给他
  onceInvoke<K extends keyof IToRendererInvoke>(
    channel: K,
    func: (args: IToRendererInvoke[K]['toRVal']) => void
  ): (res: IToRendererInvoke[K]['toMVal']) => void {
    const resolve = (res: IToRendererInvoke[K]['toMVal']) => {
      ipcRenderer.send(channel, res)
    }
    ipcRenderer.once(channel, (_event, args) => {
      func(args)
    })
    return resolve
  }
}

export const electronHandler = {
  ipcRenderer: ipcRendererBase,
  process: () => process,
  platform: () => process.platform,
  isWin: () => process.platform === 'win32'
}
contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
