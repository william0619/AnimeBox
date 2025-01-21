/**
 author: william   email:362661044@qq.com
 create_at: 2025/1/20
 **/
// magnet:?xt=urn:btih:O5M5EUQOUKJD525GNTJRHQJX4TCNTCY3&dn=&tr=http%3A%2F%2F104.143.10.186%3A8000%2Fannounce&tr=udp%3A%2F%2F104.143.10.186%3A8000%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker3.itzmx.com%3A6961%2Fannounce&tr=http%3A%2F%2Ftracker4.itzmx.com%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.prq.to%2Fannounce&tr=http%3A%2F%2Fopen.acgtracker.com%3A1096%2Fannounce&tr=https%3A%2F%2Ft-115.rhcloud.com%2Fonly_for_ylbud&tr=http%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=http%3A%2F%2Ftracker2.itzmx.com%3A6961%2Fannounce&tr=udp%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=udp%3A%2F%2Ftracker2.itzmx.com%3A6961%2Fannounce&tr=udp%3A%2F%2Ftracker3.itzmx.com%3A6961%2Fannounce&tr=udp%3A%2F%2Ftracker4.itzmx.com%3A2710%2Fannounce&tr=http%3A%2F%2Ftr.bangumi.moe%3A6969%2Fannounce&tr=http%3A%2F%2Ft.nyaatracker.com%2Fannounce&tr=http%3A%2F%2Fopen.nyaatorrents.info%3A6544%2Fannounce&tr=http%3A%2F%2Ft2.popgo.org%3A7456%2Fannonce&tr=http%3A%2F%2Fshare.camoe.cn%3A8080%2Fannounce&tr=http%3A%2F%2Fopentracker.acgnx.se%2Fannounce&tr=http%3A%2F%2Ftracker.acgnx.se%2Fannounce&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=https%3A%2F%2Ftr.bangumi.moe%3A9696%2Fannounce&tr=http%3A%2F%2Ft.acg.rip%3A6699%2Fannounce&tr=https%3A%2F%2Fbtn-prod.ghostchu-services.top%2Ftracker%2Fannounce&tr=https%3A%2F%2Fsparkle.ghostchu-services.top%2Ftracker%2Fannounce
import { WebSocket } from 'ws'

// 创建一个 WebSocket 连接到 aria2c 的 JSON-RPC 接口
const ws = new WebSocket('ws://localhost:6800/jsonrpc')

// 处理连接错误
ws.on('error', console.error)

// 当连接打开时，发送一个 JSON-RPC 请求来添加下载任务
ws.on('open', function open() {
  const magnetUri = ''
  ws.send(
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'aria2.addUri',
      id: '2',
      // 9crK0pUoYw1KZXwEjDuPZtgQywK/OK/m
      params: ['token:123456', [magnetUri]]
    })
  )
})

// 处理接收到的消息
ws.on('message', function message(data) {
  console.log('received: %s', data)
})
