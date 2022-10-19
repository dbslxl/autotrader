const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')

binance=new Binance().options({
    APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
    APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt'
})
symbols=['BTCUSDT','ETHUSDT','BNBUSDT','DOGEUSDT']
investmentRatio=1
minimumAmt={"BTCUSDT":0.001,"ETHUSDT":0.004,"BNBUSDT":0.02,"DOGEUSDT":86}
precision={"BTCUSDT":3, "ETHUSDT":3, "BNBUSDT":2, "DOGEUSDT":0}

async function test(symbol){
    const quote = await this.binance.futuresQuote( symbol )
    const account = await this.binance.futuresAccount()
    const asset = account.assets.find((asset)=>asset.asset=='USDT')
    const position = account.positions.find((position)=>position.symbol==symbol)
    console.log("marginBalance : ",Number(asset.marginBalance))
    console.log("investmentRatio : ", this.investmentRatio)
    console.log("askprice : ",Number(quote.askPrice))

    let amt=Number(asset.marginBalance)*this.investmentRatio/Number(quote.askPrice)
    amt=Math.floor(amt*Math.pow(10,precision[symbol]))/Math.pow(10,precision[symbol])
    amt=amt.toFixed(precision[symbol])
    //let res=await this.binance.futuresMarketSell(symbol,amt)      
    console.log("order : ",symbol,amt)
    //console.log(res)
}
async function test2(symbol){
    //const quote = await this.binance.futuresQuote( symbol )
    const quote = await this.binance.futuresQuote( symbol )
    console.log(quote)
}

async function setFuturesLeverage(leverage){
    for (symbol of this.symbols){
        console.log(await this.binance.futuresLeverage(symbol,leverage))
    }
}

setFuturesLeverage(10)
// test2("ETHUSDT")
//test("DOGEUSDT")

// console.log(32.5556231235.toFixed(3))
// console.log(33*Math.pow(10,0))