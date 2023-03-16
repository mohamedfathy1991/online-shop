const cartmodel =require('../models/cart.model')


const validatorResult= require("express-validator").validationResult



exports.postcard=(req,res,next)=>{
  
   if(validatorResult(req).isEmpty()){
    cartmodel.additem({
      
        amount:req.body.amount,
         price:req.body.price,
         name :req.body.name,
         userId:req.session.userId,
         productId: req.body.productid,
         timestamp:Date.now()
    },req.body.name,req.body.amount,req.session.userId).then(()=>{
     console.log(req.session.username)
        res.redirect('/cart')
    }).catch(err=>{
      console.log(err)
    })
   }else{
    req.flash('validationerr',validatorResult(req).array())
    res.redirect(req.body.redirectto)

   }

} 


exports.getcart=(req,res,next)=>{


  cartmodel.getitembyuser(req.session.userId).then(item=>{
    res.render('cart',{
     
      isUser: true,
      username:req.session.name,
      item:item,
      validationerr: req.flash('validationerr')[0]
      ,ISAdmin:req.session.ISAdmin,
      pagetitle: 'cart'

    
    
    })
  }).catch(err=>console.log(err))
  
}


exports.savecart=(req,res,next)=>{
  if(validatorResult(req).isEmpty()){ 
   cartmodel.edititem(req.body.cartid,{
    amount: req.body.amount,
    timestamp: Date.now()
   })
    
    .then(()=>{
    res.redirect('/cart')
     
  }
   ).catch(err=>{
     console.log(err)
   })
  }else{
    
   req.flash('validationerr',validatorResult(req).array())
   res.redirect('/cart',
   
   )
  }

} 

exports.deletitem =(req,res,next)=>{
  if(validatorResult(req).isEmpty()){ 
    cartmodel.deletitems(req.body.cartid)
     
     .then(()=>{
     res.redirect('/cart')
      
   }
    ).catch(err=>{
      console.log(err)
    })
   }else{
     console.log(   req.flash('validationerr',validatorResult(req).array()))
    req.flash('validationerr',validatorResult(req).array())
    res.redirect('/home',
    {validationerr: req.flash('validationerr')[0]}
    )
   }

}
let xname;
let xamount;let xprice;

exports.order= (req,res,next)=>{

     xamount= req.body.itemamount
     xname= req.body.itemname
     xprice= req.body.itemprice

  
       
  res.render('order',{

    isUser:true,
    username:req.session.name,
    validationerr: req.flash('validationerr')
    ,ISAdmin:req.session.ISAdmin
     
  })
}


exports.adress= (req,res,next)=>{
  if(validatorResult(req).isEmpty()){

cartmodel.saveadress(req.body.adress,xname,xamount,xprice,req.session.userId,req.session.email



).then(()=>{
  res.redirect('/cart/order/adress')
}).catch(err=>{
  console.log(err)
})

  }



else{
  console.log(xname)
  req.flash('validationerr',validatorResult(req).array())
  res.render('order',
  {validationerr: req.flash('validationerr')[0]
,
ISAdmin:req.session.ISAdmin,
isUser:true},

  )
 }

}



exports.getadress= (req,res,next)=>{
  

cartmodel.getadress(req.session.userId).then((data)=>{
  res.render('dataorder',{data:data,isUser:true,username:req.session.name,ISAdmin:req.session.ISAdmin
  },)
}).catch(err=>{
  console.log(err)
})

  }



  
exports.deletorder =(req,res,next)=>{
  if(validatorResult(req).isEmpty()){ 
    console.log(req.body.deletorder)
    cartmodel.deletorder(req.body.deletorder)
     
     .then(()=>{
     res.redirect('/cart/order/adress')
      
   }
    ).catch(err=>{
      console.log(err)
    })
   }else{
     console.log(   req.flash('validationerr',validatorResult(req).array()))
    req.flash('validationerr',validatorResult(req).array())
    res.redirect('/home',
    {validationerr: req.flash('validationerr')[0]}
    )
   }

}



