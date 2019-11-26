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

// Function to create a component




// to add component to repo
router.post('/component',   (req, res) =>{
  //console.log(req.user)
    // console.log(JSON.stringify(req.user));

// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
     ComponentDescription= req.body.ComponentDescription;
     ComponentName= req.body.ComponentName;
     NoOfItems = req.body.NoOfItems
     Item = req.body.Item;
     if(ComponentName ){
mysqlConnection.query("insert into componenttemplate ( ComponentName, ComponentDescription,NoOfItems ) values ('"+ComponentName+"','"+ComponentDescription+"', '"+NoOfItems+"')",function(err,results,fields){
        if (!err){
      console.log("Succesfully inserted " );
   // res.status(201).send('success');
       const  component_Id = results.insertId;
       const itemLength =  Item.length;
       console.log(results);
       mysqlConnection.query('SELECT * FROM componenttemplate WHERE  Id =?',[component_Id ], function(err,results,fields){
      
        if (!err){
          console.log(results);
          console.log("ffff");
         //   res.status(201)
                //   return res.json(results);
              const  ComponentName = results[0].ComponentName;
                console.log(ComponentName);
            }
        else{
          console.log(err);
        }
        
        });
      // console.log(fields);
       var TotalPrice = 0;
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
      Quantity =Item[j].Quantity;
      TotalPrice = TotalPrice + parseInt(Item[j].PrefferedPrice) * parseInt(Item[j].Quantity);
      mysqlConnection.query("insert into componentitemtemplate ( Item_Id, ItemName, ItemDescription,Image, PrefferedPrice, DealersAddress, DealerPhone, City, SellerWeblink, date, component_Id, ComponentName, Quantity) values ('"+Item_Id+"','"+ItemName+"', '"+ItemDescription+"', '"+Image+"', '"+PrefferedPrice+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+City+"', '"+SellerWeblink+"', '"+date+"', '"+component_Id+"', '"+ComponentName+"',  '"+Quantity+"')", function(err,results,fields){

        if (!err){
          console.log("Succesfully inserted " );
        
            }
        else
    
       // return res.status(400).send('unsucess');
        console.log(err);
        });
         }
         mysqlConnection.query("UPDATE componenttemplate SET TotalCost ='"+TotalPrice+"' WHERE Id=?",[component_Id], function(err,results,fields){

          if (!err){
            console.log( TotalPrice );
            res.status(201).send('success');
              }
          else
      {
        // return res.status(400).send('unsucess');
          console.log(err);
      }
         
          });
         
       
        }
    else

    return res.status(400).send('unsucess');
    console.log(err);
    });
   
  }

// } else{
//   console.log("you do not have permission to perform this operation");
     
//      }
});
// to get all component from repo
router.get('/components',   (req, res) =>{
  //console.log(req.user) 
 console.log(JSON.stringify(req.user));

//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 2){
 name = req.query.ComponentName;
console.log("ddd")
if(!name){
  mysqlConnection.query('SELECT * FROM componenttemplate ', function(err,results,fields){
      
      if (!err){
       // console.log(results);
        console.log("ffff");
          res.status(201)
                 return res.json(results);
          }
      else{
        console.log(err);
      }
      
      });
} else{     
  mysqlConnection.query('SELECT * FROM componenttemplate where ComponentName like ? ',["%"+ name +"%"],function(err,results,fields){
      
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
           
                              
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});
// to get the all items in a componenets 
router.get('/component/items/:component_Id', passport.authenticate('jwt', { session: false}),   (req, res) =>{
  //console.log(req.user)
  
 console.log(JSON.stringify(req.user)); 
// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
   mysqlConnection.query('SELECT * FROM componentitemtemplate WHERE  component_Id =?',[req.params.component_Id], function(err, results, response){
      if (!err){
      res.status(201)
    // console.log(results)
        return res.json(
     results
   );
            }
      else{
        console.log(err);
      }
     
      }); 
    
                              
// } else{
//   console.log("you do not have permission to perform this operation")
//      }

});

// to get an item from a component based on its id
router.get('/component/item/:component_Id',    (req, res) =>{
  //console.log(req.user)
  
 console.log(JSON.stringify(req.user)); 
// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
  mysqlConnection.query('SELECT * FROM componentitemtemplate WHERE  Id =?',[req.params.component_Id], function(err, results, response){
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
    
                              
// } else{
//   console.log("you do not have permission to perform this operation")
//      }

});

// End point to remove item from component
router.delete('/components/item/:Id',   (req, res) =>{
mysqlConnection.query('DELETE FROM componentitemtemplat WHERE Id =?',[Id], function(err,results,fields){    
  if (!err){
    console.log(results);
    console.log("ffff");
      res.status(201)
             return res.json(results);
      }
  else{
    console.log(err);
  }
  
  });
});
// to add new item to a component
router.put('/component/items/:component_Id', (req, res) =>{
   //console.log(req.user)
   //console.log(JSON.stringify(req.user));

   // if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
        ComponentDescription= req.body.ComponentDescription;
        ComponentName= req.body.ComponentName;
        NoOfItems = req.body.NoOfItems
        Item = req.body.Item;
        const itemLength =  Item.length;
        component_Id = req.params.component_Id;
       
   mysqlConnection.query("UPDATE componenttemplate SET ComponentDescription='"+ComponentDescription+"', ComponentName='"+ComponentName+"', NoOfItems ='"+NoOfItems+"' WHERE Id=?",[component_Id],function(err,results,fields){
           if (!err){
         console.log("Succesfully inserted " );
      // res.status(201).send('success');
          //console.log(component_Id);
          var TotalPrice = 0;
        for(j=0; j < itemLength; j++){
         Item_Id = Item[j].Item_Id;
         Id = Item[j].Id;
         ItemName =Item[j].ItemName;
         ItemDescription= Item[j].ItemDescription;
         Image = Item[j].Image;
         PrefferedPrice = Item[j].PrefferedPrice;
         DealersAddress = Item[j].DealersAddress;
         DealerPhone =  Item[j].DealerPhone;
         City = Item[j].City;
         SellerWeblink = Item[j].SellerWeblink;
         date = Item[j].date;
         Quantity =Item[j].Quantity;
        TotalPrice = TotalPrice + parseInt(Item[j].PrefferedPrice) * parseInt(Item[j].Quantity);

         mysqlConnection.query('SELECT * FROM componentitemtemplate WHERE  Id =?',[Id], function(err, results, response){
          if (!err){
            const len = results.length;
       if( len > 0) {  
        console.log("ori e " );
         console.log(results.length)
       
       } 
        else{
          console.log("imu e " );
         console.log(results.length)
          mysqlConnection.query("insert into componentitemtemplate ( Item_Id, ItemName, ItemDescription,Image, PrefferedPrice, DealersAddress, DealerPhone, City, SellerWeblink, date, component_Id, ComponentName, Quantity) values ('"+Item_Id+"','"+ItemName+"', '"+ItemDescription+"', '"+Image+"', '"+PrefferedPrice+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+City+"', '"+SellerWeblink+"', '"+date+"', '"+component_Id+"', '"+ComponentName+"',  '"+Quantity+"')", function(err,results,fields){

            if (!err){
              console.log("Succesfully inserted " );
            
                }
            else
        
           // return res.status(400).send('unsucess');
            console.log(err);
            });


        }
       
                }
          else{
            console.log(err);
          }
         
          });

            }
   mysqlConnection.query("UPDATE componenttemplate SET TotalCost ='"+TotalPrice+"' WHERE Id=?",[component_Id], function(err,results,fields){

              if (!err){
               console.log( TotalPrice );
                res.status(201).send('success');
                  }
              else
          {
            // return res.status(400).send('unsucess');
              console.log(err);
          }
             
              });
            
           }
       else
   
       return res.status(400).send('unsucess');
       console.log(err);
       });
      
   
   
   // } else{
   //   console.log("you do not have permission to perform this operation");
        
   //      }
  
});





// to get the details of a componenet
router.get('/component/:component_Id',    (req, res) =>{
  //console.log(req.user)
  
 console.log(JSON.stringify(req.user)); 
// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
  mysqlConnection.query('SELECT * FROM componenttemplate WHERE  Id =?',[req.params.component_Id], function(err, results, response){
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
    
                              
// } else{
//   console.log("you do not have permission to perform this operation")
//      }

});


            
  
module.exports = router; 