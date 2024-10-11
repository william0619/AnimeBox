/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 3:15 PM
 **/
import { ElectronHandler } from '@/main/preload.ts'

export class ClientUtils {
  static instance(): ElectronHandler {
    return window.electron
  }

  static getWinName() {
    const storeWinName = sessionStorage.getItem('winName')
    return window.winName ?? storeWinName ?? 'unknown'
  }

  static setWinName(name: string) {
    window.winName = name
    sessionStorage.setItem('winName', name)
  }

  static getPlatform() {
    return window.electron?.platform()
  }

  static openUrl(url?: string) {
    if (url) {
      const electron = ClientUtils.instance()
      electron ? electron.ipcRenderer.send('openExternal', { url }) : window.open(url)
    }
  }
}
