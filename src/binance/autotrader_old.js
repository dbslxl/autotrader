const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')
module.exports = class AutoTrader extends EventEmitter{
    constructor(symbol) {
        super()
        this.symbol=symbol        
        this.isRunning=false;        
        this.currentCross='' //up or down
       
        this.binance=new Binance().options({
            APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
            APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt'
        })
        this.on('upcross',()=>{           
            console.log('upcross event happend ')
            this.checkObv5m()
        })
        this.on('downcross',()=>{          
            console.log('down cross event hapened')
            this.checkObv15m()
        })
        this.minimumAmt={"BTCUSDT":0.001,"ETHUSDT":0.004}
        //setTimeout(()=>{this.emit('upcross')},10000) //It doesn't work if not using arrow function     
    }
    
    async init(){
        this.currentCross = await this.getCurrentCross()
        this.account=await this.binance.futuresAccount()
        this.position=this.account.positions.find((position)=>position.symbol===this.symbol)
        this.asset=this.account.assets.find((asset)=>asset.asset==='USDT')
        console.log(`Initial cross : ${this.currentCross}`)        
        console.log('Initial position :', this.position)
        console.log('Initial Asset : ',this.asset)
    }
    
    async run(){       
        await this.init();        
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
            const quote = await this.binance.futuresQuote( this.symbol )
            const amt=Number(this.asset.walletBalance)/10/Number(quote.askPrice)
            if (amt<this.minimumAmt[this.symbol]){
                console.log("not enough margin")
                return
            }
            if(Number(this.position.positionAmt)===0){
                await this.binance.futuresMarketBuy(this.symbol,amt)
                console.log('Buy long')
            }else if(Number(this.position.positionAmt)<=0){
                await this.binance.futuresMarketBuy(this.symbol,Math.abs(this.position.positionAmt)+amt)
                console.log('Sell short and Buy long')
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
            const quote = await this.binance.futuresQuote( this.symbol )
            const amt=Number(this.asset.walletBalance)/10/Number(quote.bidPrice)
            if (amt<this.minimumAmt[this.symbol]){
                console.log("not enough margin")
                return
            }
            if(Number(this.position.positionAmt)===0){
                await this.binance.futuresMarketSell(this.symbol,amt)
                
                console.log(`buy the assets! and exiting...obv15m(${obv15m})`)
            }else if(Number(this.position.positionAmt)>=0){
                await this.binance.futuresMarketSell(this.symbol,Math.abs(this.position.positionAmt)+amt)
            }
            return
        }
        console.log(`--15m obv is not down(${obv15m}) so looping again...`)
        setTimeout(this.checkObv15m.bind(this),1000)       
        
    }
    
}

const autoTrader = new AutoTrader('BTCUSDT');
//Object.assign(autoTrader,EventEmitter.prototype)
autoTrader.run()
setTimeout(autoTrader.stop.bind(autoTrader),20000)// need some research about JavaScript Lexical environment.
setTimeout(autoTrader.run.bind(autoTrader),25000)
