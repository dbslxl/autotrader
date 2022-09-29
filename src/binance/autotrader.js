const WebSocket = require('ws')
const axios = require('axios')
const EventEmitter = require('events')

//const binanceURL = 'wss://dstream.binance.com/ws/btcusd_perp@kline_4h'
const binaceAPIURL = 'https://fapi.binance.com'

class AutoTrader {
    constructor(symbol) {
        this.symbol=symbol
        this.delay=1000
        //this.isRunning=false;
        
        this.currentCross='up' //up or down
        this.currentPosition='' //long or short      
             
        
        // this.isWatching = false
        // this.crossFlagList=[]

    }
    
    init(){
        this.on('upcross',()=>{
            // this.Obv15mTimer&&clearInterval(this.Obv15mTimer)
            // this.Obv5mTimer=setInterval(this.checkObv5m.bind(this),1000)
            console.log('upcross event happend ')
            this.checkObv5m()
        })
        this.on('donwcross',()=>{
            // this.Obv5mTimer&&clearInterval(this.Obv5mTimer)   
            // this.Obv15mTimer=setInterval(this.checkObv15m.bind(this),1000)
        }) 
    }
    async run(){
        this.currentCross = await this.getCurrentCross()
        console.log(`Initial cross ${this.currentCross}`)
        this.currentPosition = this.getCurrentPosition()
        this.Obv1dTimer=setInterval(this.checkObv1d.bind(this),1000)
    }
    stop(){
        clearInterval(this.Obv1dTimer&&this.Obv1dTimer) // maybe no need to check if the timer exists. clearInterval does nothing if there is no timer
        // clearInterval(this.Obv15mTimer&&this.Obv15mTimer)
        // clearInterval(this.Obv5mTimer&&this.Obv5mTimer)
        this.currentCross=''
        this.currentPosition=''
    }
   
    calculateObv(dataList){
        let obv=0;
        dataList.forEach((data)=>{
            if(Number(data[4])-Number(data[1])>0){
                obv+=Number(data[5])
            }else if(Number(data[4])-Number(data[1]<0)){
                obv-=Number(data[5])
            }
        })
        return obv
    }

    async getCurrentCross(){
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=1d&limit=10`)
        let cross = this.calculateObv(response.data)>=0 ? "up" : "down"
        return cross;
    }
    getCurrentPosition(){
        //to do : need some research to check if it's possible to fetch account info from the binace api.
        return 'long' //dummy data
    }
    async checkObv1d(){
        //console.log('OBV 1Day function started')
        //check 1d obv by polling the api
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=1d&limit=10`)
        const Obv1d= this.calculateObv(response.data)
        console.log(`Current Obv 1Day is ${Obv1d}`)
        if(Obv1d>0){
            //upcross 시 업크로스 이벤트 emit
            if(this.currentCross!=='up'){
                this.currentCross='up'
                this.emit('upcross')
                console.log('Upcross event happened!')
            }
        }else if(Obv1d<0){
            //downcross 시 다운크로스 이벤트 emit
            if(this.currentCross!=='down'){
                this.currentCross='down'
                this.emit('downcross')
                console.log('Downcross event happened!')
            }
        }
        //console.log('OBV 1Day function ended')
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
        if(this.currentCross!=='up'){
            console.log('check 5m obv function is ended because current cross is not up')
            return
        }        
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=5m&limit=10`)
        const obv5m=this.calculateObv(response.data)

        //현재 보유중인 포지션이 없으면 long 매수 
        //short 매도중이면 short 매수후 long 매수
        if (obv5m>0){
            if(this.currentPosition==="short"){
                //api call to sell short
                //then api call to buy long
                console.log('Sell short and Buy long!!!')
            }else if(this.currentPosition===''){
                //api call to buy long
                console.log('Buy long!!!')
            }else{
                //throw new Error("error in obv5")
            }
            return            
        }
        console.log(`--5m obv is not up(${obv5m}) so looping again...`)
        setTimeout(this.checkObv5m.bind(this),this.delay)        
    }

    async checkObv15m(){

        if(this.currentCross!=='down'){
            return
        }
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=15m&limit=10`)
        const obv15m=this.calculateObv(response.data)
        if (obv15m<0){
            if(this.currentPosition==="long"){
                //api call to sell long
                //then api call to buy short
                console.log('buy the assets! and exiting')
            }else if(this.currentPosition===''){
                //api call to buy short
            }else{
                throw new Error("error in obv15")
            }
            return
        }

        setTimeout(this.checkObv15m.bind(this),this.delay)        
        
    }
    
}

const autoTrader = new AutoTrader('btcusdt');
Object.assign(autoTrader,EventEmitter.prototype)
autoTrader.run()
autoTrader.checkObv5m()
//autoTrader.emit('upcross')
//setTimeout(autoTrader.emit.bind,5000,autoTrader.this,"upcross")
console.log('End of main function')


