

const productModels= require('../models/products.models')

exports.getproduct=(req,res,next )=>{
    
     let id= req.params.id
    console.log(id) 
    
     productModels.getproductbyitem(id).then(prod=>{
        res.render('product',{
            products:prod,
            isUser: req.session.userId,
            username:req.session.name,
            ISAdmin:req.session.ISAdmin

        })

    })


}

exports.getoneitem=(req,res,next)=>{
    productModels.getoneproduc().then( (products)=>{
    res.render('first',{
        products:products,
        username:req.session.name,
        isUser : req.session.userId,
        ISAdmin:req.session.ISAdmin

    })

})
 } 