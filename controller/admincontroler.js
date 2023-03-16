const validatorResult= require("express-validator").validationResult

const addminmodel= require('../models/cart.model')
const addnewproduct= require('../models/products.models')


exports.getaddproduct=(req,res,next)=>{

   
    res.render('addnewproduct',{
        valerror: req.flash('validationerr'),
        ISAdmin:true,
    isUser:true,
    username:req.session.name})
  
}


exports.postaddproduct=(req,res,next)=>{
    if(validatorResult(req).isEmpty()){
    addnewproduct.addnewproduct( {
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        img: req.file.filename 
    } ).then(()=>res.redirect('/home'))
    .catch( err=>{
        res.redirect('/error')
            
      
    })

}else{
        req.flash('validationerr',validatorResult(req).array())
    res.redirect('/admin/add')
    }
   }

   
exports.getmanageorder=(req,res,next)=>{
  

addminmodel.getmageorder().then((managedata)=>{


    res.render('manageoreder',{
        valerror: req.flash('validationerr'),
        managedata:managedata,
        ISAdmin:true,
    isUser:true,
    email:req.session.email,
    username:req.session.name})

})
   
    
  
}
