const WebSocket = require('ws')
const axios = require('axios')

const binanceURL = 'wss://dstream.binance.com/ws/btcusd_perp@kline_4h'

class AutoTrader2 {
    constructor(symbols) {
        this.isWatching = false
        this.crossFlagList=[]

        for (symbol of symbols){
            //fetch obv240 data of the symbols from the api
            //setup the crossFlag list
            //this.crossFlag=[{symbol:'ethusd_perp',prev_cross:'up',cross:''},{symbol:'btcusd_perp',prev_cross:'up',cross:'up'}]            
        }
    }

    test(){
        for (crossFlag of crossFlagList){

        }

        this.crossFlagList.filter((data)=>{
            data.cross
        })
    }

    run(){
        this.watch();
        this.autoBuy();
    }

    stop(){
        
    }
    watch(){
        for (symbol in crossFlag){
            //poll the api server to check if obv240 is crossed.
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

class AutoBuyer {
    constructor(){

    }
}

class AutoSeller {
    constructor(){

    }
}

//evet type : upcross, downcross, buy, sell 