/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/
import { Nav } from '@renderer/app/layout/nav.tsx'
import { Logo } from '@renderer/app/layout/logo.tsx'
import { KeepAlive } from '@renderer/app/layout/keep-alive.tsx'

function MainLayout() {
  return (
    <div id={'main-layout'} className={'grid grid-cols-[12rem_1fr] w-screen h-screen'}>
      <div className={'bg-neutral-50 pt-8 space-y-2'}>
        <Logo />
        <Nav />
      </div>
      <section className={'pt-8 h-full w-full relative'}>
        <KeepAlive />
      </section>
    </div>
  )
}

export default MainLayout
