const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')
const binance=new Binance().options({
    APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
    APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt'
})


async function init(){
  
    // let account=await binance.futuresAccount()
    // //let position=account.positions.find((position)=>position.symbol==='BTCUSDT')
    // let position=account.positions.find((position)=>position.positionAmt!=0)
    
    // let asset=account.assets.find((asset)=>asset.asset==='USDT')
    
    // console.log('Initial position :', position)
    // console.log('Initial Asset : ',asset)
    // console.log(this)


    console.log(await binance.futuresUserTrades("ETHUSDT"))
}

//init()

testObj={a:1,aaa:3,"aaa":5,bbb:[3,5,6,7,2],ff:function(){console.log('this : ',this)}}
testObj.ff()
ff()
