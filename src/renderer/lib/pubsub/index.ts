/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/10
 **/

import { PubSub } from './core'
import { IPubSub } from './event'

export const pubSub = new PubSub<IPubSub>()
