const axios = require('axios');
const crypto = require('crypto')

const parameter=`symbol=BTCUSDT&side=BUY&type=LIMIT&price=1290&quantity=0.004&timestamp=${Date.now()}`
// const parameter=`timestamp=${Date.now()}`
const signature = crypto.createHmac('sha256','UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt').update(parameter).digest('hex')
const hmac = parameter+`&signature=${signature}`
//console.log(hmac)

url=`https://fapi.binance.com/fapi/v1/order?${hmac}`
//url=`https://fapi.binance.com/fapi/v1/order`
// url=`https://testnet.binancefuture.com/fapi/v2/account?${hmac}`
// url=`https://fapi.binance.com/fapi/v2/account?${hmac}`


// axios.get(url,
//     {headers:{
//         "X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'
//      }
//     }).then((response)=>{
//         console.log(response.data)
//     })

// axios.get("http://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m",{
//     headers:{"X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'}
// }).then((response)=>{console.log(response.data)})

axios({
    metohd:'POST',
    // data:{
    //     symbol:'ETHUSDT',side:'BUY',type:'MARKET',quatity:'0.004',timestamp:`${Date.now()}`,signature
    // },
    url,
    headers:{"X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'}
}).then((response)=>console.log(response.data))