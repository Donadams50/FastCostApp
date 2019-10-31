const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const secret = "yoursecret";
module.exports = { secret };


var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procost'
  })



router.get('/profiless', passport.authenticate('jwt', { session: false}),  (req, res) =>{
    console.log(req.user)
    return res.json(
       req.user
    );
});

// End point to login
   router.post('/login', (req,res)=>{
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
    });

// End point  To Register a New User
    router.post('/user', (req,res)=>{
        FirstName= req.body.FirstName;
        LastName= req.body.LastName;
        Location= req.body.Location;
        Password= req.body.Password;
        Email= req.body.Email;
        Role= req.body.Role;
        PhoneNumber= req.body.PhoneNumber;
        Address = req.body.Address;
        random = Math.random().toString(36).slice(-8);
        file = req.files.Image;
        Image = random+req.files.Image.name;

        if (FirstName && LastName &&  Location && Password && Email && Role && PhoneNumber && Address){
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
  mysqlConnection.query('SELECT Role_Id FROM role WHERE Role =?', [Role], function(error,results,fields){
if (!error){
   roleId = results[0].Role_Id;
   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
    file.mv('public/images/users_images/'+Image, function(err) {
                           
        if (err)
          return res.status(500).send(err);
         });
   }
   mysqlConnection.query("insert into user (FirstName, LastName,  Location, Email, PhoneNumber, Address, Role_Id,  Role, Image) values ('"+FirstName+"','"+LastName+"', '"+Location+"','"+Email+"','"+PhoneNumber+"', '"+Address+"','"+roleId+"', '"+Role+"', '"+Image+"')", function(err,results,fields){
    console.log(FirstName);
    if (!err){
        userId = results.insertId;
        mysqlConnection.query("insert into credential (Email, Password, Role_Id, User_Id) values ('"+Email+"','"+Password+"','"+roleId+"','"+userId+"')", (err)=>{
            console.log("db pass" + Password);
            if (!err){
            res.status(201)
            res.send("user created")
            res.end()
            
            }
            else{
                console.log(err);
            }
            
            });
         }
    else{
        console.log(err);
    }
    
      });

      

 
}
});


}
});
});
});
}
});

//End point to get all users or a single user based  on the query parameter or to get all admin /scout/ project manager based on query parameter
router.get('/users',  (req, res) =>{   
   console.log(JSON.stringify(req.user)); 
   name = req.query.FirstName;
   name1 = req.query.Role
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
    if(name){
        mysqlConnection.query('SELECT * FROM user where FirstName like ? ',["%"+name+"%"],function(err,results,fields){
            if (!err){
            res.status(201)
           console.log(results)
              return res.json(results);
                  }
            else{
                console.log(err);
            }
            
            }); 
    }
    else if(name1){
mysqlConnection.query('SELECT * FROM user WHERE Role =?',[name1], function(err, results, response){
            if (!err){
            res.status(201)
           console.log(results)
              return res.json(results);
                  }
            else{
                console.log(err);
            }
            
            }); 
    }
    else{
        mysqlConnection.query('SELECT * FROM user ', function(err, results, response){
            if (!err){
            res.status(201)
           console.log(results)
              return res.json(results);
                  }
            else{
                console.log(err);
            }
            
            }); 
    }
    
      
                                
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});
// End point to edit and update  a user
router.put('/user/:Id',  (req, res)=>{

    roleId =  mysqlConnection.query('SELECT Role_Id FROM role WHERE Role =?', [req.body.Role], function(error,results,fields){ 
        roleId = results[0].Role_Id;
    mysqlConnection.query("UPDATE user SET FirstName='"+req.body.FirstName+"', LastName='"+req.body.LastName+"', Location= '"+req.body.Location+"', Email= '"+req.body.Email+"', PhoneNumber='"+req.body.PhoneNumber+"', Address='"+req.body.Address+"', Role='"+req.body.Role+"', Role_Id='"+roleId+"' WHERE Id=?",[req.params.Id], (err, results, fields) =>{       
            if (!err){
                console.log("jjjj");
                
                mysqlConnection.query("UPDATE credential SET Email='"+req.body.Email+"', Role_Id='"+roleId+"' WHERE User_Id=?",[req.params.Id], (err, results, fields) =>{ 
                    if (!err){
                    res.status(201)
                    res.send("user updated succesfully")
                    res.end()
                    
                    }
                    else{
                        console.log(err);
                    }
                    
                    });
                  }
          
            else{
                res.send('unsuccessful');
                console.log(err);
            }
           
        });

        
    });
    
});  



module.exports = router; 