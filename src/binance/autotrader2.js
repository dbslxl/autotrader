const WebSocket = require('ws')
const axios = require('axios')

const binanceURL = 'wss://dstream.binance.com/ws/btcusd_perp@kline_4h'

class AutoTrader2 {
    constructor(symbols) {
        for (symbol of symbols){
            //setup crossFlag
            //this.crossFlag={}            
        }
    }

    run(){
        this.watch();
        this.autoBuy();
    }

    watch(){
        for (symbol in crossFlag){
            
        }
    }
    autoBuy(){

    }
    sell(){

    }
}