//add to cart // delete to cart

const express= require("express");
const cartModal = require("../modals/cart-modal");
const router= express.Router();

router.post("/add",(req,res)=>{
    cartModal.create({
        username: req.body.username,
        item_id: req.body.item_id
    })
    .then(()=>{
        res.status(200).send("Item added Success")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.delete("/remove/:id",(req,res) =>{
    cartModal.deleteOne({item_id: req.params.id })
    .then(()=>{
        res.status(200).send("Item Removed")
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

module.exports=router;