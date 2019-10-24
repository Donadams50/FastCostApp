const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procost',
    multipleStatements: true
  })

// to add an item
router.post('/item',  (req, res) =>{
    //console.log(req.user)
   console.log(JSON.stringify(req.user));
  
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
           ItemName= req.body.ItemName;
           ItemDescription= req.body.ItemDescription;
           DealersAddress= req.body.DealersAddress; 
           DealerPhone= req.body.DealerPhone;
           PrefferedPrice= req.body.PrefferedPrice; 
           City= req.body.City;
           SellerWeblink= req.body.SellerWeblink;
           date = req.body.date;
        //    if (!req.files) {
        //     console.log('jjjjjj');
        //     return res.status(400).send('No files were uploaded.');
          
        //          }
        //  else{
          const file = req.files.Image;
           const  Image = file.name;
           
           console.log(Image);
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                       console.log(ItemName);
                       console.log(ItemDescription);
                       console.log(DealersAddress);
                       console.log(DealerPhone);
                       console.log(PrefferedPrice);
                       console.log(City);
                       console.log(date);
             if(ItemName && ItemDescription && DealersAddress && DealerPhone && PrefferedPrice && City  && date){
                    file.mv('public/images/uploaded_images/'+file.name, function(err) {
                           
                        if (err)
                          return res.status(500).send(err);
                        });
                    mysqlConnection.query("insert into itemtemplate (ItemName, ItemDescription,  DealersAddress, DealerPhone,  PrefferedPrice, City, SellerWeblink, date, Image ) values ('"+ItemName+"','"+ItemDescription+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+PrefferedPrice+"', '"+City+"','"+SellerWeblink+"','"+date+"', '"+Image+"')", (err)=>{
                            if (!err){
                                console.log("Succesfully inserted  " + ItemName);
                            res.status(201)
                                }
                            else{
                                console.log('not succesful');
                                console.log(err);
                                return res.status(400).send('this is sumbo');
                            
                            }
                            
                            });
                
                   } else{
                    console.log(" fill in the form");
                    res.status(401)
                   
                         }

                         
                   
       }
  //  }
        
//  } else{
//     console.log("you do not have permission to perform this operation");
       
//        }
  

})

// to add price to item
router.post('/price/:Item_Id', passport.authenticate('jwt', { session: false}),  (req, res) =>{
  
   console.log(JSON.stringify(req.user));
   
       if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 2){
        City= req.body.City;
        SellerWeblink= req.body.SellerWeblink;
        DealersAddress= req.body.DealersAddress; 
        DealerPhone= req.body.DealerPhone;
        Price= req.body.Price;
        //if( City &&  SellerWeblink && DealersAddress &&  DealerPhone &&  Price ){
        mysqlConnection.query("insert into pricetemplate (City,SellerWeblink, DealersAddress, DealerPhone, Price) values ('"+City+"','"+ SellerWeblink+"','"+DealersAddress+"', '"+DealerPhone+"','"+Price+"')", (err)=>{
         
            if (!err){
                console.log("new price added of " + Price);
            res.status(201)  
                  }
                    else
                    console.log(err);
                    });
            
       }else{
          
          console.log("you do not have permission to perform this operation")
       }
    return res.json(
       req.user[0].Role_Id
    );

})
//to view all item
router.get('/items',   (req, res) =>{
    //console.log(req.user)
    name = req.query.ItemName;
   console.log(JSON.stringify(req.user));
  
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
//    mysqlConnection.query('SELECT MIN(Price) AS SmallestPrice FROM pricetemplate',  function(err,results,fields){
//     console.log("yes");
//                 if (!err){
//                 res.status(201)
//                 console.log(results);
//                 return res.json(results);
//                     }
//                 else
//                 console.log(err);   
//     });
if(!name){
    mysqlConnection.query('SELECT * FROM itemtemplate ', function(err,results,fields){
        console.log("yes");
        if (!err){
           
            res.status(201)
           console.log(results);
            console.log(results[0].Image);
            console.log(results[1].Image);
            console.log(results[2].Image);
           return res.json(results);
            }
        else
        console.log(err);
        });
} else{
    mysqlConnection.query('SELECT * FROM itemtemplate where ItemName = ? ',[name],function(err,results,fields){
        console.log("yes");
        if (!err){
           
            res.status(201)
        //    console.log(results);
        //     console.log(results[0].Image);
        //     console.log(results[1].Image);
        //     console.log(results[2].Image);
           return res.json(results);
            }
        else
        console.log(err);
        });
}
             
                                
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});
//to get a single item with its details
router.get('/items/:Item_Id', passport.authenticate('jwt', { session: false}),  (req, res) =>{
    //console.log(req.user)
    
   console.log(JSON.stringify(req.user)); 
 if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
    mysqlConnection.query('SELECT * FROM pricetemplate WHERE  Item_Id =?',[req.params.Item_Id], function(err, results, response){
        if (!err){
        res.status(201)
       console.log(results)
        console.log(results[0].Image);
          return res.json(
       results
     );
 
     // results1    
        //http://localhost:5000/images/uploaded_images/waste22.jpg

              }
        else
        console.log(err);
        });  
      
                                
 } else{
    console.log("you do not have permission to perform this operation")
       }

});

// to edit a price of an item
router.put('/price/:Item_Id/:Id', passport.authenticate('jwt', { session: false}), (req, res)=>{
    mysqlConnection.query("UPDATE pricetemplate SET City='"+req.body.City+"', SellerWeblink='"+req.body.SellerWeblink+"', DealersAddress ='"+req.body.DealersAddress +"',DealerPhone= '"+req.body.DealerPhone+"', Price='"+req.body.Price+"' WHERE Id=?",[req.params.Id], (err, results, fields) =>{       
        if (!err){
            console.log(results);
            res.send('successful');
              }
      
        else
        res.send('unsuccessful');
            console.log(err);
    });
});  
// to delete a price of an item  
router.delete ('/price/:Item_Id/:Id',  passport.authenticate('jwt', { session: false}), (req, res) =>{
    mysqlConnection.query('DELETE FROM pricetemplate WHERE Id =?',[req.params.Id], (err, rows, fields) =>{
        if(!err)
        res.send('deleted succesful' );
        else
        res.send(err);
    })
    
});
    

module.exports = router; 