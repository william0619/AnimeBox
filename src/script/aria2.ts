/**
 author: william   email:362661044@qq.com
 create_at: 2025/1/21
 **/

import { execa } from 'execa'
import os from 'os'
import path from 'path'

async function startAria2() {
  const platform = os.platform()
  const arch = os.arch()

  // 使用对象映射平台和架构到可执行文件路径
  const executableMap: { [key: string]: string } = {
    'darwin-arm64': path.join(__dirname, '../../extra/macos-arm64/aria2'),
    'darwin-x64': path.join(__dirname, '../../extra/macos-x64/aria2'),
    'win32-x64': path.join(__dirname, '../../extra/windows/aria2.exe'),
    'linux-x64': path.join(__dirname, '../../extra/linux-x64/aria2'),
    'linux-arm64': path.join(__dirname, '../../extra/linux-arm64/aria2')
  }

  const key = `${platform}-${arch}`
  const aria2Executable = executableMap[key]

  if (!aria2Executable) {
    throw new Error('Unsupported platform or architecture')
  }

  try {
    // 使用 execa 启动 aria2 进程
    const aria2Process = execa(aria2Executable, ['--conf-path=@aria2.conf'], {
      stdio: 'inherit'
    })

    aria2Process.on('exit', (code) => {
      console.log(`aria2 process exited with code ${code}`)
    })
  } catch (error) {
    console.error('Failed to start aria2:', error)
  }
}
