const client = require('../db')

async function run(){
    try{
        await client.connect()
        const database = client.db('sample_mflix')
        const users = database.collection('users')        
        const stream = users.watch()
        stream.on('change',next=>{console.log('something has changed.',next)})
        
        userList=await users.find({name:'kim'}).toArray()
        console.log(userList)

    }catch(e){
        console.dir(e)
    }finally{
        // await client.close()
    }
}

run()