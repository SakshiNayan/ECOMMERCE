//add to cart // delete to cart

const express= require("express");
const jwt = require("jsonwebtoken");
const cartModal = require("../modals/cart-modal");
const router= express.Router();

router.post("/add",(req,res)=>{
    // cartModal.create({
    //     username: req.body.username,
    //     item_id: req.body.item_id
    // })
    // .then(()=>{
    //     res.status(200).send("Item added Success")
    // }).catch((err)=>{
    //     res.status(400).send(err)
    // })
    console.log(req.headers.authorization, req.body);
    try {
        const username = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        cartModal.create({username: username, item_id: req.body.itemid})
        .then(()=> {
            res.status(200).send("Item Added Sucessfully")
        }).catch((err)=> {
            res.status(400).send(err)
        });
    } 
    catch(err) {
        res.status(400).send("User not authorized")
    }

});

router.get("/", (req, res)=> {
    try {
        const username = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        cartModal.find({username: username})
        .then((cart)=> {
            res.status(200).send({cart: cart})
        })
    } 
    catch(err) {
        res.status(400).send("User not authorized")
    }
});

router.delete("/remove/:id",(req,res) =>{
    cartModal.deleteOne({item_id: req.params.id })
    .then(()=>{
        res.status(200).send("Item Removed")
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

module.exports=router;