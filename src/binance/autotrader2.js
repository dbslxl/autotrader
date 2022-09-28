const WebSocket = require('ws')
const axios = require('axios')

//const binanceURL = 'wss://dstream.binance.com/ws/btcusd_perp@kline_4h'
const binaceAPIURL = 'https://fapi.binance.com'

class AutoTrader {
    constructor(symbol) {
        this.symbol=symbol

        this.prevCross='' //up or down
        this.currentPosition='' //long or short
        
        this.on('upcross',()=>{
            this.Obv15mTimer&&clearInterval(this.Obv15mTimer)
            this.Obv5mTimer=setInterval(this.checkObv5m,1000)
        })
        this.on('donwcross',()=>{
            this.Obv5mTimer&&clearInterval(this.Obv5mTimer)   
            this.Obv15mTimer=setInterval(this.checkObv15m,1000)
        })      
        
        // this.isWatching = false
        // this.crossFlagList=[]

    }
  
    run(){
        this.prevCross = getCurrentCross()
        this.CurrentPosition = getCurrentPosition()
        this.Obv1dTimer=setInterval(checkObv1d,1000)
    }

    stop(){
        clearInterval(this.Obv1dTimer&&this.Obv1dTimer)
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
    checkObv5m(){
        //5분 obv upcross 체크
        //현재 보유중인 포지션이 없으면 long 매수 
        //foot 매도중이면 foot매수후 long 매수
        clearInterval(this.Obv5mTimer)        
    }
    checkObv15m(){
        //15분 obv downcross 체크
        //현재 보유중인 포지션이 없으면 foot 매도
        //long 매수중이면 long매도후 foot 매도
        clearInterval(this.Obv15mTimer)
    }
    
}
