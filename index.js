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
    database: 'procost'
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
 




// To Register a New User
         app.post('/user', (req,res)=>{
                FirstName= req.body.FirstName;
                LastName= req.body.LastName;
                MiddleName= req.body.MiddleName;
                Password= req.body.Password;
                Email= req.body.Email;
                Role= req.body.Role;
                PhoneNumber= req.body.PhoneNumber;
                Address = req.body.Address;
                if (FirstName && LastName && MiddleName && Password && Email && Role && PhoneNumber && Address){
                bcrypt.genSalt(10, (err,salt)=> {
                bcrypt.hash(Password, salt, (err,hash) => {
                if (err) throw err;
                Password=hash;
                console.log("password hashed" + Password)
    
//To check if email already eixts
            mysqlConnection.query('SELECT * from credential WHERE Email =?', [Email], function(error,results,fields){
            if (results.length > 0){
            res.status(400)
            res.json({
            success:false,
            message:"User already exists"
            });
         res.end()
    }else {
     roleId =  mysqlConnection.query('SELECT Role_Id FROM role WHERE Role =?', [Role], function(error,results,fields){
        if (!error){
           roleId=results[0].Role_Id;

           mysqlConnection.query("insert into user (FirstName, LastName,  MiddleName, Email, PhoneNumber, Address, Role_Id) values ('"+FirstName+"','"+LastName+"', '"+MiddleName+"','"+Email+"','"+PhoneNumber+"', '"+Address+"','"+roleId+"')", (err)=>{
            console.log(FirstName);
            if (!err){
            res.status(201);
                 }
            else
            console.log(err);
              });

            
    mysqlConnection.query("insert into credential (Email, Password, Role_Id) values ('"+Email+"','"+Password+"','"+roleId+"')", (err)=>{
        console.log("db pass" + Password);
        if (!err){
        res.status(201)
        res.send("user created")
        res.end()
        
        }
        else
        console.log(err);
        });
         
        }
    });
   

    }
    });
    });
    });
    }
    });

// To login
app.post('/login', (req,res)=>{
    const Email= req.body.Email;
    const Password = req.body.Password;
    if(Email && Password){
    mysqlConnection.query('SELECT * from credential Where  Email=?', [ Email], function(error,results,fields){
    if (results.length >0){
    let db_Password = mysqlConnection.query('SELECT Password from credential WHERE Email=?', [Email], function(error,results,row){
    if (results.length > 0){
    console.log(results[0].Password);
    db_Password=results[0].Password;
    //res.status(200)
    comparepassword(Password, db_Password, (err, isMatch) =>{
    if (err) throw err;
    console.log(isMatch)
    if (isMatch) {
        res.status(200)
    // get data of the user
    let result= mysqlConnection.query('Select * from credential Where Email=?', [Email], function(error,results,fields){
    if (results.length > 0){
    console.log(JSON.stringify(results[0].Role_Id));
     const role = results[0].Role_Id;
      // console.log(results[0].Role_Id)         
    let user_data = results;
    
    //json token
    const token = jwt.sign({ data:user_data },
    secret, 
    { expiresIn: 604800 //one week in miliseconds
    });
    return res.json({
    role,
    success:true,
    token:"JWT " + token
    });
    
    }
    })
    
    }
   
    else{
        res.status(401)
    return res.json({
    success: false,
    message: "Wrong Username or Password"
    })
    }
    })
    }
    });
    }else{
    res.status(401)
    res.json({
    success:false,
    message:"Incorrect login details"
    })
    }
    })
    }else{
    res.status(401)
    res.json({
    success:false,
    message:"Enter the correct details"
    })
    }
    
    //bcrypt function
    function comparepassword(password, hash, callback){
    console.log('confirmed ' + password)
    console.log('confirmed' + hash)
    bcrypt.compare(password, hash, (err, isMatch)=>{
    if (err) throw err
    callback(null, isMatch)
    })
    }
    })
    





    // defining the port
const PORT = process.env.PORT || 5000; 

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });