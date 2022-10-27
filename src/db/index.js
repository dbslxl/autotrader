const {MongoClient} = require('mongodb')

// const uri='mongodb://yovkr_admin:YoYohub0410!%24@192.168.219.104:27018/?authMechanism=DEFAULT&authSource=admin'
const uri='mongodb+srv://yoyohub:w4O6Mj6ERyCTMgvP@cluster0.uodklqo.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)

module.exports = client