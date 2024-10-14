/**
 author: william   email:362661044@qq.com
 create_at:2024/8/31
 **/
import { build, defineConfig } from 'vite'
import { nodeExternals } from 'rollup-plugin-node-externals'
import copyMigrate from './plugin/copy-migrate'
import vitePaths from './vite.paths'
import path from 'node:path'
import pkg from '../package.json'
import { InputOption } from 'rollup'
import { fileExt, pkgType } from './utils.ts'
const rootPackageJson = path.resolve(vitePaths.rootPath, 'package.json')

const getArgs = () => {
  const argvOption = {
    entry: 'main',
    watch: false,
    package: false
  }
  const argv = process.argv || []
  argv.forEach((value) => {
    if (value.includes('--watch')) {
      argvOption.watch = true
    }
    if (value.includes('--package')) {
      argvOption.package = true
    }
    if (value.includes('--entry')) {
      argvOption.entry = value.split('=')[1] ?? 'main'
    }
  })
  return argvOption
}

async function main() {
  const argv = getArgs()
  console.log('type:', pkg.type, 'argv', argv)

  const getEntry = (entry: string): InputOption => {
    if (entry === 'preload') {
      return {
        preload: path.join(vitePaths.mainPath, './preload.ts')
      }
    }
    return {
      main: path.join(vitePaths.mainPath, './main.ts')
    }
  }
  await build(
    defineConfig({
      publicDir: false,
      plugins: [
        nodeExternals({
          deps: true,
          devDeps: true,
          peerDeps: true,
          packagePath: [rootPackageJson]
        }),
        copyMigrate(vitePaths.distMain)
      ],
      build: {
        rollupOptions: {},
        lib: {
          entry: getEntry(argv.entry),
          formats: [pkgType === 'module' ? 'es' : 'cjs'],
          fileName: () => `[name].${fileExt}`
        },
        sourcemap: true,
        outDir: vitePaths.distMain,
        emptyOutDir: false,
        minify: argv.package,
        watch: argv.watch ? {} : null
      },
      resolve: {
        alias: {
          '@renderer': vitePaths.rendererPath
        }
      }
    })
  )
}
main()
