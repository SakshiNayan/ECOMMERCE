const express= require("express");
const mongoose= require("mongoose");

require('dotenv').config();

const userController= require("./user/routes/user");
const orderController =require("./user/routes/orders");
const cartController = require("./user/routes/cart");
const itemController = require("./user/routes/items")
const multer =require("multer")();
const app= express();
const cors = require("cors");

//server
app.listen(3001, (err)=>{
    if(!err){
        console.log("Server is started at 3001")
    }else(
        console.log(err)
    )
});

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extented: false}));
app.use(multer.array());
app.use(cors());

//Database connection
//for clusture
//mongoose.connect("mongodb+srv://Sakshi123:<password>@project-1.iqvoerr.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost/ecommerce",(data)=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});

app.get("/",(req,res)=>{
    res.send("Ecommerce Backend")
})

//middleware
app.use("/user", userController);
app.use("/order", orderController);
app.use("/cart", cartController);
app.use("/item", itemController);