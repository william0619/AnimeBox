/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 7:57 PM
 **/

import { useEffect, useState } from 'react'
import MaxIcon from '../icons/max.svg?react'
import MinIcon from '../icons/min.svg?react'
import MinimizeIcon from '../icons/minimize.svg?react'
import ShutDownIcon from '../icons/shutdown.svg?react'
import { WinBarBtn } from '@renderer/components/WinBar/widget/WinBarBtn.tsx'
import { ClientUtils } from '@renderer/utils/client.utils.ts'

export function OperateBtnBar() {
  const electron = ClientUtils.instance()
  const winName = ClientUtils.getWinName()

  const [winSize, setWinSize] = useState<'unmaximize' | 'maximize'>('unmaximize')

  useEffect(() => {
    const destroy = electron?.ipcRenderer.on('changeMaximize', (args) => {
      const { state } = args
      setWinSize(state)
    })
    return () => {
      destroy?.()
    }
  }, [])

  const onMinimize = () => {
    electron?.ipcRenderer.send('minimize', { winName: winName })
  }

  const onChangeMaximize = () => {
    electron?.ipcRenderer.send('changeMaximize', { winName: winName })
  }

  const onShowdown = () => {
    electron?.ipcRenderer.send('shutdown', { winName: winName })
  }

  return (
    <div className={'flex h-full items-center gap-1'}>
      <WinBarBtn Com={MinimizeIcon} onClick={onMinimize} />
      <WinBarBtn Com={winSize === 'unmaximize' ? MinIcon : MaxIcon} onClick={onChangeMaximize} />
      <WinBarBtn Com={ShutDownIcon} onClick={onShowdown} />
    </div>
  )
}
