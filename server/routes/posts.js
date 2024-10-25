const express = require("express");
const router = express.Router();
const { posts, users, postsLikes, postsComments } = require("../models");
const { validateToken } = require("../middlewares/Authentication");
const Authentication = require("../middlewares/Authentication");
const { Op } = require("sequelize");
const { postImages } = require("../models");

router.post("/", Authentication.validateToken, async (req, res) => {
  const { title, description } = req.body;

  let post = await posts.create({
    title: title,
    description: description,
    userId: req.user.id,
    status: "active",
  });

  return res.json(post);
});

router.get("/", Authentication.validateToken, async (req, res) => {
  let getPosts = await posts.findAll({
    where: {
      status: {
        [Op.ne]: "deleted",
      },
    },
    include: [
      {
        model: users,
        attributes: ["username"],
      },
      {
        model: postsLikes,
      },
      {
        model: postsComments,
        include: [
          {
            model: users,
            attributes: ["username"],
          },
        ],
      },
      {
        model: postImages,
      },
    ],
  });

  return res.json(getPosts);
});

router.get("/:username", validateToken, async (req, res) => {
  const { username } = req.params;

  let user = await users.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.json({ error: "User Does Not Exist!" });
  }

  let userPosts = await posts.findAll({
    where: {
      userId: user.id,
      status: "active",
    },
    include: [
      {
        model: users,
        attributes: ["username"],
      },
      {
        model: postsLikes,
      },
      {
        model: postsComments,
        include: [
          {
            model: users,
            attributes: ["username"],
          },
        ],
      },
    ],
  });
  return res.json(userPosts);
});

router.delete("/:id", validateToken, async (req, res) => {
  const { id } = req.params;

  console.log("ri", id);

  await posts.update(
    {
      status: "deleted",
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Deleted Post" });
});

module.exports = router;
