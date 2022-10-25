const axios = require('axios')
const EventEmitter = require('events')
const Binance = require('node-binance-api')
//사장님
const binance=new Binance().options({
    APIKEY:'5eD1LQCYKEdOyYuOeZWavfFWzhecoDMFBxBoUniBCXHRqBPECawXEU1JTeAVZllB',
    APISECRET:'DdRzV1XKoZAPlzpjALQzjNlh8uuYuoFqr6OAsK8jIqF9NmCAk7iEIJvRItOHx3E7'
})

// 실장님
// const binance=new Binance().options({
//     APIKEY:'A4nOHmYpEL9T73QKVGcr5ZKE2WiOtzdHZ9G2iCWaDGVMvXTbfeyrYIJeyltn8SSc',
//     APISECRET:'SuT2cu12uIhjB9mCeGj3D4TGM2EeiN8tNAKDxCXWswHz3T2SFZimK5bgUGLFyVmS'
// })

// const binance=new Binance().options({
//     APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
//     APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt'
// })

async function init(){
  
    let account=await binance.futuresAccount()
    //console.log(account)
    //let position=account.positions.find((position)=>position.symbol==='BTCUSDT')
    let position=account.positions.filter((position)=>position.positionAmt!=0)
    
    let asset=account.assets.find((asset)=>asset.asset==='USDT')
    
    console.log('Initial position :', position)
    console.log('Initial Asset : ',asset)
    //console.log(this)
    //console.log(account.positions.find((position)=>position.symbol="BTCUSDT"))
    //console.log(account)

    
}

init()
