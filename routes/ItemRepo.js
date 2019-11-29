const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procostorig',
    multipleStatements: true
    
  })
  // end point to get all items in the item table
  async function GetItemsLength(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await  connection.execute('SELECT COUNT(Item_Id) AS NumberOfItems FROM itemtemplate ')
        console.log("selected already")
        console.log(result[0])     
         data= result[0]
         return data
    }catch (err) {        
        console.log(err)
        return err
        } 
    
    }

// Function to create item
  async function createItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await  connection.execute("insert into itemtemplate (ItemName, ItemDescription,  DealersAddress, DealerPhone,  PrefferedPrice, City, SellerWeblink, date, Image ) values ('"+ItemName+"','"+ItemDescription+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+PrefferedPrice+"', '"+City+"','"+SellerWeblink+"','"+date+"', '"+Image+"')")
       // console.log("item inserted with")
       // console.log(result[0].insertId)
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to create item
async function UpdateItem(status1){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await  connection.execute("UPDATE itemtemplate SET Category_Name='"+status1+"'  WHERE Item_Id=?",[Item_Id])
       // console.log("item inserted with")
       // console.log(result[0].insertId)
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}

// Function to add category
async function AddCategory( Item_Id, Category_Id, Category_Name){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await  connection.execute("insert into itemcategory (Item_Id, Category_Id, Category_Name) values ('"+Item_Id+"','"+Category_Id+"', '"+Category_Name+"')")
      //  console.log("item inserted with")
      //  console.log(result[0].insertId)
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 

}
// Function to get the category Id
async function GetCategory(category){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{
        
     const result = await connection.execute('SELECT * FROM category WHERE category =?',[category])
      //  console.log("gotten succesfullly")
      console.log("kig");  
    //  console.log(category);
     // console.log( result[0][0].category)
        data= result
        return data
       
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get the category Id
async function CreateCategory(category){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{  
      console.log(category);
     const result = await connection.execute("insert into category (category) values ('"+category+"')")
        //console.log("inserted  succesfullly 12")
       // console.log(result[0].insertId)
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
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await   connection.execute("insert into pricetemplate (City,SellerWeblink, DealersAddress, DealerPhone, Price, Item_Id, DealersName) values ('"+City+"','"+ SellerWeblink+"','"+DealersAddress+"', '"+DealerPhone+"','"+PrefferedPrice+"','"+Item_Id+"', '"+DealersName+"')")
      //  console.log("item inserted with")
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
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await   connection.execute("insert into pricetemplate (City,SellerWeblink, DealersAddress, DealerPhone, Price, Item_Id, DealersName) values ('"+City+"','"+ SellerWeblink+"','"+DealersAddress+"', '"+DealerPhone+"','"+Price+"','"+Item_Id+"', '"+DealersName+"')")
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
async function GetItemsMobile(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await connection.execute('SELECT * FROM itemtemplate')
         
      //  console.log(result[0])
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get all items
async function GetItems(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await connection.execute('SELECT * FROM itemtemplate LIMIT 10 OFFSET ? ',[offset])
         
      //  console.log(result[0])
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to get a single item based on query parameter of name
async function GetItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
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
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
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
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await connection.execute('SELECT * FROM itemtemplate WHERE  Item_Id =?',[Item_Id])
        console.log("gotten succesfullly sat 2")
       // console.log(result)
        data= result[0]
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}
// Function to edit an Item
async function EditItem(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await connection.execute("UPDATE pricetemplate SET City='"+City+"', SellerWeblink='"+SellerWeblink+"', DealersAddress ='"+DealersAddress+"',DealerPhone= '"+DealerPhone+"', Price='"+Price+"', DealersName='"+DealersName+"' WHERE Id=?",[Id])
        console.log("updated succesfully")
        console.log(result[0].insertId)
        data= result
        return data
    }catch (err) {
          
        console.log(err)
        return err
        } 
    
}


// Function to make a price preffered price
async function ChoosePreffered(){
    const mysql2= require('mysql2/promise');
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
    try{ 
        const result = await connection.execute("UPDATE itemtemplate SET City='"+City+"', SellerWeblink='"+SellerWeblink+"', DealersAddress ='"+DealersAddress+"',DealerPhone= '"+DealerPhone+"', PrefferedPrice='"+Price+"', DealersName='"+DealersName+"' WHERE Item_Id=?",[Id])
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
    const connection = await mysql2.createConnection({host:'localhost', user: 'root', database: 'procostorig'});
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
// End point to change status of item
router.put('/item/status/:Id',   (req, res)=>{
    // City = req.body.City;
    // SellerWeblink = req.body.SellerWeblink;
    // DealersAddress =req.body.DealersAddress;
    // DealerPhone = req.body.DealerPhone;
    // Price = req.body.Price;
   // DealersName = req.body.DealersName;
    Item_Id= req.params.Id

    GetItemP()
    .then(data => {
       if (data.length > 0){
        console.log("I AM SUMBO");
          console.log(data[0].Status);
         
          
         // return res.json(data[0]);

         const  status1 = !(data[0].Status);
         console.log(status1);
         if ( status1 == true ){
             status2 = 1;
         }else{
            status2 = 0;
         }
         console.log(status2);
         console.log("I AM SUMBO");
          UpdateItem(status2)
          .then(data => {
             if (data[0].insertId == 0){
                //console.log("Updated successfully");
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

       }else{
           res.status(400)
           res.json({
               success:false,
               message:"item not gotten"
           })
       }
   });
});  

// End point to add a new item
router.post('/item',  passport.authenticate('jwt', { session: false}),  (req, res) =>{
    //console.log(req.user)
   //console.log(JSON.stringify(req.user)); 
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
           ItemName= req.body.ItemName;
           ItemDescription= req.body.ItemDescription;
           DealersAddress= req.body.DealersAddress; 
           DealerPhone= req.body.DealerPhone;    
           City= req.body.City;
           SellerWeblink= req.body.SellerWeblink;
           date = req.body.date;
           DealersName = req.body.DealersName
           category = JSON.parse(req.body.category);
         
           random = Math.random().toString(36).slice(-8);
           const zero = 0;
        if (req.body.PrefferedPrice){
           
            PrefferedPrice= req.body.PrefferedPrice;
        }
        else{
            PrefferedPrice = parseInt(zero);

        }
           //console.log(category)
          // console.log(req.body)


           if (!req.files){
           Image = ""
           }
            else{
                file = req.files.Image;
                Image = random+req.files.Image.name;
                file.mv('public/images/uploaded_images/'+Image);
            }
           

          
        //          }
        //  else{
          
      // if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
             
      //  }
             if(ItemName){
                   
                        createItem()
                        .then(data => {
                            if (data.insertId){
                            const  Item_Id = data.insertId;
                             AddPrice(Item_Id)
                            .then(data => {
                        if (data.insertId){
                           console.log("price added succesfully");
                        }else{
                            res.status(400)
                            res.json({
                                success:false,
                                message:"Price not Added"
                            })
                        }
                    }); 
                    for(j=0; j < category.length; j++){
                        const cat = category[j];
                        //console.log(category[j]);
                        GetCategory(category[j])
                        .then(data => {
                    if (data[0].length > 0){
                      console.log(data[0][0]);
                     const Category_Id = data[0][0].Category_Id;
                     const Category_Name = data[0][0].category;
                       console.log("inserted succesfully10");
                       console.log(Category_Id);
                    //   console.log(data[0].length)
                       console.log(Category_Name);
                       
                       AddCategory(Item_Id, Category_Id, Category_Name)
                       .then(data => {
                   if (data.insertId){
                      console.log("inserted succesfully2");
                    //  console.log(Item_Id);
                    //  console.log(Category_Id);
                   
                   }else{
                    console.log(" not inserted succesfully1");
                   }
               });

                    } else{
                        //console.log(category[j]);
                        CreateCategory(cat)
                       .then(data => {
                     if(data.insertId){
                        console.log("inserted succesfully40");
                        console.log(cat);
                      const  CategoryId = data.insertId;
                      console.log("inserted succesfully20");
                      console.log(CategoryId);
                        AddCategory(Item_Id, CategoryId ,cat)
                       .then(data => {
                   if (data.insertId){
                      console.log("inserted succesfully30");
                      console.log(CategoryId);
                   }else{
                    console.log(" not inserted succesfully1");
                   }
               });


                   }
                   
                   else{
                    console.log(" not inserted succesfully1");
                   }
               });



                        console.log(" not inserted succesfully2");
                    }
                });
                        }
                    




                                console.log(Item_Id);
                                res.json({
                                    success:true,
                                    message:"Item created",
                                    Item_Id
                                    
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
        DealersName = req.body.DealersName;
        Item_Id2= req.body.Item_Id;
        Item_Id = req.params.Item_Id;
        console.log(Item_Id)
        if( Price ){
       
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
      }else{
          
          console.log("Cant send empty input")
       }
   
    

});
// End point to view all item or get a simgle item based on query
router.get('/webitems', (req, res) =>{
   
    name = req.query.ItemName;
    offset= req.query.OffSet;
    console.log("mogbe")
     console.log(offset)
    if(!offset){
       offset = 0;
    }
    
   console.log(JSON.stringify(req.user));
   console.log("shina")
 
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){

if(!name){
    GetItems()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully sumbo");
          console.log(data[0].length);

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
                                
//  } else{z
//     console.log("you do not have permission to perform this operation")
//        }

});
// End point to view all item or get a simgle item based on query
router.get('/items', (req, res) =>{
   
    name = req.query.ItemName;
    offset= req.query.OffSet;
    console.log("mogbe")
     console.log(offset)
    if(!offset){
       offset = 0;
    }
    
   console.log(JSON.stringify(req.user));
   console.log("shina")
 
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){

if(!name){
    GetItemsMobile()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully sumbo");
          console.log(data[0].length);

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
                                
//  } else{z
//     console.log("you do not have permission to perform this operation")
//        }

});
// End point to get a single item with details
router.get('/items/:Item_Id',   (req, res) =>{
    //console.log(req.user)
    Item_Id = req.params.Item_Id
   console.log(JSON.stringify(req.user)); 
//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
    GetItemP()
    .then(data => {
       if (data.length>0){
          console.log("gotten succesfully sat");
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
router.put('/chooseprefferedprice/:Item_Id',  (req, res)=>{
    City = req.body.City;
    SellerWeblink = req.body.SellerWeblink;
    DealersAddress =req.body.DealersAddress;
    DealerPhone = req.body.DealerPhone;
    Price = req.body.Price;
    DealersName = req.body.DealersName;
   console.log(DealersName)
    Id= req.params.Item_Id;

                   ChoosePreffered()
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

// End point to edit a price of an item
router.put('/price/:Id',  (req, res)=>{
    City = req.body.City;
    SellerWeblink = req.body.SellerWeblink;
    DealersAddress =req.body.DealersAddress;
    DealerPhone = req.body.DealerPhone;
    Price = req.body.Price;
    DealersName = req.body.DealersName;
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

router.get('/lengthitems',   (req, res) =>{       
    GetItemsLength()
    .then(data => {
       if (data.length>0){
          console.log("gotten itemlength");
          return res.json(data);
       }else{
           res.status(400)
           res.json({
               success:false,
               message:"itemlength not gotten"
           })
       }
   });

    });
    

module.exports = router; 