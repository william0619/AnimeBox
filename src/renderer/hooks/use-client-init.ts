/**
 author: william   email:362661044@qq.com
 create_at:2023/6/4 10:21 AM
 **/
import { useEventListener, useMount } from 'ahooks'
import { ClientUtils } from '@renderer/utils/client.utils.ts'

export const useClientInit = () => {
  const ele = ClientUtils.instance()

  useMount(async () => {
    if (ele) {
      const winName = await ele.ipcRenderer.invoke('getWinName')
      ClientUtils.setWinName(winName)
    }
  })

  // 客户端拦截所有a 标签打开链接
  useEventListener(
    'click',
    (event) => {
      if (ele) {
        // 获取点击的目标元素
        const target = event.target
        // 检查点击的元素是否为 <a> 标签
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (target && target?.tagName === 'A') {
          // 阻止默认的打开行为
          event.preventDefault()

          // 获取打开的链接
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const href = target.getAttribute('href')
          ClientUtils.openUrl(href)
        }
      }
    },
    { target: document.body, capture: true }
  )
}
