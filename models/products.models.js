 const mongoose =require('mongoose')


const db_url=    'mongodb+srv://omarfathy1991:221219915@cluster0.njgijc5.mongodb.net/onlineshop?retryWrites=true&w=majority'

 const productSchema= mongoose.Schema({
    name:String,
    price:Number,
    img:String,
    category:String,
 })

const product =mongoose.model('product', productSchema )

exports.getallproducts =()=>{
    
   return new Promise((resolve,reject)=>{
    mongoose.connect(db_url).then(()=>{
        return product.find()

    }).then(prod=>{
        mongoose.disconnect()
        resolve(prod)

    }).catch(err=>{
        mongoose.disconnect()

        reject(err)})
})
}


exports.getallcategoryproducts =(cat)=>{
    console.log(cat)
    return new Promise((resolve,reject)=>{
     mongoose.connect(db_url).then(()=>{
         return product.find({category:cat})
 
     }).then(prod=>{
         mongoose.disconnect()
         resolve(prod)
 
     }).catch(err=>{
        mongoose.disconnect()

        reject(err)})
 })
 }
 
exports.getproductbyitem =(id)=>{
    
    return new Promise((resolve,reject)=>{
     mongoose.connect(db_url).then(()=>{
         return product.find({name:id})
 
     }).then(prod=>{
         mongoose.disconnect()
         resolve(prod)
 
     }).catch(err=>
        {        mongoose.disconnect()

            reject(err)})

 })

 }
 
exports.getoneproduct = ()=>{
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(db_url).then(()=>{
            return product.findOne({})
    
        }).then(prod=>{
            mongoose.disconnect()
            resolve(prod)
    
        }).catch(err=>
            
            {        mongoose.disconnect()

            reject(err)})
   
    })

 }


exports.addnewproduct=(newproductdata)=>{
    return new Promise((resolve,reject)=>{

        

        mongoose.connect(db_url).then(()=>{
      let newproduct = new product(newproductdata)

      return newproduct.save()

        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch((err)=>{

            mongoose.disconnect()
            reject(err)
        })

})


}



