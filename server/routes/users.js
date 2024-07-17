const express = require("express");
const bcrypt = require("bcrypt");
const { users } = require("../models")
const Validation = require("../helpers/Validation");

const router=express.Router()

router.get('/', async(req,res)=>{
    return res.send(false);
})

router.post('/',async (req,res)=>{

    const {email,password,username}= req.body;

    if(!Validation.isValidEmail(email)){
        return res.json({error:"Invalid Email"});
   };
   if(!Validation.isValidPassword(password)){
       return res.json({error:"Invalid Password"});
    };
    if(!Validation.isValidUsername(username)){
    return res.json({error:"Invalid Username"});
 };

    try{
        bcrypt.hash(password,10).then(async (hash) => {
           try{
                await users.create({
                    email: email,
                    password: hash,
                    username: username
            });
            return res.json({message: "User has been CREATED"});
        } catch(e) {
            return res.json({ error: e});
        }
    })
        
            
    } catch(e) {
        return res.json({ error: e});
    }
})
module.exports = router;