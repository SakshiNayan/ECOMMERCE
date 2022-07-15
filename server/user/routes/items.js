/*{
    itemName:"",
    itemCatogary:"",
    itemImage:"",
    actualPrice: "",
    discountedPrice: ""
}*/
const express = require("express");
const itemModal = require("../modals/item-modal")

const router=express.Router()

router.get("/",(req,res)=>{
    itemModal.find().then((itemData)=>{
        res.status(200).send({item: itemData});
    })
});

//for adding many items
router.post("/add",(req,res)=>{
    itemModal.insertMany( req.body.items).then((itemData)=>{
        res.status(200).send("Item Added Success");
    })
});


module.exports= router;