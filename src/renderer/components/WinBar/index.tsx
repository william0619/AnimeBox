/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 8:13 PM
 **/

import { createPortal } from 'react-dom'
import { ClientUtils } from '@renderer/utils/client.utils.ts'
import { OperateBtnBar } from '@renderer/components/WinBar/widget/OperateBtnBar.tsx'

function WinBarSide() {
  const electron = ClientUtils.instance()

  const isWin = electron.isWin()

  return (
    <div
      id={'winBar'}
      className={'absolute w-screen px-1.5 h-8 flex justify-end items-center'}
      style={{ zIndex: 99999 }}
      onDoubleClick={(e) => {
        e.preventDefault()
        electron?.ipcRenderer.send('changeMaximize', { winName: ClientUtils.getWinName() })
      }}
    >
      <div hidden={isWin} className={'flex justify-end'}>
        <OperateBtnBar />
      </div>
    </div>
  )
}

export const WinBar = () => {
  return createPortal(<WinBarSide />, document.getElementById('root')!)
}
