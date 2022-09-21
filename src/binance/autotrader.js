const WebSocket = require('ws')
const axios = require('axios')

const binanceURL = 'wss://dstream.binance.com/ws/btcusd_perp@kline_4h'

ws = new WebSocket(binanceURL)
//ws = new WebSocket(binanceURL)


ws.onopen = (event)=>{
    // webSocket.send(JSON.stringify(msg))
    console.log('socket connected')
    setTimeout(()=>{
        // ws.send(JSON.stringify({
        //     "method": "SUBSCRIBE",
        //     "params":
        //     [
        //     "btcusdt@aggTrade",
        //     "btcusdt@depth"
        //     ],
        //     "id": 1
        //     }))
    },3000)
}


ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

function sendData(ws){
    ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params":
        [
        "btcusdt@aggTrade",
        "btcusdt@depth"
        ],
        "id": 1
    }))
}

class AutoTrader{
    constructor(symbol){
        this.symbol=symbol
        this.data=[]
        
    }

    async run(){
        this.data=await axios.get('https://dapi.binance.com/dapi/v1/klines?symbol=btcusd_perp&interval=5m').data
        this.ws=new WebSocket('wss://dstream.binance.com/ws')
        ws.onopen= (event)=>{            
            console.log('socket connected')
            setTimeout(()=>{
                console.log('sending message to the server')
                ws.send(JSON.stringify({
                    "method": "SUBSCRIBE",
                    "params":
                    [
                    "btcusd_perp@kline_5m",
                    "ethusd_perp@kline_5m"
                    ],
                    "id": 1
                    }))
            },3000)
            ws.on('message', (data)=>{
                console.log('received: %s', data);
            })
        }
    }

}