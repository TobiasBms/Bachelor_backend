require("dotenv").config();
var mysql = require('mysql');

function db(){
    var connection = mysql.createConnection({
        host     : process.env.HOST,
        user     : process.env.USER,
        password : process.env.PASS,
        database : process.env.DB
    });

    connection.connect();

     connection.query('SHOW TABLES', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });

}

module.exports = db;
