

const mongoose =require('mongoose')
const crypt =require('bcrypt')

const db_url="mongodb+srv://omarfathy1991:221219915@cluster0.njgijc5.mongodb.net/onlineshop?retryWrites=true&w=majority"

// const db_url='mongodb://0.0.0.0/online'
const authSchema= mongoose.Schema({
   username:String,
   email:String,
   password:String,
   ISAdmin:{type:Boolean,
    default:false

   }
   
})
const User =mongoose.model('user', authSchema )






exports.createuser=(username,email,password)=>{
   return   new Promise((resolve,reject)=>{
    mongoose.connect(db_url).then(()=>{ 
        return User.findOne({email:email})
   })
   .then(user=>{
       
      if (user){
        mongoose.disconnect()
        reject('email is used')
    } 
      else{
        return crypt.hash(password,10)}})
        .then(hashedpass=>{
          let user= new User({
            username: username,
            email:email,
            password : hashedpass,
           
        })        
        return user.save()       
      }).then( ()=>{

        mongoose.disconnect()
        resolve()
               
      }).catch(err=>{
        mongoose.disconnect()
        reject(err)
        
    })
                   })
    
                }

exports.postloginuser= (email,password )=>{
  return new Promise ((resolve,reject)=>{
   mongoose.connect(db_url).then(()=> User.findOne({email:email}) )
   .then( user=>{
    if(!user){
      mongoose.disconnect()
      reject('email is in correct')
    }else{
       
        crypt.compare(password,user.password).then(same=>{
        if(!same){
         mongoose.disconnect()
         reject('password incorrect')
        }else{
         mongoose.disconnect()
        // عشان ابعت في الريسولف اكتر من قيمه لازم تكون عباره عن اوبجكت واستقبلها في نتيجه علبعضها
         resolve({id:user._id,
          ISAdmin:user.ISAdmin,
          email:user.email,
          names:user.username}) 
        }
        })
    
    }
   }).catch(err=>{
    console.log(err)
   }) 

  } ) 
  

  }

