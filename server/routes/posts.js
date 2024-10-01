const express = require ("express")
const router = express.Router() ;
const {posts} = require ("../models")

const Authentication =require("../middlewares/Authentication")

router.post("/", Authentication.validateToken, async (req,res)=> {
    const {title, description} = req.body;

    await posts.create({
        title: title,
        description:description,
        userId: req.user.id
    })

    return res.json({message:"Il post e' stato CREATO / Post has been CREATED"})

    console.log("ID", req.user.id);

}
)


module.exports = router