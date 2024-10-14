/**
 author: william   email:362661044@qq.com
 create_at:2023/9/26 2:15 PM
 **/
const { notarize } = require('@electron/notarize')
const path = require('path')
async function AfterSign(context) {
  // your custom code
  // console.log('AfterSign', context)
  const darwin = context.electronPlatformName === 'darwin'

  if (darwin) {
    const appPath = context.appOutDir
    const appName = context.packager.appInfo.productFilename
    // const platform = context.electronPlatformName
    // const arch = 'universal'
    console.log('====== start notarize ===== ', new Date().toLocaleString())
    notarize({
      tool: 'notarytool',
      appPath: `${appPath}/${appName}.app`,
      //  appPath: path.join(appPath, `${productName}_${platform}_${arch}.dmg`), // 应用的路径 xxx.app 结尾的
      appBundleId: 'com.shadow-ai.desktop', // appid
      appleId: 'peterngai277@gmail.com', // 苹果开发者 id
      // appleId: 'com.shadow-ai.desktop', // 苹果开发者 id
      appleIdPassword: 'xjmb-ybki-sikq-tzxv', // 应用专用密码
      teamId: '97RU46W82F'
      // ascProvider: '97RU46W82F' // 证书提供者
    })
      .then((res) => {
        console.log('success', res)
      })
      .catch((err) => {
        console.log('fail', err)
      })
      .finally(() => {
        console.log('====== end notarize ======', new Date().toLocaleString())
      })
  }
}

module.exports = AfterSign
