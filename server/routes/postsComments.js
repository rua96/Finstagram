const express = require("express");
const router = express.Router() ;
const{validateToken} = require ("../middlewares/Authentication");
const {postsComments, users} = require ("../models")
const {Op} = require ("sequelize")

router.post("/",validateToken, async (req,res) => {
    const {comment, postId} = req.body;

            
    let commentedPost = await postsComments.create({
            comment:comment,
            userId: req.user.id,
            postId: postId,
            status: "active"
        })
     return res.json(commentedPost)
})


router.get("/:postId",validateToken, async (req,res) => {

    const {postId} =req.params;

    let getComments= await postsComments.findAll({

        where:{
            postId: postId,
            status: {
                [Op.ne]: "deleted"
            }
             }
        ,
        include: [
            {
                model: users,
                attributes: ["username"]
            }
        ]

    });

    return res.json(getComments)
})

router.get("/:username", validateToken, async (req,res)=> {
    const {username} = req.params;

    let user = await postsComments.findOne({
        where: {
            username:username,
        }
    })
    if(!user){
        return res.json ({error: "User Does Not Exist!"})
    }

    let userComment = await postsComments.findAll({
        where: {
            userId: user.id,
            status:"active"
        },
        include:
            [
                {
                    model:users,
                    attributes: ["username"]
                }]
        
    })
    return res.json(userComment)
})

router.delete ("/:id", validateToken , async (req,res) => {

    const{id} = req.params;

   
    console.log ("ID", id)

    await postsComments.update(
    {
        status: "deleted"
    },
    {
        where:{
            id : id
        }

    }
)

return res.json({ message: "Deleted Comment"})
})



module.exports = router