/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/
import { WinBar } from '@renderer/components/WinBar'
import { ErrorBoundary } from 'react-error-boundary'
import { useClientInit } from '@renderer/hooks/use-client-init.ts'

function Player() {
  useClientInit()

  return (
    <ErrorBoundary fallback={<h1>error...</h1>}>
      <WinBar />
    </ErrorBoundary>
  )
}

export default Player
