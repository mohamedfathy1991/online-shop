const express =require('express')
const app =express()
const path = require('path')

const flash= require('connect-flash')

const session= require('express-session')
const Sessionstore= require('connect-mongodb-session')(session)


const homeRouter= require('./routes/home-route')
const productRouter= require('./routes/product-route')
const authRoute= require('./routes/auth.route')
const cartRoute =require('./routes/cartroRouter')
const AdminRoute=require('./routes/admin.route')

app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'statics')))


app.set('view engine','ejs')
app.set('views','views')

const Store = new Sessionstore({
    // uri:"mongodb://0.0.0.0/online",
    uri:"mongodb+srv://omarfathy1991:221219915@cluster0.njgijc5.mongodb.net/onlineshop?retryWrites=true&w=majority"  ,
    // uri:"mongodb+srv://omarfathy1991:221219915@cluster0.njgijc5.mongodb.net/onlineshop?retryWrites=true&w=majority",
    Collection: 'session'   

})
app.use(session({
    // wite long message any message
    secret:'  this is all seecret save coockes here ..... ',
    saveUninitialized:false,
            // cookie:{  by default cookie closed when i close the browser ومش بكتبها 
            //          maxAge: 1*60*60*100
              
            //       }
         store: Store 
        //  بخزن السيشن داخل ال STORE 
    
}))


app.use(flash())
app.use('/', authRoute)

app.use('/',homeRouter)
app.use('/cart',cartRoute )
// app.use('/cart',cartRoute )


app.use('/error', (req,res,next)=>{
    res.render('err',{
    ISAdmin:true,
    isUser:true,
    email:req.session.email,
    username:req.session.name
})})

// app.use('/',productRouter)


app.use('/product',productRouter)
app.use('/admin',AdminRoute)




app.use((req,res,next)=>{
    res.status(404);
        // res.render('nofond');
        res.render('nofound',{isUser : req.session.userId,
            username:req.session.name,
            ISAdmin:false

        })
    })


    const port =process.env.PORT || 3000

app.listen( port,(err)=>{
    
    console.log('app server work')
})