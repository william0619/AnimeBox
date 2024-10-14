// ipcRenderer.invoke 与 ipcMain.handle
// import { IEventStation } from './ipc-event-station'

type IStructure<ARGS, RETURN> = {
  args: ARGS
  return: RETURN
}

export type IToMainInvoke = {
  // 检查更新
  checkUpdate: IStructure<{ pkgSource: string }, any>

  getWinName: IStructure<any, string>
}
