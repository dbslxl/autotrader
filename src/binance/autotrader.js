const WebSocket = require('ws')
const axios = require('axios')

//const binanceURL = 'wss://dstream.binance.com/ws/btcusd_perp@kline_4h'
const binaceAPIURL = 'https://fapi.binance.com'

class AutoTrader {
    constructor(symbol) {
        this.symbol=symbol
        this.delay=1000

        this.prevCross='' //up or down
        this.currentPosition='' //long or short
        
        this.on('upcross',()=>{
            this.Obv15mTimer&&clearInterval(this.Obv15mTimer)
            this.Obv5mTimer=setInterval(this.checkObv5m.bind(this),1000)
        })
        this.on('donwcross',()=>{
            this.Obv5mTimer&&clearInterval(this.Obv5mTimer)   
            this.Obv15mTimer=setInterval(this.checkObv15m.bind(this),1000)
        })      
        
        // this.isWatching = false
        // this.crossFlagList=[]

    }
  
    run(){
        this.prevCross = getCurrentCross()
        this.CurrentPosition = getCurrentPosition()
        this.Obv1dTimer=setInterval(this.checkObv1d.bind(this),1000)
    }

    stop(){
        clearInterval(this.Obv1dTimer&&this.Obv1dTimer) // maybe no need to check if the timer exists. clearInterval does nothing if there is no timer
        clearInterval(this.Obv15mTimer&&this.Obv15mTimer)
        clearInterval(this.Obv5mTimer&&this.Obv5mTimer)
        this.prevCross=''
        this.CurrentPosition=''
    }
   
    calculateObv(){

    }
    getCurrentCross(){

    }
    getCurrentPosition(){

    }
    async checkObv1d(){
        //check 1d obv by polling the api
        response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=1d&limit=10`)
        if(calculateObv(response.data)>0){
            //upcross 시 업크로스 이벤트 emit
            if(this.prevCross!=='up'){
                this.prevCross='up'
                this.emit('upcross')
            }
        }else if(calculateObv(response.data)<0){
            //downcross 시 다운크로스 이벤트 emit
            if(this.prevCross!=='down'){
                this.prevCross='down'
                this.emit('downcross')
            }
        }
    }
    //To do : Change this to nested setTimeOut instead of setInterval.
    // checkObv5m(){
    //     //5분 obv upcross 체크
    //     //현재 보유중인 포지션이 없으면 long 매수 
    //     //foot 매도중이면 foot매수후 long 매수
    //     if(currentPosition==="short"){

    //     }
    //     clearInterval(this.Obv5mTimer)        
    // }
    // checkObv15m(){
    //     //15분 obv downcross 체크
    //     //현재 보유중인 포지션이 없으면 foot 매도
    //     //long 매수중이면 long매도후 foot 매도
    //     clearInterval(this.Obv15mTimer)
    // }

    async checkObv5m(){
        //5분 obv upcross 체크
        response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=1d&limit=10`)
        const obv5m=calculateObv(response.data)
        //현재 보유중인 포지션이 없으면 long 매수 
        //short 매도중이면 short 매수후 long 매수

        if(currentPosition==="short"){
            //api call to sell short
            //then api call to buy long
        }
        
        setTimeout(checkObv5m.bind(this),this.delay)        
    }
    checkObv15m(){
        //15분 obv downcross 체크
        //현재 보유중인 포지션이 없으면 foot 매도
        //long 매수중이면 long매도후 foot 매도
        clearInterval(this.Obv15mTimer)
    }
    
}
