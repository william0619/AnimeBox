import intl from 'react-intl-universal'
/**
 author: william   email:362661044@qq.com
 create_at:2023/8/31 5:05 PM
 **/
import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import MenuItem = Electron.MenuItem

export class ContextMenu {
  get isDev() {
    return ['local', 'development', 'test'].includes(process.env.VITE_ENV ?? '')
  }
  constructor(public win: BrowserWindow) {
    this.onContextMenu()
  }

  private onContextMenu() {
    this.win.webContents.on('context-menu', (event, props) => {
      event.preventDefault()
      const { inputFieldType, isEditable } = props
      // console.log('props', props)
      let menuList: Array<MenuItemConstructorOptions | MenuItem> = []

      // console.log('props', props)
      // console.log('inputFieldType', inputFieldType)
      if (inputFieldType !== 'none' || isEditable) {
        menuList = [
          { label: intl.get('剪切'), role: 'cut' },
          { label: intl.get('复制'), role: 'copy' },
          { label: intl.get('粘贴'), role: 'paste' },
          // {
          //   label: '全选',
          //   role: 'selectAll'
          // }
        ]
      }

      if (menuList.length > 0) {
        Menu.buildFromTemplate(menuList).popup({
          window: this.win,
        })
      }
    })
  }
}
