const axios = require('axios')
const EventEmitter = require('events')

const binaceAPIURL = 'https://fapi.binance.com'
class AutoTrader extends EventEmitter{
    constructor(symbol) {
        super()
        this.symbol=symbol        
        this.isRunning=false;        
        this.currentCross='' //up or down
        this.currentPosition='' //long or short
        this.on('upcross',()=>{           
            console.log('upcross event happend ')
            this.checkObv5m()
        })
        this.on('downcross',()=>{          
            console.log('down cross event hapened')
            this.checkObv15m()
        }) 
        setTimeout(()=>{this.emit('upcross')},10000) //It doesn't work if not using arrow function     
    }    
    
    async run(){       
        this.currentCross = await this.getCurrentCross()
        console.log(`Initial cross : ${this.currentCross}`)
        this.currentPosition = this.getCurrentPosition()
        console.log(`Initial position : ${this.currentPosition}`)
        this.isRunning=true
        this.checkObv1d()      
    }
    stop(){
        console.log('stop method gets called.')
        this.isRunning=false
        this.currentCross=''
        this.currentPosition=''
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
    
    async checkObv1d(){
        if(!this.isRunning) return
        let interval=Math.random()*10000

        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=1d&limit=10`)
        const Obv1d= this.calculateObv(response.data)
        console.log(`Current Obv 1Day is ${Obv1d}`)
        if(Obv1d>0){
            if(this.currentCross!=='up'){
                this.currentCross='up'
                this.emit('upcross')
                console.log('Upcross event fired!')
            }
        }else if(Obv1d<0){
            if(this.currentCross!=='down'){
                this.currentCross='down'
                this.emit('downcross')
                console.log('Downcross event fired!')
            }
        }
        console.log(`interval is ${interval}`)
        setTimeout(this.checkObv1d.bind(this),interval)
    }        
    async checkObv5m(){        
        if(this.currentCross!=='up'){
            console.log('check 5m obv function is ended because current cross is not up')
            return
        }        
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=5m&limit=10`)
        const obv5m=this.calculateObv(response.data)
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
                console.log('obv 1d up and but position is wrong weird..')
            }
            return            
        }
        console.log(`--5m obv is not up(${obv5m}) so looping again...`)
        setTimeout(this.checkObv5m.bind(this),1000)        
    }

    async checkObv15m(){
        if(this.currentCross!=='down'){
            console.log('check 15m obv function is ended because current cross is not down')
            return
        }
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${this.symbol}&interval=15m&limit=10`)
        const obv15m=this.calculateObv(response.data)
        if (obv15m<0){
            if(this.currentPosition==="long"){
                //api call to sell long
                //then api call to buy short
                console.log(`buy the assets! and exiting...obv15m(${obv15m})`)
            }else if(this.currentPosition===''){
                //api call to buy short
            }else{
                throw new Error("error in obv15")
            }
            return
        }
        console.log(`--15m obv is not down(${obv15m}) so looping again...`)
        setTimeout(this.checkObv15m.bind(this),1000)        
        
    }
    
}

const autoTrader = new AutoTrader('btcusdt');
//Object.assign(autoTrader,EventEmitter.prototype)
autoTrader.run()
setTimeout(autoTrader.stop.bind(autoTrader),20000)// need some research about JavaScript Lexical environment.
setTimeout(autoTrader.run.bind(autoTrader),25000)
