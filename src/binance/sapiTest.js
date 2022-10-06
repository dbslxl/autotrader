const axios = require('axios');
const crypto = require('crypto')

const parameter=`timestamp=${Date.now()}&symbol=BTCUSDT&side=buy&quantity=1&type=limit`
const signature = crypto.createHmac('sha256','UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt').update(parameter).digest('hex')
const hmac = parameter+`&signature=${signature}`
//console.log(hmac)
//url=`https://api.binance.com/api/v3/order?${hmac}`
url=`https://api.binance.com/api/v3/order/test?${hmac}`



axios.post(url,{},
    {headers:{
        "X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'
     }
    }).then((response)=>{
        console.log(response.data)
    })

// axios.get("http://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m",{
//     headers:{"X-MBX-APIKEY":'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL'}
// }).then((response)=>{console.log(response.data)})