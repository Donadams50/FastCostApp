const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const common = require('./dataAccess/userDataAccess');
const app = express();
app.use(bodyparser.json());
const secret = "yoursecret";
module.exports = { secret };

const busboy = require("then-busboy");
const fileUpload = require('express-fileupload');
app.use(fileUpload());


common.fetchUsers();
console.log("line after db query");
console.log("line2 after db query");


var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procostorig'
  })
  //connecting to database
  mysqlConnection.connect((err) => {
    if(!err)
    console.log('DB connection is succeeded');
    else 
    console.log('DB conection failed \n Error: '+ JSON.stringify(err, undefined, 2)); 
   
});

//Passport Middleware
        app.use(passport.initialize());
        app.use(passport.session());
//set static folder
        app.use(express.static(path.join(__dirname, 'public')));

// defining the middlewares
        app.use(cors());

//bring the passport authentication strategy
      require('./config/passport')(passport);
 // bringing in the user routes
    const ItemRepo = require('./routes/ItemRepo');
    app.use('/', ItemRepo); 

    const component = require('./routes/component');
    app.use('/', component); 

    const project = require('./routes/project.js');
    app.use('/', project); 

    const users = require('./routes/users.js');
    app.use('/', users); 
 

   // Function to get the number of all projects in the database
   async function GetAll(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const myData = [];
        const result = await  connection.execute('SELECT COUNT(Id) AS NumberOfProjects FROM project ')
        const result1 = await connection.execute('SELECT COUNT(Id) AS NumberOfComponents FROM componenttemplate ')
        const result2 = await connection.execute('SELECT COUNT(Item_Id) AS NumberOfItems FROM itemtemplate ')
        const result3 = await connection.execute('SELECT COUNT(Id) AS NumberOfUsers FROM user ')
        console.log("selected already")
         myData.push(result[0]);
         myData.push(result1[0]);
         myData.push(result2[0]);
         myData.push(result3[0]);
         data= myData
         return data
    }catch (err) {        
        console.log(err)
        return err
        } 
    
    }

// Function to get all category
async function GetCategories(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await connection.execute('SELECT category FROM category')
        console.log("gotten succesfullly")
        console.log(result[0])
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}



//..................................................//

// End point to get the number of all items, all componenets, all projects, all users
app.get('/categories',   (req, res) =>{
        
    GetCategories()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully");
          const result = data;
          res.status(200)
           res.json({
               success:true,
               result
           })
         
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"item not gotten"
           })
       }
   });

    });


 
    
// End point to get the number of all items, all componenets, all projects, all users
 app.get('/all',   (req, res) =>{
        
    GetAll()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully");
          return res.json(data);
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"item not gotten"
           })
       }
   });

    });


  








    // defining the port
const PORT = process.env.PORT || 5000; 

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });