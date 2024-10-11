/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/22
 **/
// 路径页
import { resolve, join, dirname } from 'node:path'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const currentPath = dirname(__filename)

const rootPath = join(currentPath, '../')

// const builderPath = join(rootPath, './builder')
const builderDistPath = join(rootPath, './dist')
const distMain = join(builderDistPath, './main')
const distRenderer = join(builderDistPath, './renderer')

const srcPath = resolve(rootPath, './src')
const mainPath = join(srcPath, './main')
const rendererPath = join(srcPath, './renderer')

export default {
  rootPath,
  srcPath,
  mainPath,
  rendererPath,
  builderDistPath,
  distMain,
  distRenderer
}
