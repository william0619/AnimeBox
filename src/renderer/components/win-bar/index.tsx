/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 8:13 PM
 **/

import { createPortal } from 'react-dom'
import { ClientUtils } from '@renderer/utils/client.utils.ts'
import { OperateBtnBar } from '@renderer/components/win-bar/widget/operate-btn-bar.tsx'

function WinBarSide() {
  const electron = ClientUtils.instance()

  const isWin = electron.isWin()

  return (
    <div
      id={'winBar'}
      className={'fixed w-screen px-2 flex justify-end items-center app-drag'}
      style={{ zIndex: 99999, height: 'var(--win-bar-height)' }}
      onDoubleClick={(e) => {
        e.preventDefault()
        electron?.ipcRenderer.send('changeMaximize', { winName: ClientUtils.getWinName() })
      }}
    >
      <div hidden={!isWin} className={'flex justify-end'}>
        <OperateBtnBar />
      </div>
    </div>
  )
}

export const WinBar = () => {
  return createPortal(<WinBarSide />, document.getElementById('root')!)
}
