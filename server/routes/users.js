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

    if(email && !Validation.isValidEmail(email)){
        return res.json({error:"Invalid Email"});
    };
    if(!Validation.isValidPassword(password)){
        return res.json({error:"Invalid Password"});
    };
    if(username && !Validation.isValidUsername(username)){
        return res.json({error:"Invalid Username"});
     };

    try{
        bcrypt.hash(password,10).then(async (hash) => {
           try{
                await users.create({
                    email: email,
                    username: username,
                    password: hash
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

router.post("/login",async (req,res)=>{

    const {email,password,username}= req.body;

    if(!email && !username){
        return res.json({ error: "Invalid Input"});
    };

    if(email && !Validation.isValidEmail(email)){
        return res.json({error:"Invalid Email"});
   };

    if(username && !Validation.isValidUsername(username)){
    return res.json({error:"Invalid Username"});
 };

let user;
if(username) {
    user=await users.findOne({where: {username:username}})
} else if(email){
    user= await users.findOne({where: {email:email}})
}
if(!user){
    return res.json({error: "Account does not exist"})
}

// match password;

bcrypt.compare(password,user.password).then(async(match) =>{

    if(!match) {
        return res.json({error: "wrong Password"})
    }

    return res.json({login:true});
    })

})


module.exports = router;

