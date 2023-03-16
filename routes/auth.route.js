const router= require('express').Router()
const authcontroler= require('../controller/auth.controler')
const bodyparser= require('body-parser')


const authcard=require('./gardes/auth.gard')


const check =require('express-validator').check


 router.get("/signup",authcard.notisauth,authcontroler.getsingup)

  router.post("/signup",bodyparser.urlencoded({extended:true}),
  check('username').not().isEmpty().withMessage('enter the name'),
  check('email').not().isEmpty().withMessage('enter email')
  .isEmail().withMessage('enter the coreect email'),
  check('password').isLength({min:6}).withMessage('password is to short'),

  check('confirm-password').custom((value,{req})=>{
    if(value ==req.body.password) return true
    else throw "password not matched" 
  })

//   (req,res,next)=>{
//     let value= req.body.password
//     return check('confirm-password').equals(value).withMessage('password not matched')
//   }

  
  ,
  authcontroler.postsingup)
 


 router.get("/login",authcard.notisauth,authcontroler.getlogin)



 router.post("/login",bodyparser.urlencoded({extended:true}),authcontroler.postlogin)
 router.all('/logout',authcard.isauth,authcontroler.logout)






module.exports=router