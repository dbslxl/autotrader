const WebSocket = require('ws')

const binanceURL = 'wss://stream.binance.com:9443'

ws = new WebSocket(binanceURL+'/ws/!miniTicker@arr')
//ws = new WebSocket(binanceURL)


ws.onopen = (event)=>{
    // webSocket.send(JON.stringify(msg))
    console.log('socket connected')
}
// ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });