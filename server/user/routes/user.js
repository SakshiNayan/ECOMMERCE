const express= require("express");
const router= express.Router();
const signupModal= require("../modals/signup-modal");
const {checkExistingUser, generatePasswordHash} = require("../utility");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken")
//for generating secret key we need crypto which internal package
// const crypto= require("crypto");

// const SECRET_KEY = crypto.randomBytes(64).toString("hex");
// const salt =10;

router.post("/login",(req,res)=>{
    //comparing password
    signupModal.find({username: req.body.username}).then((userData) =>{
        if(userData.length){
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val){
                    const authToken= jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                }
                else{
                    res.status(400).send("Invalid password")
                }
            })
        }else{
            res.status(400).send("Unauthorized user")
        }
    })
    //res.status(200).send("login works")
});

router.post("/signup", async (req,res)=>{
    if(await checkExistingUser(req.body.username)){
        res.status(400).send("Username exist..Please try with another username")
    }else{
        //this function is just used to generate hash
        generatePasswordHash(req.body.password).then((passwordHash)=>{
            signupModal.create({
                username: req.body.username, 
                // phone_no: req.body.phone_no, 
                email: req.body.email,
                password: passwordHash})
                .then(()=>{
                     res.status(200).send(`${req.body.username} added successfully`)
                
                }).catch((err)=>{
                            
                    res.status(400).send(err.message)
                })
        });
        
        // bcrypt.genSalt(salt).then((saltHash)=>{
        //     bcrypt.hash(req.body.password, saltHash).then((passwordHash)=>{
        //         signupModal.create({username: req.body.username, phone_no: req.body.phone_no, 
        //             password: passwordHash})
        //             .then(()=>{
        //                 res.status(200).send(`${req.body.username} added successfully`)
        
        //         }).catch((err)=>{
        //             res.status(400).send(err.message)
        //         })
        //     }).catch((err) =>{
        //         console,log(err);
        //     })
        // }).catch((err)=>{
        //     console.log(err)
        // })
        
        
    }
    //res.status(200).send("signup works")
    
});

router.post("/logout",(req,res)=>{
    res.status(200).send("logout works")
});

//compare the password and update pass
router.put("/updatepassword",(req,res)=>{
    signupModal.find({username: req.body.username }).then((user)=>{
        if(user.length){
            bcrypt.compare(req.body.oldpassword, user[0].password)
            .then((isMatch) =>{
                if(!isMatch){
                    res.status(400).send("Old password is Incorrect")
                }
                else{
                    generatePasswordHash(req.body.newpassword).then((hashedPassword) =>{
                        signupModal.updateOne({username: req.body.username},{password: hashedPassword} )
                        .then(()=>{
                            res.status(200).send("password updated success")
                        }).catch((err)=>{
                            res.status(400).send(err)
                        })
                    })
                    
                }
            })
        }else{
            res.status(400).send("Invalid User")
        }
    })
})
//old pass  //new pass /username

module.exports= router;


//verification done by 
//token n  secretKey
