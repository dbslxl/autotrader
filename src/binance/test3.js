const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')
const binance=new Binance().options({
    APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
    APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt',   
})
// 사장님
// const binance=new Binance().options({
//     APIKEY:'5eD1LQCYKEdOyYuOeZWavfFWzhecoDMFBxBoUniBCXHRqBPECawXEU1JTeAVZllB',
//     APISECRET:'DdRzV1XKoZAPlzpjALQzjNlh8uuYuoFqr6OAsK8jIqF9NmCAk7iEIJvRItOHx3E7'
// })
//실장님
// const binance=new Binance().options({
//     APIKEY:'A4nOHmYpEL9T73QKVGcr5ZKE2WiOtzdHZ9G2iCWaDGVMvXTbfeyrYIJeyltn8SSc',
//     APISECRET:'SuT2cu12uIhjB9mCeGj3D4TGM2EeiN8tNAKDxCXWswHz3T2SFZimK5bgUGLFyVmS'
// })
const precision={"BTCUSDT":3, "ETHUSDT":3, "BNBUSDT":2, "DOGEUSDT":0}
const investmentRatio = 1
async function init(){
  
    //let account=await binance.futuresAccount()
    // let position=account.positions.find((position)=>position.symbol==='BTCUSDT')
    //let position=account.positions.find((position)=>position.positionAmt!=0)
    
    //let asset=account.assets.find((asset)=>asset.asset==='USDT')
    
    // console.log('Initial position :', position)
    // console.log('Initial Asset : ',asset)
    // console.log(this)


    // console.log(await binance.futuresUserTrades("ETHUSDT"))
    //console.info( await binance.futuresIncome().find((data)=>data.incomeType=='TRANSFER') );
    // const account = await binance.futuresAccount()
    // console.log('type of account is ',account)
    // const income= await binance.futuresIncome({limit:1000})
    // console.log('type of income is ',income)
    // const transfer=income.filter((data)=>data.incomeType=='TRANSFER')
    // console.log(transfer)
    // console.log(this.binance)
 
    // const symbol='DOGEUSDT'
    // const quote = await binance.futuresQuote(symbol)
    // const account = await binance.futuresAccount()
    // const asset = account.assets.find((asset)=>asset.asset=='USDT')
    // const position = account.positions.find((position)=>position.symbol==symbol)
    // let amt=Number(asset.marginBalance)*investmentRatio/Number(quote.bidPrice)
    // let positionAmt=Number(position.positionAmt)
    // amt=Math.floor(amt*Math.pow(10,precision[symbol]))/Math.pow(10,precision[symbol])
    // amt=amt.toFixed(precision[symbol])
    // console.log(symbol,amt)
    // amt=Math.abs(positionAmt)+Number(amt)
    // console.log('Sell short and Buy long',symbol,amt)
    //console.log(binance.futuresMarketSell('DOGEUSDT',429))
}

init()

// testObj={a:1,aaa:3,"aaa":5,bbb:[3,5,6,7,2],ff:function(){console.log('this : ',this)}}
// testObj.ff()
// ff()
