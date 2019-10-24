const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procost'
  })

  router.get('/profile', passport.authenticate('jwt', { session: false}),  (req, res) =>{
    console.log(req.user[0])
    console.log(JSON.stringify(req.user[0]));
    return res.json(
       req.user[0]
    );
});
// to add component to repo
router.post('/component', passport.authenticate('jwt', { session: false}),  (req, res) =>{
  //console.log(req.user)
     console.log(JSON.stringify(req.user));

if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
     ComponentDescription= req.body.ComponentDescription;
     ComponentName= req.body.ComponentName;
     NoOfItems = req.body.NoOfItems
     Item = req.body.Item;

mysqlConnection.query("insert into componenttemplate ( ComponentName, ComponentDescription,NoOfItems ) values ('"+ComponentName+"','"+ComponentDescription+"', '"+NoOfItems+"')",function(err,results,fields){
        if (!err){
      console.log("Succesfully inserted " );
   // res.status(201).send('success');
       const  component_Id = results.insertId;
       const itemLength =  Item.length;
       console.log(component_Id);
     for(j=0; j < itemLength; j++){
      Item_Id = Item[j].Item_Id;
      ItemName =Item[j].ItemName;
      ItemDescription= Item[j].ItemDescription;
      Image = Item[j].Image;
      PrefferedPrice = Item[j].PrefferedPrice;
      DealersAddress = Item[j].DealersAddress;
      DealerPhone =  Item[j].DealerPhone;
      City = Item[j].City;
      SellerWeblink = Item[j].SellerWeblink;
      date = Item[j].date;
      mysqlConnection.query("insert into componentitemtemplate ( Item_Id, ItemName, ItemDescription,Image, PrefferedPrice, DealersAddress, DealerPhone, City, SellerWeblink, date, component_Id) values ('"+Item_Id+"','"+ItemName+"', '"+ItemDescription+"', '"+Image+"', '"+PrefferedPrice+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+City+"', '"+SellerWeblink+"', '"+date+"', '"+component_Id+"')", function(err,results,fields){
    
        if (!err){
          console.log("Succesfully inserted " );
        
            }
        else
    
       // return res.status(400).send('unsucess');
        console.log(err);
        });
         }
         res.status(201).send('success');
        }
    else

    return res.status(400).send('unsucess');
    console.log(err);
    });
   


} else{
  console.log("you do not have permission to perform this operation");
     
     }
});
// to get all component from repo
router.get('/components',  passport.authenticate('jwt', { session: false}), (req, res) =>{
  //console.log(req.user) 
 console.log(JSON.stringify(req.user));

 if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 2){
 name = req.query.ComponentName;

if(!name){
  mysqlConnection.query('SELECT * FROM componenttemplate ', function(err,results,fields){
      
      if (!err){
        console.log(results);
          res.status(201)
                 return res.json(results);
          }
      else{
        console.log(err);
      }
      
      });
} else{
  mysqlConnection.query('SELECT * FROM componenttemplate where ComponentName = ? ',[name],function(err,results,fields){
      
      if (!err){
        console.log(results);
          res.status(201)
         return res.json(results);
          }
      else {
        console.log(err);
      }
      
      });
}
           
                              
 } else{
    console.log("you do not have permission to perform this operation")
       }

});
router.get('/component/:component_Id', passport.authenticate('jwt', { session: false}),  (req, res) =>{
  //console.log(req.user)
  
 console.log(JSON.stringify(req.user)); 
if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
  mysqlConnection.query('SELECT * FROM componentitemtemplate WHERE  component_Id =?',[req.params.component_Id], function(err, results, response){
      if (!err){
      res.status(201)
     console.log(results)
        return res.json(
     results
   );
            }
      else{
        console.log(err);
      }
     
      });  
    
                              
} else{
  console.log("you do not have permission to perform this operation")
     }

});


            
  
module.exports = router; 