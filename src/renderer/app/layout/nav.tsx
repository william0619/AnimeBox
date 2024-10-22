/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/
import { Button } from '@renderer/components/ui/button.tsx'
import { useMatches, useNavigate } from 'react-router'
import { navList } from '@renderer/app/router/routes.tsx'
import { useCallback } from 'react'
import { cn } from '@renderer/lib/utils.ts'

export const Nav = () => {
  const navigate = useNavigate()

  const matches = useMatches()

  const isActivity = useCallback(
    (path: string) => {
      return matches
        .filter((item) => item.pathname !== '/')
        .map((item) => item.pathname)
        .includes(path)
    },
    [matches]
  )

  const pushRoute = (path: string) => {
    navigate(path)
  }

  return (
    <div className={'flex flex-col gap-2 px-3 select-none'}>
      {navList.map((item) => {
        const Icon = item.icon
        const active = isActivity(item.path || '')
        return (
          <Button
            className={cn('gap-2 text-sm justify-start text-neutral-500', {
              'text-accent-foreground': active,
              'bg-primary/70 hover:bg-primary/70': active
              // 'text-primary': active
            })}
            key={item.path}
            size={'mini'}
            variant="ghost"
            onClick={() => pushRoute(item.path || '')}
          >
            <Icon className={'w-4'} />
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}
