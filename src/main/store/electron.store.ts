/**
 author: william   email:362661044@qq.com
 create_at:2023/8/25 10:50 AM
 **/
import Store from 'electron-store'

class ElectronStore extends Store {
  // setVersion() {
  //   this.set('version', process.env['CLIENT_VERSION'])
  // }
  // checkAutoStart() {
  //   // 查看 store 配置文件有没有值
  //
  //   if (this.get('auto_start') === undefined) {
  //     // 如果没有值证明是第一次安装打开，我们按照，获取 nsis init 文件
  //     // mac 是不存在的
  //     try {
  //       const initFile = path.join(path.dirname(process.execPath), 'setting_ini.json')
  //       const init = fs.readFileSync(initFile, 'utf-8')
  //       const initJson = JSON.parse(init)
  //       this.setAutoStart(initJson['auto_start'] ?? false)
  //     } catch (e) {
  //       log.info('e', e)
  //     }
  //   }
  // }
  //
  // getAutoStart(): boolean {
  //   return Boolean(this.get('auto_start'))
  // }
  // setAutoStart(val: boolean) {
  //   this.set('auto_start', val)
  //   app.setLoginItemSettings({
  //     openAtLogin: val
  //   })
  //
  //   const setting = app.getLoginItemSettings()
  //   log.info('setAutoStart', setting)
  // }
}

export const electronStore = new ElectronStore({ name: 'setting' })
