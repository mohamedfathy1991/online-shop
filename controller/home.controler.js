 
 const productsmodels= require('../models/products.models')
 
 exports.gethome=(req,res,next)=>{


    let cat= req.query.category
    let validcat=['clothes','phone','labs']
    
    if (cat && validcat.includes(cat)){
        


        
           productsmodels.getallcategoryproducts(cat).then(prod=>{
        
            res.render('index',{
                products : prod,
                isUser : req.session.userId,
                username:req.session.name,
                validationerr: req.flash('validationerr')[0],
                pagetitle: 'home'

    
            })
    
        })
    }  else{
        productsmodels.getallproducts().then(prod=>{
        
            res.render('index',{
                products : prod,
                isUser:req.session.userId ,
                username:req.session.name,

                validationerr: req.flash('validationerr')[0]
                ,ISAdmin:req.session.ISAdmin,

               
    
            })
    
        })

    }
    //  get product database==>> (model)
    // render html


 }

 