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

let crossFlagList=[{symbol:'ethusd_perp',prev_cross:'up',cross:''},{symbol:'btcusd_perp',prev_cross:'up',cross:'up'},{symbol:'btcusd_perp',prev_cross:'up',cross:'up'},{symbol:'btcusd_perp',prev_cross:'up'}]

console.log(crossFlagList.filter(crossFlag=>!crossFlag.cross))
