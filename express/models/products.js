const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
  productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
},{timestamps:true})

module.exports=mongoose.model("products",productSchema)


                                                                                                                  