/**
 author: william   email:362661044@qq.com
 create_at:2023/9/5 4:44 PM
 **/
import { ipcMainHandler } from './ipc-main-handler.ts'
import { shell } from 'electron'
import { UtilMain } from '../utils/util.main'

export function ipcEventsAddWatch() {
  // 监听渲染线程传过来的设置是否开机自启动
  ipcMainHandler.on('changeAutoStart', ({ val }) => {
    UtilMain.setAutoStart(val)
  })

  // 获取开机自启动状态
  // ipcMainHandler.handle('getAutoStart', (_) => {
  //   return UtilMain.getAutoStart()
  // })

  // 打开 外部链接
  ipcMainHandler.on('openExternal', ({ url }) => {
    shell.openExternal(url)
  })

  // 打开 路径
  ipcMainHandler.on('openPath', ({ path }) => {
    shell.openPath(path)
  })

  // 下载url资源
  // ipcMainHandler.handle('downloadToFolder', (data) => {
  //   return FileService.downloadToFolder(data)
  // })
  //
  // // 拷贝图片
  // ipcMainHandler.handle('copyUrlImage', (data) => {
  //   return ImageService.copyToClipboard(data)
  //   // return eventHandler.copyImageToClipboard(data)
  // })
  //
  // ipcMainHandler.handle('generateExcel', (data) => {
  //   return ExcelService.generateExcelToFolder(data)
  // })
}
