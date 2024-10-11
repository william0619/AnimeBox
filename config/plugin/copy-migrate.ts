/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/30
 **/
import fsExtra from 'fs-extra'
import path from 'node:path'
import vitePaths from '../vite.paths'
import { PluginOption } from 'vite'

export default function copyMigrate(outPath: string): PluginOption {
  return {
    name: 'copy-migrate',
    apply: 'build',
    closeBundle: () => {
      const migrations = path.join(vitePaths.rootPath, './migrations')
      fsExtra.copySync(migrations, path.join(outPath, './migrations'))
      // console.log('log', process.cwd())
    }
  }
}
