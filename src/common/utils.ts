/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/

export async function retryFn<T = any>(
  fn: () => Promise<T>,
  option?: { retry?: number; delay?: number; errorMsg?: string }
) {
  const { retry = 3, delay = 1000, errorMsg } = option ?? {}
  let _retry = retry
  while (_retry > 0) {
    try {
      return await fn()
    } catch (e) {
      --_retry
      await sleep(delay)
    }
  }
  throw new Error(`重试次数已用完 ${retry} => ${errorMsg}`)
}

export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
