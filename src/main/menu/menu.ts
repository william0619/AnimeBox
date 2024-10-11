import intl from 'react-intl-universal'
import { app, Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron'
import { platform } from 'os'

const isMac = platform() === 'darwin'

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

export default class MenuBuilder {
  mainWindow: BrowserWindow

  get isDev() {
    return ['local', 'development', 'test'].includes(process.env.VITE_ENV ?? '')
  }

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
    // log.info('this.isDev', this.isDev)
  }

  buildMenu(): Menu {
    const template = isMac
      ? this.buildDarwinTemplate()
      : this.buildDefaultTemplate()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    return menu
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: process.env['VITE_APP_TITLE'],
      submenu: [
        {
          label: intl.get('关于我们'),
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        {
          label: intl.get('隐藏'),
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: intl.get('隐藏其他'),
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: intl.get('显示全部'), selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: intl.get('退出'),
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    }
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: intl.get('编辑'),
      submenu: [
        {
          label: intl.get('撤回'),
          accelerator: 'Command+Z',
          selector: 'undo:',
        },
        {
          label: intl.get('重做'),
          accelerator: 'Shift+Command+Z',
          selector: 'redo:',
        },
        { type: 'separator' },
        { label: intl.get('剪切'), accelerator: 'Command+X', selector: 'cut:' },
        {
          label: intl.get('拷贝'),
          accelerator: 'Command+C',
          selector: 'copy:',
        },
        {
          label: intl.get('粘贴'),
          accelerator: 'Command+V',
          selector: 'paste:',
        },
        {
          label: intl.get('全选'),
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    }

    const subMenuViewDev: MenuItemConstructorOptions = {
      label: intl.get('视图'),
      submenu: [
        {
          label: intl.get('刷新'),
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload()
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools()
          },
        },
      ],
    }

    // const subMenuViewProd: MenuItemConstructorOptions = {
    //   label: 'View',
    //   submenu: [
    //     {
    //       label: 'Toggle Full Screen',
    //       accelerator: 'Ctrl+Command+F',
    //       click: () => {
    //         this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
    //       }
    //     }
    //   ]
    // }

    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: intl.get('窗体'),
      submenu: [
        {
          label: intl.get('最小化'),
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        {
          label: intl.get('关闭'),
          accelerator: 'Command+W',
          selector: 'performClose:',
        },
      ],
    }

    // const subMenuView = this.isDev ? subMenuViewDev : subMenuViewProd
    const subMenuView = subMenuViewDev
    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow]
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close()
            },
          },
        ],
      },
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: () => {
              this.mainWindow.webContents.reload()
            },
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: () => {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
            },
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: () => {
              this.mainWindow.webContents.toggleDevTools()
            },
          },
        ],
      },
    ]

    return templateDefault
  }
}
