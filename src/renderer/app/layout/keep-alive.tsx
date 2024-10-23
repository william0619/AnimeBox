/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/

import { useUpdate } from 'ahooks'
import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export function KeepAlive() {
  const componentList = useRef(new Map())
  const outLet = useOutlet()
  const { pathname } = useLocation()
  const forceUpdate = useUpdate()

  useEffect(() => {
    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, outLet)
    }
    forceUpdate()
  }, [pathname])

  return (
    <div data-com={'keep-alive'}>
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key} hidden={pathname !== key}>
          {component}
        </div>
      ))}
    </div>
  )
}
