const express=require('express')
const mongoose=require('mongoose')
const productsRouter = require('./routes/product_routes');
const userRouter = require('./routes/user_routes');

const app=express()
const port= 3000;
app.use(express.json())

app.use("/users",userRouter)

app.use("/products",productsRouter)

mongoose.connect("mongodb+srv://admin:admin@cluster0.6uuki6v.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(port,()=>{
        console.log("listening on "+ port);
    })

}).catch((er)=>{
    console.log(er);
})


