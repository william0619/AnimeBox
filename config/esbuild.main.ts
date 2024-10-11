/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/26
 **/

import esbuild from 'esbuild'
import vitePaths from './vite.paths'
import path from 'node:path'
import fg from 'fast-glob'
import pkg from '../package.json'

async function main() {
  const format = pkg.type === 'module' ? 'esm' : 'cjs'
  const dir = await fg('**/*.ts', {
    dot: true,
    cwd: vitePaths.mainPath,
    absolute: true,
    ignore: ['**/*.d.ts']
  })
  // console.log('dir', dir)
  const result = await esbuild.build({
    nodePaths: [vitePaths.mainPath],
    entryPoints: [...dir],
    outdir: '../dist2',
    // outfile: '[name].mjs',
    // target: ['node20'],
    resolveExtensions: ['.js', '.ts'], // 添加要解析的扩展名
    format: format,
    bundle: false,
    lineLimit: 100,
    platform: 'node',
    treeShaking: true,
    sourcemap: true,
    packages: 'external',
    // outExtension: { '.js': '.js' },
    minify: false,
    metafile: true,
    tsconfig: path.resolve(vitePaths.rootPath, 'tsconfig.node.json'),
    allowOverwrite: true,
    outbase: vitePaths.mainPath,
    plugins: []
    // write: true,
    // // keepNames: true,
    // // drop: ['console', 'debugger'],
    // loader: {
    //   '.ts': 'tsx'
    // },
    // define: {
    //   'process.env.NODE_ENV': '"production"'
    // },
    // splitting: true,
    // chunkNames: 'chunks/[name]-[hash]'
    // define: {
    //   __dirname: dirnameVarName,
    //   __filename: filenameVarName,
    //   'import.meta.url': importMetaUrlVarName
    // }
    // plugins: [
    //   {
    //     name: 'replace-import-meta',
    //     setup(build): void {
    //       build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
    //         const contents = await fs.promises.readFile(args.path, 'utf8')
    //         const injectValues =
    //           `const ${dirnameVarName} = ${JSON.stringify(path.dirname(args.path))};` +
    //           `const ${filenameVarName} = ${JSON.stringify(args.path)};` +
    //           `const ${importMetaUrlVarName} = ${JSON.stringify(pathToFileURL(args.path).href)};`
    //
    //         return {
    //           loader: args.path.endsWith('ts') ? 'ts' : 'js',
    //           contents: injectValues + contents
    //         }
    //       })
    //     }
    //   }
    // ]
  })
  const text = await esbuild.analyzeMetafile(result.metafile, {
    // verbose: true,
  })
  console.log(text)
}
main()
