const express = require ("express");
const router = express.Router() ;
const{validateToken} = require ("../middlewares/Authentication");
const {postsLikes} = require ("../models")

router.post("/",validateToken, async (req,res)=> {

    console.log("Utente autenticato:", req.user);

    const {like, postId} = req.body;
    console.log("postid",postId)
    let postLiked= await postsLikes.findOne({
        where: {
            userId: req.user.id,
            postId: postId
        }
    })
    let likedPost;
     if(postLiked) {
        //update
        likedPost= await postsLikes.update({
            like:like
        }, {
            where: {
                userId:req.user.id,
                postId: postId,
                id: postLiked.id
            }
        })
     } else {
        console.log("hello", like, req.user.id, postId)
        //create
        likedPost = await postsLikes.create({
            like:like,
            userId: req.user.id,
            postId: postId
        })
     }
     return res.json(likedPost)
})




module.exports = router