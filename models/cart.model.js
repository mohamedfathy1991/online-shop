const mongoose =require('mongoose')
const db_url=    'mongodb+srv://omarfathy1991:221219915@cluster0.njgijc5.mongodb.net/onlineshop?retryWrites=true&w=majority'

const cartschema= mongoose.Schema({

    name: String,
    price:Number,
    amount:Number,
    userId:String,
    productId:String,
    timestamp:Number,
})
const cartorder= mongoose.Schema({
    name: String,
    adress: String,
    price:Number,
    amount:Number,
    status: String,
    userid:String,
    useremail:String
    
})

const Order= mongoose.model('order',cartorder)
const cartitem= mongoose.model('cart',cartschema)
// الداتا دي البيانات اللي جايه من ريكويست عشان احفظها
exports.additem =(data,nam,newamount,user)=>{
    
    return new Promise((resolve, reject) => {
        

            mongoose.connect(db_url).then(()=> cartitem.findOne({name:nam,userId:user}) )
            .then( itemnam=>{
                if(itemnam){ 
                   let x= itemnam.amount
                   return cartitem.updateOne({name:nam},{amount:(+x + +newamount)})

                }
                else{


         
                
               let item = new cartitem(data)

               return item.save()}
                            
          
            }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect  
            reject(err)
        })
    })
}


exports.getitembyuser=(userId)=>{
  return new Promise((resolve, reject) => {
    mongoose.connect(db_url).then(()=> 
    {return  cartitem.find({userId:userId},{},{sort:{timestamp:-1}})}
    ).then((item)=>{
        mongoose.disconnect()
      resolve(item)

    }).catch(err=>{
        mongoose.disconnect()
        reject(err)
      })
      
  })

}





  
exports.edititem =(id,data)=>{
    return new Promise((resolve, reject) => {
        
        mongoose.connect(db_url).then(()=>{
           return  cartitem.updateOne({_id:id},data)
         
           
           
        }).then(item=>{
            console.log(item)
            mongoose.disconnect()
            resolve(item)
        }).catch(err=>{
            mongoose.disconnect()  
            reject(err)
        })
    })
}


 
exports.deletitems =(id)=>{
    return new Promise((resolve, reject) => {
        
        mongoose.connect(db_url).then(()=>{
           return  cartitem.deleteOne({_id:id})
         
           
           
        }).then(item=>{
            console.log(item)
            mongoose.disconnect()
            resolve(item)
        }).catch(err=>{
            mongoose.disconnect()  
            reject(err)
        })
    })
}
exports.saveadress=(adress,xname,xamount,xprice,user,emailuser)=>{
    return new Promise((resolve, reject) => {
      
       let delitem= cartitem.deleteOne({name:xname})
        mongoose.connect(db_url).then(

            ()=>{
           


            let order = new Order({
                name: xname,
                adress: adress,
                price:xprice,
                amount:xamount,
                status: 'bending',
                userid:user,
                useremail:emailuser

            },
            )
            return (order.save(),delitem)
            
        }
           
        ).then(()=>{
           
        
            

            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })    
    })
    
}





exports.getadress=(userid)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(db_url).then(()=>{
            return Order.find({userid:userid})
        }
           
        ).then((data)=>{
            mongoose.disconnect()
            resolve(data)
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })    
    })
    
}



 
exports.deletorder =(orderid)=>{
    return new Promise((resolve, reject) => {
        
        mongoose.connect(db_url).then(()=>{
           return  Order.deleteOne({_id:orderid})
         
           
           
        }).then(item=>{
            console.log(item)
            mongoose.disconnect()
            resolve(item)
        }).catch(err=>{
            mongoose.disconnect()  
            reject(err)
        })
    })
}






exports.getmageorder=()=>{
    return new Promise((resolve, reject) => {
      mongoose.connect(db_url).then(()=> {return  Order.find()}
      ).then((mamageorder)=>{
          mongoose.disconnect()
        resolve(mamageorder)
  
      }).catch(err=>{
          mongoose.disconnect()
          reject(err)
        })
        
    })
  
  }