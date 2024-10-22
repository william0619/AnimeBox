/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/
import { Nav } from '@renderer/app/layout/nav.tsx'
import { Logo } from '@renderer/app/layout/logo.tsx'
import { KeepAlive } from '@renderer/app/layout/keep-alive.tsx'
import { ClientUtils } from '@renderer/utils/client.utils.ts'
import { cn } from '@renderer/lib/utils.ts'

function MainLayout() {
  const client = ClientUtils.instance()

  const isWin = client.isWin()

  return (
    <div id={'main-layout'} className={'grid grid-cols-[12rem_1fr] w-screen h-screen'}>
      <div className={cn('bg-neutral-50 space-y-2')} style={{ paddingTop: isWin ? 0 : 'var(--win-bar-height)' }}>
        <Logo />
        <Nav />
      </div>
      <section className={'h-full w-full relative'} style={{ paddingTop: 'var(--win-bar-height)' }}>
        <KeepAlive />
      </section>
    </div>
  )
}

export default MainLayout
