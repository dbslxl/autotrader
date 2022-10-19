const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')

class AutoTrader{
    constructor(symbols) {        
        this.symbols=symbols        
        this.isRunning=false; 

        this.obvs={}       
        this.minimumAmt={"BTCUSDT":0.001,"ETHUSDT":0.004,"BNBUSDT":0.02,"DOGEUSDT":86}
        this.precision={"BTCUSDT":3, "ETHUSDT":3, "BNBUSDT":2, "DOGEUSDT":0}
        this.investmentRatio=0.1
        // this.binance=new Binance().options({
        //     APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
        //     APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt'
        // })
        this.binance=new Binance().options({
            APIKEY:'A4nOHmYpEL9T73QKVGcr5ZKE2WiOtzdHZ9G2iCWaDGVMvXTbfeyrYIJeyltn8SSc',
            APISECRET:'SuT2cu12uIhjB9mCeGj3D4TGM2EeiN8tNAKDxCXWswHz3T2SFZimK5bgUGLFyVmS'
        })
    }
    
    async run(){              
        this.isRunning=true
        for (let symbol of this.symbols){
            this.checkObv1d(symbol)    
        }          
    }
    stop(){
        console.log('stop method gets called.')
        this.isRunning=false       
    }
    setInvestmentPercentage(ratio){
        this.investmentRatio=ratio
    }
    async setFutresLeverage(levarage){
        for (symbol of this.symbols){
            console.log(await this.binance.futuresLeverage(symbol,leverage))
        }
    }
    
    async checkObv1d(symbol){
        if(!this.isRunning) return
        //let interval=Math.random()*10000
       
        const obv = await this.getObv(symbol)
        console.log(`Current Obv for ${symbol} is ${obv}`)
        console.log(this.obvs)
        if(obv>0){
            if(this.obvs[symbol]<=0){                
                this.checkObv5m(symbol)                
            }
        }else if(obv<0){
            if(this.obvs[symbol]>=0){                
                this.checkObv15m(symbol)                
            }
        }
        //console.log(`interval is ${interval}`)
        this.obvs[symbol] = obv
        setTimeout(this.checkObv1d.bind(this,symbol),60000)
    }        
    async checkObv5m(symbol){        
        if(this.isRunning!=true||!this.obvs[symbol]||this.obvs[symbol]<=0){
            console.log('check 5m obv function is ended because current cross is not up')
            return
        }        
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=5m&limit=10`)
        const obv5m=this.calculateObv(response.data)
        if (obv5m>0){
            const quote = await this.binance.futuresQuote( symbol )
            const account = await this.binance.futuresAccount()
            const asset = account.assets.find((asset)=>asset.asset=='USDT')
            const position = account.positions.find((position)=>position.symbol==symbol)
            let amt=Number(asset.marginBalance)*this.investmentRatio/Number(quote.askPrice)
            amt=Math.floor(amt*Math.pow(10,this.precision[symbol]))/Math.pow(10,this.precision[symbol])
            amt=amt.toFixed(this.precision[symbol])
            if (amt<this.minimumAmt[symbol]){
                console.log("not enough margin")
                return
            }
            if(Number(position.positionAmt)===0){
                await this.binance.futuresMarketBuy(symbol,amt)
                console.log('Buy long')
            }else if(Number(position.positionAmt)<=0){
                await this.binance.futuresMarketBuy(symbol,Math.abs(position.positionAmt)+amt)
                console.log('Sell short and Buy long')
            }
            return            
        }
        console.log(`--5m obv is not up(${obv5m}) so looping again...`)
        setTimeout(this.checkObv5m.bind(this,symbol),1000)        
    }    
    async checkObv15m(symbol){
        if(this.isRunning!=true||!this.obvs[symbol]||this.obvs[symbol]>=0){
            console.log('check 15m obv function is ended because current cross is not down')
            return
        }
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=15m&limit=10`)
        const obv15m=this.calculateObv(response.data)        
        if (obv15m<0){
            const quote = await this.binance.futuresQuote( symbol )
            const account = await this.binance.futuresAccount()
            const asset = account.assets.find((asset)=>asset.asset=='USDT')
            const position = account.positions.find((position)=>position.symbol==symbol)
            let amt=Number(asset.marginBalance)*this.investmentRatio/Number(quote.bidPrice)
            amt=Math.floor(amt*Math.pow(10,this.precision[symbol]))/Math.pow(10,this.precision[symbol])
            amt=amt.toFixed(this.precision[symbol])
            console.log(symbol,amt)
            if (amt<this.minimumAmt[symbol]){
                console.log("not enough margin")
                return
            }
            if(Number(position.positionAmt)===0){
                await this.binance.futuresMarketSell(symbol,amt)                
                console.log(`buy the assets. and exiting...obv15m(${obv15m})`)
            }else if(Number(position.positionAmt)>=0){
                await this.binance.futuresMarketSell(symbol,Math.abs(position.positionAmt)+amt)
                console.log(`buy the assets 2times! and exiting...obv15m(${obv15m})`)
            }
            return
        }
        console.log(`--15m obv is not down(${obv15m}) so looping again...`)
        setTimeout(this.checkObv15m.bind(this,symbol),1000)     
    }
    
    async getObv(symbol){
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=1d&limit=10`)
        const obv = this.calculateObv(response.data)
        return obv
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
}

//const autoTrader = new AutoTrader(['BTCUSDT','ETHUSDT','BNBUSDT','DOGEUSDT']);
const autoTrader = new AutoTrader(['BTCUSDT','ETHUSDT','BNBUSDT','DOGEUSDT']);
autoTrader.run()

//setTimeout(autoTrader.checkObv15m.bind(autoTrader,'ETHUSDT'),5000)
// setTimeout(autoTrader.run.bind(autoTrader),25000)
