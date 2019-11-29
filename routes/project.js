const express= require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'procostorig'
  })

// end point to create A NEW PROJECT
  router.post('/project',   (req, res) =>{
    //console.log(req.user)
  //      console.log(JSON.stringify(req.user));
  // if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
       ProjectName = req.body.ProjectName;
       console.log( ProjectName);
       ProjectDescription = req.body.ProjectDescription;
      // ProjectCost = req.body.ProjectCost;
       NoOfComponent = req.body.NoOfComponent;
        Component = req.body.Component;
        Item =  req.body.Item;
        console.log( Item.Item_Id);
  mysqlConnection.query("insert into project (ProjectName, ProjectDescription, NoOfComponent ) values ('"+ProjectName+"','"+ProjectDescription+"','"+NoOfComponent+"')",function(err,results,fields){
          if (!err){
        const  Project_Id = results.insertId;
      //  console.log(Project_Id );
        const compLength =  Component.length;
        const itemLength =  Item.length;
      //  console.log(itemLength);
        var ProjectCost = 0
         for (let j= 0; j < compLength; j++){
            ParentComponentId = Component[j].Id;
            ComponentDescription = Component[j].ComponentDescription;
            ComponentName=  Component[j].ComponentName;
            DateCreated=  Component[j].DateCreated;
            NoOfItems = Component[j].NoOfItems;
            price = Component[j].TotalCost;
            Quantity = Component[j].Quantity;
            TotalPrice = Component[j].TotalCost; 
            ProjectCost =  ProjectCost + parseInt(Component[j].TotalCost) * parseInt( Component[j].Quantity);
         const  cid=[]
 mysqlConnection.query("insert into projectcomponent ( ComponentName, ComponentDescription,NoOfItems,Quantity,TotalPrice ,ParentComponentId, Project_Id) values ('"+ComponentName+"','"+ComponentDescription+"', '"+NoOfItems+"','"+Quantity+"','"+TotalPrice+"','"+ParentComponentId+"','"+Project_Id+"')",function(err,results,fields){
                if (!err){
              console.log("Succesfully inserted2" );
            //  const  component1_Id = results.insertId;
            //  cid.push(component1_Id);

                }
            else {       
          console.log(err);
          console.log("hhh");
        }
            
            });      

         } 
         for(let i= 0; i < itemLength; i++){
          Item_Id = Item[i].Item_Id;
          ItemName =Item[i].ItemName;
          ItemDescription= Item[i].ItemDescription;
          Image = Item[i].Image;
          PrefferedPrice = Item[i].PrefferedPrice;
          DealersAddress = Item[i].DealersAddress;
          DealerPhone =  Item[i].DealerPhone;
          City = Item[i].City;
          SellerWeblink = Item[i].SellerWeblink;
          date = Item[i].date;
          ParentComponent_Id = Item[i].component_Id;
          Quantity = Item[i].Quantity;

mysqlConnection.query('SELECT * FROM itemcategory WHERE  Item_Id =?',[Item_Id], function(err, results, response){
            if (!err){
            console.log("come up");
           console.log(results.length)
           console.log(results)
           for(j=0; j < results.length; j++){

 mysqlConnection.query("insert into projectitemcategory ( Item_Id, Category_Id, Category_Name, Project_Id, Component_Id) values ('"+results[j].Item_Id+"','"+results[j].Category_Id+"', '"+results[j].Category_Name+"', '"+Project_Id+"','"+ParentComponent_Id+"')", function(err,results,fields){

              if (!err){
                console.log("Succesfully inserted " );
              
                  }
              else
          {
             // return res.status(400).send('unsucess');
             console.log(err);
          }
            
              });

           }
          
                  }
            else{
              console.log(err);
            }
           
            });  
         
          
         // component_Id = component1_Id
    mysqlConnection.query("insert into projectitem ( Item_Id, ItemName, ItemDescription,Image, PrefferedPrice, DealersAddress, DealerPhone, City, SellerWeblink, date,  Project_Id,  ParentComponent_Id, Quantity) values ('"+Item_Id+"','"+ItemName+"', '"+ItemDescription+"', '"+Image+"', '"+PrefferedPrice+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+City+"', '"+SellerWeblink+"', '"+date+"', '"+Project_Id+"', '"+ParentComponent_Id+"', '"+Quantity+"')", function(err,results,fields){   
            if (!err){
     //    console.log("Succesfully inserted item" );
                }
            else{
              console.log(err);
            }
            
            });
             }  
             
         mysqlConnection.query("UPDATE project SET ProjectCost ='"+ProjectCost+"' WHERE Id=?",[Project_Id], function(err,results,fields){

          if (!err){
          //  console.log( TotalPrice );
            res.status(201).send('success');
              }
          else
      {
        // return res.status(400).send('unsucess');
          console.log(err);
      }
         
          });  
          
     
          }
      else{
    console.log(err);
    console.log("kkk");
    return res.status(400).send('unsucess');   
  }    
     });
     
  
  
  // } else{
  //   console.log("you do not have permission to perform this operation");
       
  //      }
  });
