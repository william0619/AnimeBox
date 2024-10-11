/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/10
 **/
import pkg from '../package.json'
const extObj = { module: 'mjs', commonjs: 'js' }

export const pkgType = pkg.type ?? 'commonjs'
const ext = extObj[pkgType]
export const fileExt = ext
