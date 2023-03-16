

const authmodels= require('../models/auth.models')
const bodyparser= require('body-parser')
const validatorResult= require("express-validator").validationResult

exports.getsingup = (req,res,next)=>{

    res.render('signup',{
        autherr: req.flash('autherr')[0],
        
         valerror: req.flash('valerror'),
         username:false,
         isUser: false
         ,ISAdmin:false
         } 
        )



}


exports.postsingup = (req,res,next)=>{

   
    if(validatorResult(req).isEmpty()){
    
     
authmodels
.createuser(req.body.username,req.body.email,req.body.password)
.then(()=>res.redirect('/login'))
.catch(err=>{
    console.log(err)
    req.flash('autherr',err)
    
    res.redirect('/signup')
  })
}else{
    req.flash('valerror',validatorResult(req).array())
    res.redirect('/signup',)

    
}
}




exports.postlogin=(req,res,next)=>{
    if(validatorResult(req).isEmpty()){
  
    authmodels.postloginuser(req.body.email,req.body.password)

    //     -- في الاول كنت كاتب مكان ريسلت دلوقتي عايزابعت اسك المستخدم واي دي فلازم تبقي اوبجكت وداتا)(id) 
    .then(result=>{
        
         req.session.userId=result.id
         req.session.name=result.names
         req.session.ISAdmin=result.ISAdmin
         req.session.email=result.email
        
        // console.log(names)
        console.log(req.session.name)
        res.redirect('/home')})
    
    .catch((err)=>{
        req.flash('autherr',err)
        console.log(err)
        res.redirect('/login')
    })
}else{
    req.flash('validationerr',validatorResult(req).array())
    res.redirect('/login')
}
}



exports.getlogin=(req,res,next)=>{
    res.render('login',{
        autherr: req.flash('autherr')[0],
        isUser: false,
        username:false,
        ISAdmin:false
   
      
    })
}

exports.logout=(req,res,next)=>{
    req.session.destroy(()=>res.redirect('/login'))
}