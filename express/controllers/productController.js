const productModel = require('../models/products')





const createProduct = async (req, res) => {
  console.log(req.userId);
  const { title, description } = req.body
  const newProduct = new productModel({
    productName: title,
    productDescription: description,
    productId: req.userId
  }) 

  try {
    await newProduct.save()
    res.status(201).json({ newProduct })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" })
  }
}

// update functionality
const updateProduct =async (req, res) => {
  const id = req.params.id
  const { title, description } = req.body
  const newProduct = {
    productName: title,
    productDescription: description,
    productId: req.userId
  }
  try {
    await productModel.findByIdAndUpdate(id,newProduct,{new:true})
    res.status(201).json(newProduct)
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" })
  }
  }


  // delete functionality
  const deleteProduct =async (req, res) => {
    const id = req.params.id
   try {
    const product=await productModel.findByIdAndDelete(id)
    res.status(202).json(product)
    
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" })
   }
  }
  const getProduct =async (req, res) => {
         try {
            const products=await productModel.find({userId:req.userId})
            res.status(202).json(products)
         } catch (error) {
            console.log(error);
            res.status(500).json({message:"something went wrong"})
         }
  }

  module.exports = {
    createProduct, updateProduct, deleteProduct, getProduct
  }