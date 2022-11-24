// const mysql = require('mysql2/promise')
//  mysql.createConnection({
//     host     : '182.209.94.41',
//     user     : 'yoyohub',
//     password : 'YoYo0410',
//     database : 'yovkr_app'
// })
//     .then((connection)=>connection.execute(`select * from obv_version`)
       
//     ).then(([versions,fields])=>console.log(versions.map((version)=>version.version_name)))
   
let versions=[ 'v1', 'v2' ]
const rows1=[2,4,6,1,3,1]
const rows2=[2,4,6,4,2]

let version_obj={}

versions.map((version)=>{
    version_obj[version]=rows1
})

console.log(version_obj)
console.log('git test')