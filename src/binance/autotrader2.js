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

    stop(){
        
    }

    watch(){
        for (symbol in crossFlag){
            //poll the server to check if obv240 is crossed.
            //if crossed, set the cross flag and fire an crossed event.   
        }
    }
    autoBuy(){
        //if the cross event occured and the prediction condition is met,
        //open the websocket stream to monitor obv15 and obv5 
        //if all the conditions are met place an buy order with the 2% stop.
    }
    sell(){
        //monitor the buy history list and crossFlag list to check if the sell condition is met.
    }
}