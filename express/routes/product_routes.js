const express=require('express')
const { getProduct, createProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const { auth } = require('../middleware/auth')
const productsRouter=express.Router()

productsRouter.get("/",auth,  getProduct)

productsRouter.post("/",auth, createProduct)

productsRouter.delete("/:id",auth,deleteProduct)

productsRouter.put("/:id",auth,updateProduct)
module.exports=productsRouter;