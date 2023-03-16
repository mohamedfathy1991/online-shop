
const router= require('express').Router()
const homecontroler= require('../controller/home.controler')


const authgard= require('./gardes/auth.gard')



router.get('/home',authgard.isauth ,homecontroler.gethome)







module.exports= router