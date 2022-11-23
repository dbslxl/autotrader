var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : '192.168.219.104',
  user     : 'root',
  password : 'YoYohub0410!@',
  database:'yovkr_app'  
});

connection.query(
  `UPDATE node_trader set "status"=0, "condition"="8h", ratio=10, leverage=20`,
  function(err, results) {
    if(err){
      console.error(err)
    }
    console.log('result : ',results); // results contains rows returned by server
    
  }
);

// connection.query(`insert into node_trader_log (log_type,log_content) values('type string','content string')`)

// connection.end()

// console.log(true.toString())