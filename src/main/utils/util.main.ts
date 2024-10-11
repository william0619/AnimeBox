import { URL } from 'url'
import { app } from 'electron'
import path from 'node:path'
import { UtilCommon } from './util.common'

export class UtilMain {
  static resolveHtmlPath(htmlFileName: string) {
    const loadUrl = process.env['LOAD_URL']
    if (!app.isPackaged && !loadUrl) {
      const port = process.env.PORT || 9527
      const url = new URL(`http://localhost:${port}`)
      url.pathname = htmlFileName
      return url.href
    }
    return `file://${path.resolve(UtilCommon.dirname, '../renderer/', htmlFileName)}`
  }

  static getAutoStart() {
    const setting = app.getLoginItemSettings()
    // log.info('getAutoStart', setting)
    return setting.openAtLogin
  }

  static setAutoStart(val: boolean) {
    app.setLoginItemSettings({
      openAtLogin: val
    })
    // const setting = app.getLoginItemSettings()
    // log.info('setAutoStart', setting)
  }
}
