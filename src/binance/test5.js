var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : '192.168.219.104',
  user     : 'root',
  password : 'YoYohub0410!@',
  database : 'yovkr_app' 
});

connection.query(
    'SELECT * FROM `auto_trader_config`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      
    }
  );