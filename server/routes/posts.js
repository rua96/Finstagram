const express = require ("express")
const router = express.Router() ;
const {posts, users} = require ("../models")
const{validateToken} = require ("../middlewares/Authentication")


const Authentication =require("../middlewares/Authentication")
const {Op} = require("sequelize");

router.post("/", Authentication.validateToken, async (req,res)=> {
    const {title, description} = req.body;
    

    await posts.create({
        title: title,
        description:description,
        userId: req.user.id,
        status: "active"
    })


 
    return res.json({message:"Il post e' stato CREATO / Post has been CREATED"})

}
)

   router.get("/", Authentication.validateToken, async (req,res)=> {
        
        let getPosts = await posts.findAll({
            where: {
                status: {
                    [Op.ne]: "deleted"
                }
            },
            include:[{
                model:users,
                attributes: ["username"]
            }], 
            /*order:[["createdAt","DESC"]]*/
           });
          
         
    return res.json(getPosts)
})

router.get("/:username", validateToken, async (req,res)=> {
    const {username} = req.params;

    let user = await users.findOne({
        where: {
            username:username,
        }
    })
    if(!user){
        return res.json ({error: "User Does Not Exist!"})
    }

    let userPosts = await posts.findAll({
        where: {
            userId: user.id,
            status:"active"
        }
    })
    return res.json(userPosts)
})

router.delete ("/:id", validateToken , async (req,res) => {

    const{id} = req.params;

   
    console.log ("ri", id)

    await posts.update(
    {
        status: "deleted"
    },
    {
        where:{
            id : id
        }

    }
)

return res.json({ message: "Deleted Post"})
})

module.exports = router