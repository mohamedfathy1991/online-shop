const router= require('express').Router()
const check =require('express-validator').check
const admincontroler= require('../controller/admincontroler')
const admingard= require('./gardes/admin.gard')



const multer =require('multer')





router.get('/add',admingard,admincontroler.getaddproduct)
router.post('/add',admingard,
 multer({  
           storage:multer.diskStorage({
               destination: (req,file,callback)=>{
                 callback(null, "statics")
               },
              filename:(req,file,cb)=>{
                   cb(null , Date.now() + file.originalname)
             }

      })





    
        // dest=>> meain destination and it take roote from app.js
        //   dest :'statics'
 }).single('image'),check('image').custom((value,{req})=>{
     if(req.file) return true
     else throw 'the image is requre'
})
,check('name').notEmpty().withMessage('name requre'), check('price').notEmpty().withMessage('price requre'),admincontroler.postaddproduct)




router.get('/manage',admingard,admincontroler.getmanageorder)


module.exports=router