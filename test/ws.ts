/**
 author: william   email:362661044@qq.com
 create_at: 2025/1/20
 **/
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
})
const clients = new Set<any>()
wss.on('connection', function connection(ws) {
  ws.on('error', console.error)
  clients.add(ws)
  ws.on('message', function message(data) {
    console.log('received: %s', data, ws)
    // clients.forEach((client) => {
    //   client
    // })
  })

  ws.send('something')
})
