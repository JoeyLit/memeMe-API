var express = require('express'),
   routes = require('../routes')
  , path = require('path'),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");
	
	// LOCAL
// var connection = mysql.createPool({
// 	connectionLimit: 10,
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '1Loveelid@',
// 	database : 'meme-api'
// });

	// SERVER
var connection = mysql.createPool({
	connectionLimit: 10,
	host     : 'MYSQL6003.site4now.net',
	user     : 'a62168_mememe',
	password : 'John3!16',
	database : 'db_a62168_mememe'
});


 
// connection.connect(()=>{
// 	console.log('database connected')
// });
 
global.db = connection;

module.exports = connection