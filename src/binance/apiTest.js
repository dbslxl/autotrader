const axios = require('axios');
const crypto = require('crypto')

//const parameter=`symbol=BTCUSDT&side=BUY&type=MARKET&quantity=1&timestamp=${Date.now()}`
const parameter= `timestamp=${Date.now()}`

const signature = crypto.createHmac('sha256','UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt').update(parameter).digest('hex')
const hmac = parameter+`&signature=${signature}`

const url=`https://fapi.binance.com/fapi/v2/account?${hmac}`
//url=`https://testnet.binancefuture.com/fapi/v1/order?${hmac}`

// axios.post(url,{},
//     {headers:{
//         "X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'
//      }
//     }).then((response)=>{
//         console.log(response.data)
//     })

axios.get(url,{
    headers:{"X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'}
}).then((response)=>{console.log(response.data)})