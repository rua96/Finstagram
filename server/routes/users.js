const express = require("express");
const router=express.Router()

const { users } = require("../models")
router.get('/', async(req,res)=>{
    return res.send(false);
})

router.post('/',async (req,res)=>{

    const {email,password}= req.body;

    if(!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   )){
       return res.json({error:"Invalid Email"});
   };

    try{
        await users.create({
              email: email,
              password: password
        });
            
    } catch(e) {
        return res.json({ error: e});
    }
     
    return res.json({message: "User has been CREATED"});

})
module.exports = router;