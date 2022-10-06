const Binance = require('node-binance-api')
const binance = new Binance().options({
    APIKEY:'rQkKYkK7sa286zYyjqvygn8J3O6UXGydLDeRvhOdUUx8G1MMh0TPp5RiRJ9QG7xL',
    APISECRET:'UyzgLYvAdoTp4CQmc4JITsIQGPxuxMjAPaSroFe4sTUNweYugIW6PlW9to52S9yt'
})

async function test(){
    // console.info(await binance.futuresAccount())
    console.info(await binance.futuresBalance())

    // let account=await binance.futuresAccount()
    // console.log(account.positions.filter((data)=>data.symbol==='ETHUSDT'))

    //console.info(await binance.futuresPositionRisk())

    // let position_data = await binance.futuresPositionRisk(), markets = Object.keys( position_data );    
    // for ( let market of markets ) {
    // let obj = position_data[market], symbol = obj.symbol ;
    // if ( symbol !== 'BTCUSDT' ) continue;
    // console.info( obj );
    // //console.info( obj ); //positionAmt entryPrice markPrice unRealizedProfit liquidationPrice leverage marginType isolatedMargin isAutoAddMargin maxNotionalValue
    // }

    //console.info( await binance.futuresSell( 'ETHUSDT', 0.004, 1369 ) );
    //console.info( await binance.futuresMarketBuy( 'ETHUSDT', 0.004 ) );


    //console.info( await binance.futuresAllOrders() );
}

test()