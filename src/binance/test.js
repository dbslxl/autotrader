// const fetch =require('node-fetch')
const axios = require('axios')
// import axios from 'axios'
// import fetch from 'node-fetch'

// axios.get('https://dapi.binance.com/dapi/v1/klines?symbol=btcusd_perp&interval=5m')
//     .then((response)=>response.data)
//     .then((data)=>console.log(data))

// axios.get('https://dapi.binance.com/dapi/v1/klines?symbol=btcusd_perp&interval=5m')
// .then((response)=>console.log(response.data))

// axios.get('https://dapi.binance.com/dapi/v1/klines?symbol=btcusd_perp&interval=5m&limit=1500')
//     .then((response)=>console.log(response.data,response.data.length))

// let crossFlagList=[{symbol:'ethusd_perp',prev_cross:'up',cross:''},{symbol:'btcusd_perp',prev_cross:'up',cross:'up'},{symbol:'btcusd_perp',prev_cross:'up',cross:'up'},{symbol:'btcusd_perp',prev_cross:'up'}]

// console.log(crossFlagList.filter(crossFlag=>!crossFlag.cross))

// let cnt = 0;
// function test(){
//     console.log(cnt++)
//     let delay=Math.random()*10000
    
//     if(cnt>10){
//         console.log('exiting...')
//         return
//     }
//     console.log(`next function call in ${delay/1000} seconds...`)
//     setTimeout(test,delay)
// }

// test()

function foo(){
    this.a='aaa'
    console.log(this)
}

let result=new foo()
console.log('result : ',result)