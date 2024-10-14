/**
 author: william   email:362661044@qq.com
 create_at: 2023/10/31
 **/
import { ComponentType } from 'react'

type IBtn = {
  Com: ComponentType<any>
  onClick: () => void
}
export const WinBarBtn = (props: IBtn) => {
  const { onClick, Com } = props
  return (
    <div
      onClick={onClick}
      className={
        'none-drag rounded-sm text-gray-500 hover:text-gray-800 transition cursor-pointer grid place-items-center'
      }
    >
      <Com className={'w-6 h-6 '} />
    </div>
  )
}
