const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
var mysqlConnection =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procost'
  })


async function fetchUsers(req, res){
    console.log("still in the learning process");

    try{   const result = await mysqlConnection.query('SELECT * FROM itemtemplate ');
    console.log(result[0]);
        }
        catch{
            console.log("gggg")
        }
// 29 5, 33 4,34 2, 38 2, 40 1,48 2,   51 2

            
}



module.exports.fetchUsers = fetchUsers;