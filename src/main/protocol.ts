// /**
//  author: william   email:362661044@qq.com
//  create_at:2023/8/25 10:13 AM
//  **/
// import { app, BrowserWindow } from 'electron'
// import { ipcEventStation } from './ipc/ipcEventStation'
//
// export class Protocol {
//   constructor(public mainWin?: BrowserWindow | null) {
//     // shadow-ai://
//     if (app.isPackaged) {
//       // 是否处于打包
//       app.setAsDefaultProtocolClient('shadow-ai')
//     }
//     // if(!app.isPackaged) {
//     //   app.setAsDefaultProtocolClient('shadow-ai', process.execPath, [path.resolve(process.argv[1])])
//     // }
//     this.handleSecondInstance()
//     this.handleOpenUrl()
//   }
//
//   setMainWin(win: BrowserWindow) {
//     this.mainWin = win
//   }
//
//   handleSecondInstance() {
//     app.on('second-instance', (event, argv = []) => {
//       // 直接把伪协议链接发送给渲染进程
//       const urlData = argv.at(-1)
//       if (this.mainWin && urlData) {
//         // log.info('second-instance')
//         this.passUrlScheme(this.mainWin, urlData)
//         this.rouse()
//       }
//     })
//   }
//
//   handleOpenUrl() {
//     app.on('open-url', (_event, urlStr) => {
//       // log.info('1 open-url')
//
//       // 程序已经打开，存在窗体实例
//       if (this.mainWin) {
//         // log.info('1.2 open-url has win')
//         this.passUrlScheme(this.mainWin, urlStr)
//         this.rouse()
//       } else {
//         // log.info('1.2 open-url not win')
//         // 主窗体没有准备好的情况下
//         // 这里是mac软件关闭时使用伪协议打开软件，如果你中间process.argv没有改变可以这样写，会继续走上面win的did-finish-load的流程
//         // 如果有改变的话老老实实写个did-finish-load进行win.webContents.send('renderer-scheme', urlStr)推送
//         process.argv.push(urlStr)
//       }
//     })
//   }
//
//   passUrlScheme(mainWin: BrowserWindow, urlData: string) {
//     const hasSchema = urlData.indexOf('?')
//     if (hasSchema === -1) return
//
//     const queryData = urlData.slice(hasSchema)
//     if (queryData) {
//       // log.info('last: passUrlScheme', queryData)
//       ipcEventStation.onSend(mainWin, { key: 'urlScheme', data: { searchQuery: queryData } })
//     }
//   }
//
//   rouse() {
//     if (this.mainWin) {
//       if (this.mainWin.isMinimized()) {
//         //  log.info('win: rouse===restore')
//         this.mainWin.restore()
//       }
//
//       if (this.mainWin.isVisible()) {
//         // log.info('win: rouse===focus')
//         this.mainWin.focus()
//       } else {
//         // log.info('win: rouse===show')
//         this.mainWin.show()
//         this.mainWin.setSkipTaskbar(false)
//       }
//     }
//   }
// }
