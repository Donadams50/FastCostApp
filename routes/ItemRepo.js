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
  


// Function to create item
  async function createItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await  connection.execute("insert into itemtemplate (ItemName, ItemDescription,  DealersAddress, DealerPhone,  PrefferedPrice, City, SellerWeblink, date, Image ) values ('"+ItemName+"','"+ItemDescription+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+PrefferedPrice+"', '"+City+"','"+SellerWeblink+"','"+date+"', '"+Image+"')")
        console.log("item inserted with")
        console.log(result[0].insertId)
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to add price on first create 
async function AddPrice(Item_Id){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await   connection.execute("insert into pricetemplate (City,SellerWeblink, DealersAddress, DealerPhone, Price, Item_Id) values ('"+City+"','"+ SellerWeblink+"','"+DealersAddress+"', '"+DealerPhone+"','"+PrefferedPrice+"','"+Item_Id+"')")
        console.log("item inserted with")
        console.log(result[0].insertId)
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to add price on already created item 
async function AddPrice2(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await   connection.execute("insert into pricetemplate (City,SellerWeblink, DealersAddress, DealerPhone, Price, Item_Id) values ('"+City+"','"+ SellerWeblink+"','"+DealersAddress+"', '"+DealerPhone+"','"+Price+"','"+Item_Id+"')")
        console.log("item inserted ")
        console.log(result[0].insertId)
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get all items
async function GetItems(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await connection.execute('SELECT * FROM itemtemplate ')
        console.log("item inserted with")
        console.log(result[0])
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get a single item based on query parameter
async function GetItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await connection.execute('SELECT * FROM itemtemplate where  ItemName like "%' +name+'%" ')
        console.log("gotten succesfullly")
        console.log(result[0])
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get all prices of a single item
async function GetPrices(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await connection.execute('SELECT * FROM pricetemplate WHERE  Item_Id =?',[Item_Id])
        console.log("gotten succesfullly")
        console.log(result[0])
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get a single item base on path parameter
async function GetItemP(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await connection.execute('SELECT * FROM itemtemplate WHERE  Item_Id =?',[Item_Id])
        console.log("gotten succesfullly")
        console.log(result[0])
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to edit an Item
async function EditItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await connection.execute("UPDATE pricetemplate SET City='"+City+"', SellerWeblink='"+SellerWeblink+"', DealersAddress ='"+DealersAddress+"',DealerPhone= '"+DealerPhone+"', Price='"+Price+"' WHERE Id=?",[Id])
        console.log("updated succesfully")
        console.log(result[0].insertId)
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to delete a price from an item
async function DeleteItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procost'});
    try{ 
        const result = await connection.execute('DELETE FROM pricetemplate WHERE Id =?',[Id])
        console.log("Deleted succesfully")
        console.log(result[0].insertId)
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}

//....................................................................................................//

// End point to add a new item
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
           random = Math.random().toString(36).slice(-8);
           file = req.files.Image;
           Image = random+req.files.Image.name;
          // let file = req.files.Image;
           //console.log(file.name);
          //let random = Math.random().toString(36).slice(-8);
          // let  Image = random+file.name;
          // let  Image = file.name;
           console.log(Image);
        //    if (!req.files) {
        //     console.log('jjjjjj');
        //     return res.status(400).send('No files were uploaded.');
          
        //          }
        //  else{
          
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
        
             if(ItemName && ItemDescription && DealersAddress && DealerPhone && PrefferedPrice && City  && date){
                    file.mv('public/images/uploaded_images/'+Image, function(err) {
                           
                        if (err)
                          return res.status(500).send(err);
                         });
                        createItem()
                        .then(data => {
                            if (data.insertId){
                            const  Item_Id = data.insertId;
                             AddPrice(Item_Id)
                            .then(data => {
                        if (data.insertId){
                           console.log("inserted succesfully");
                        }else{
                            res.status(400)
                            res.json({
                                success:false,
                                message:"Price not Added"
                            })
                        }
                    }); 
                                console.log(Item_Id);
                                res.json({
                                    success:true,
                                    message:"Item created"
                                })
                            }else{
                                res.status(400)
                                res.json({
                                    success:false,
                                    message:"Item  not created"
                                })
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
  

});

//End point  to add price to item
router.post('/price/:Item_Id',  (req, res) =>{
  
   console.log(JSON.stringify(req.user));
   
    //    if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 2){
        City= req.body.City;
        SellerWeblink= req.body.SellerWeblink;
        DealersAddress= req.body.DealersAddress; 
        DealerPhone= req.body.DealerPhone;
        Price= req.body.Price;
        Item_Id2= req.body.Item_Id;
        Item_Id = req.params.Item_Id;
        console.log(Item_Id)
        //if( City &&  SellerWeblink && DealersAddress &&  DealerPhone &&  Price ){
       
                   AddPrice2()
                     .then(data => {
                        if (data.insertId){
                           console.log("inserted succesfully");
                           res.json({
                            success:true,
                            message:"Item created"
                        })
                        }else{
                            res.status(400)
                            res.json({
                                success:false,
                                message:"Price not Added"
                            })
                        }
                    });
    //    }else{
          
    //       console.log("you do not have permission to perform this operation")
    //    }
   
    

});
// End point to view all item
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
    GetItems()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully");
          return res.json(data[0]);
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"item not gotten"
           })
       }
   });
} else{
     
    GetItem()
    .then(data => {
       if (data.length > 0){
          console.log("gotten succesfully");
          return res.json(data[0]);
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"item not gotten"
           })
       }
   });
}             
                                
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});
// End point to get a single item with details
router.get('/items/:Item_Id',  (req, res) =>{
    //console.log(req.user)
    Item_Id = req.params.Item_Id
   console.log(JSON.stringify(req.user)); 
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
    GetItemP()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully");
          return res.json(data[0]);
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"item not gotten"
           })
       }
   });
                                
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});
// End point to get all prices for a single item
router.get('/prices/:Item_Id',  (req, res) =>{    
   console.log(JSON.stringify(req.user)); 
   Item_Id= req.params.Item_Id
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
    GetPrices()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully");
          return res.json(data[0]);
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"price not gotten"
           })
       }
   }); 
      
                                
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});

// End point to edit a price of an item
router.put('/price/:Id',  (req, res)=>{
    City = req.body.City;
    SellerWeblink = req.body.SellerWeblink;
    DealersAddress =req.body.DealersAddress;
    DealerPhone = req.body.DealerPhone;
    Price = req.body.Price;
   // DealersName = req.body.DealersName;
    Id= req.params.Id

                     EditItem()
                     .then(data => {
                        if (data[0].insertId == 0){
                           console.log("Updated successfully");
                           res.json({
                            success:true,
                            message:"Updated successfully"
                        })
                        }else{
                            res.status(400)
                            res.json({
                                success:false,
                                message:"Not Updated"
                            })
                        }
                    });
});  
// End point to delete a price of an item  
router.delete ('/price/:Id',  (req, res) =>{
    Id = req.params.Id
                     DeleteItem()
                     .then(data => {
                        if (data[0].insertId == 0){
                           console.log("Deleted successfully");
                           res.json({
                            success:true,
                            message:"Deleted successfully"
                        })
                        }else{
                            res.status(400)
                            res.json({
                                success:false,
                                message:"Not Deleted"
                            })
                        }
                    });
    
});
    

module.exports = router; 