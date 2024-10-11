// renderer 中发消息给 main
export type IToMainEvents = {
  // 关闭窗体
  shutdown: { winName: string }
  // 最小化
  minimize: { winName: string }
  // 最大化 & 正常
  changeMaximize: { winName: string }

  // 刷新页面
  reload: { winName: string }

  // 开机自启动
  changeAutoStart: { val: boolean }

  // 打开url
  openExternal: { url: string }

  // path
  openPath: { path: string }
}

// main 发消息给 renderer
export type IToRendererEvents = {
  // 设置窗体名字
  setWinName: string

  // 窗口大小
  changeMaximize: { state: 'unmaximize' | 'maximize' }
}

// main 发消息给 renderer 再获取 renderer 返回的数据
export type IToRendererInvoke = {
  updateAvailable: { toRVal: boolean; toMVal: boolean }
  updateDownloaded: { toRVal: undefined; toMVal: undefined }
}
