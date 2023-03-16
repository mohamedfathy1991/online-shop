
const gard= require('./gardes/auth.gard')
const router =require('express').Router()
const podyparser= require('body-parser')
const productControler= require('../controller/prouduct.controler')
router.get('/:id',productControler.getproduct)

router.get('/',gard.isauth,podyparser.urlencoded({extended:true})  ,productControler.getoneitem)


module.exports=router