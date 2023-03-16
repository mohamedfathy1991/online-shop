const router= require('express').Router()

const podyparser= require('body-parser')
const { body } = require('express-validator')
const cartcontrol= require('../controller/cartcontroler')
const authcard=require('./gardes/auth.gard')
const check =require('express-validator').check




router.post('/',authcard.isauth,podyparser.urlencoded({extended:true}) ,
check('amount').notEmpty().withMessage('amount is requre').isInt({min:1}).withMessage('must greater than 1'),


cartcontrol.postcard)

router.post('/order',authcard.isauth, podyparser.urlencoded({extended:true}),cartcontrol.order )
router.get('/',authcard.isauth, podyparser.urlencoded({extended:true}),cartcontrol.getcart )
router.post('/save',authcard.isauth, podyparser.urlencoded({extended:true}),
check('amount').notEmpty().withMessage('amount is requre').isInt({min:1}).withMessage('must greater than 1')
,cartcontrol.savecart)
router.post('/delet',authcard.isauth, podyparser.urlencoded({extended:true}),cartcontrol.deletitem)


router.post('/order/adress',authcard.isauth, podyparser.urlencoded({extended:true})
,check('adress').notEmpty().withMessage('enter address'),cartcontrol.adress )

router.get('/order/adress',authcard.isauth, podyparser.urlencoded({extended:true}),
check('adress').notEmpty().withMessage('enter address'),cartcontrol.getadress )


router.post('/order/delet',authcard.isauth,podyparser.urlencoded({extended:true}),cartcontrol.deletorder)






module.exports=router
