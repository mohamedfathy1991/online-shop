



exports.isauth= (req,res,next)=>{
    if(req.session.userId) next()
    else res.redirect('/login')

}

exports.notisauth= (req,res,next)=>{
    if(!req.session.userId) next()
    else res.redirect('/home')

}