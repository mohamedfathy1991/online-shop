module.exports=  (req,res,next)=>{
    if(req.session.ISAdmin) next()
    else{
        res.redirect('/login')
        console.log('mot admin')
    }
}