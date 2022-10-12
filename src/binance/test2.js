const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')
const binance=new Binance().options({
    APIKEY:'5eD1LQCYKEdOyYuOeZWavfFWzhecoDMFBxBoUniBCXHRqBPECawXEU1JTeAVZllB',
    APISECRET:'DdRzV1XKoZAPlzpjALQzjNlh8uuYuoFqr6OAsK8jIqF9NmCAk7iEIJvRItOHx3E7'
})


async function init(){
  
    let account=await binance.futuresAccount()
    //let position=account.positions.find((position)=>position.symbol==='BTCUSDT')
    let position=account.positions.find((position)=>position.positionAmt!=0)
    
    let asset=account.assets.find((asset)=>asset.asset==='USDT')
    
    console.log('Initial position :', position)
    console.log('Initial Asset : ',asset)
    //console.log(this)
}

init()
