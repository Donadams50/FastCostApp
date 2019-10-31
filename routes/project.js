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

// end point to create A NEW PROJECT
  router.post('/project', passport.authenticate('jwt', { session: false}),  (req, res) =>{
    //console.log(req.user)
       console.log(JSON.stringify(req.user));
  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 10){
       ProjectName = req.body.ProjectName;
       console.log( ProjectName);
       ProjectDescription = req.body.ProjectDescription;
       ProjectCost = req.body.ProjectCost;
       NoOfComponent = req.body.NoOfComponent;
       Component = req.body.Component;
  
  mysqlConnection.query("insert into project (ProjectName, ProjectDescription,ProjectCost, NoOfComponent ) values ('"+ProjectName+"','"+ProjectDescription+"','"+ProjectCost+"','"+NoOfComponent+"')",function(err,results,fields){
          if (!err){
        console.log("Succesfully inserted " );
        const  Project_Id = results.insertId;
        console.log(Project_Id );
         for (let j= 0; j < Component.length; j++){
            ParentComponentId = Component[j].ParentComponentId;
            ComponentDescription = Component[j].ComponentDescription;
            ComponentName=  Component[j].ComponentName;
            DateCreated=  Component[j].DateCreated;
            NoOfItems = Component[j].NoOfItems;
            Quantity = Component[j].Quantity;
            TotalPrice = Component[j].TotalPrice;  

 mysqlConnection.query("insert into projectcomponent ( ComponentName, ComponentDescription,NoOfItems,Quantity,TotalPrice ,ParentComponentId, Project_Id) values ('"+ComponentName+"','"+ComponentDescription+"', '"+NoOfItems+"','"+Quantity+"','"+TotalPrice+"','"+ParentComponentId+"','"+Project_Id+"')",function(err,results,fields){
                if (!err){
              console.log("Succesfully inserted/" );
                 const Item =  Component[j].Item;
               const  component_Id = results.insertId;
               const itemLength =  Item.length;
               console.log(component_Id);
             for(i=0; i < itemLength; i++){
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
     mysqlConnection.query("insert into projectitem ( Item_Id, ItemName, ItemDescription,Image, PrefferedPrice, DealersAddress, DealerPhone, City, SellerWeblink, date, component_Id, Project_Id) values ('"+Item_Id+"','"+ItemName+"', '"+ItemDescription+"', '"+Image+"', '"+PrefferedPrice+"', '"+DealersAddress+"', '"+DealerPhone+"', '"+City+"', '"+SellerWeblink+"', '"+date+"', '"+component_Id+"', '"+Project_Id+"')", function(err,results,fields){   
                if (!err){
             console.log("Succesfully inserted " );
                    }
                else{
                  console.log(err);
                }
                
                });
                 }
                }
            else {       
          console.log(err);
          console.log("hhh");
        }
            
            });

         }      
          }
      else{
    console.log(err);
    console.log("kkk");
    return res.status(400).send('unsucess');   
  }    
     });
     
  
  
  } else{
    console.log("you do not have permission to perform this operation");
       
       }
  });
// end point to get all projects or to get a particular project using query parameter
  router.get('/projects',  (req, res) =>{
   console.log(JSON.stringify(req.user));

//  if(req.user[0].Role_Id == 1 || req.user[0].Role_Id == 5 || req.user[0].Role_Id == 2){
 name = req.query.ProjectName;
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
  
} else{     
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







module.exports = router; 