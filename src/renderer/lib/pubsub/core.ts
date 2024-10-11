/**
 author: william   email:362661044@qq.com
 create_at:2023/6/16 4:21 PM
 **/
import EventEmitter from 'eventemitter3'

type ID = Record<string | symbol, any>

export type IParams<IPS extends ID, K extends keyof IPS> = {
  key: K
  data?: IPS[K]
}

export type ISubscribe<IPS extends ID, K extends keyof IPS> = {
  key: K
  handler: (data: IPS[K]) => void
}

export class PubSub<IPS extends ID> {
  private instance: EventEmitter

  constructor() {
    this.instance = new EventEmitter()
  }

  publish<K extends keyof IPS>(params: IParams<IPS, K>) {
    const { key, data } = params
    this.instance.emit(key.toString(), data)
  }

  eventNames() {
    const obj = {}
    this.instance.eventNames().forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[key] = this.instance.listenerCount(key)
    })
    return obj
  }

  subscribe<K extends keyof IPS>(params: ISubscribe<IPS, K>) {
    const { key, handler } = params
    this.instance.on(key.toString(), handler)
    // console.log('pubSub', this.eventNames())
    return () => {
      this.instance.off(key.toString(), handler)
    }
  }

  subscribeOnce<K extends keyof IPS>(params: ISubscribe<IPS, K>) {
    const { key, handler } = params
    this.instance.once(key.toString(), handler)
    return () => {
      this.instance.off(key.toString(), handler)
    }
  }

  removeAllListeners() {
    this.instance.removeAllListeners()
  }
}