// end point to get all projects or to get a particular project using query parameter
  router.get('/projects',  (req, res) =>{
   console.log(JSON.stringify(req.user));

//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 2){
 name = req.query.ProjectName;
 name1 = req.query.Id;
console.log("ddd")
if(name){
  mysqlConnection.query('SELECT * FROM project where ProjectName like ? ',["%"+ name +"%"],function(err,results,fields){
      
    if (!err){
      console.log(results);
        res.status(201)
       return res.json(results);
        }
    else {
      console.log(err);
    }
    
    });
  
} else if(name1){     
  mysqlConnection.query('SELECT * FROM project WHERE  Id =?',[name1], function(err,results,fields){
      
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
 
}else{     
  mysqlConnection.query('SELECT * FROM project', function(err,results,fields){
      
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
 
}

           
                              
//  } else{
//     console.log("you do not have permission to perform this operation")
//        }

});
//  to get all components in a project
router.get('/project/components/:Project_Id', (req, res) =>{ 
 console.log(JSON.stringify(req.user)); 
// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
  mysqlConnection.query('SELECT * FROM projectcomponent WHERE Project_Id =?',[req.params.Project_Id], function(err, results, response){
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

  // to get the all items in the components of a project
router.get('/projectcomponent/projectitems/:component_Id/:project_Id', (req, res) =>{
  console.log(req.params.component_Id)
  console.log(req.params.project_Id)
 //console.log(JSON.stringify(req.user)); 
// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
  mysqlConnection.query('SELECT * FROM projectitem WHERE  ParentComponent_Id =? and Project_Id =?',[req.params.component_Id, req.params.project_Id ], function(err, results, response){
      if (!err){
      res.status(201)
     console.log(results)
     console.log("yeyeye")
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


//  to get a single components in a project
router.get('/project/component/:Id', (req, res) =>{ 
  console.log(JSON.stringify(req.user)); 
 // if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
   mysqlConnection.query('SELECT * FROM projectcomponent WHERE Id =?',[req.params.Id], function(err, results, response){
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

// to get all items from a component in a project
router.get('/project/components/items/:component_Id', (req, res) =>{ 
console.log(JSON.stringify(req.user)); 
// if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){  
 mysqlConnection.query('SELECT * FROM projectitem WHERE component_Id =?',[req.params.component_Id], function(err, results, response){
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



// end point to get all items in categories in a project
router.get('/project/category/items/:category/:Project_Id', (req, res) =>{ 
  console.log(JSON.stringify(req.user)); 
  var TotalPrice1 = 0;
  // if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){                    
            mysqlConnection.query('SELECT * from itemtemplate LEFT JOIN  projectitemcategory ON  itemtemplate.Item_Id = projectitemcategory.Item_Id WHERE  projectitemcategory.Category_Name =? and  projectitemcategory.Project_Id =? ',[req.params.category, req.params.Project_Id], function(err, results, response){
                if (!err){
                  console.log(TotalPrice1)
                  for(var i = 0; i < results.length; i++){
                    TotalPrice1 = TotalPrice1 + parseInt(results[i].PrefferedPrice)
                }
              console.log("boom")
              console.log(TotalPrice1)
              results.totalprice =  TotalPrice1;
              return res.status(201).json(
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