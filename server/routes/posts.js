const express = require("express");
const router = express.Router();
const {
  posts,
  users,
  postsLikes,
  postsComments,
  postImages,
} = require("../models");
const Authentication = require("../middlewares/Authentication");
const { Op } = require("sequelize");
const { upload } = require("../services/upload");

// 📤 Creazione post + upload immagine
router.post(
  "/",
  Authentication.validateToken,
  upload.single("image"),
  async (req, res) => {
    const { title, description } = req.body;

    const post = await posts.create({
      title: title,
      description: description,
      userId: req.user.id,
      status: "active",
    });

    if (req.file && req.file.path) {
      await postImages.create({
        imageUrl: req.file.path,
        postId: post.id,
      });
    }

    return res.json(post);
  }
);

// 📥 Recupera tutti i post
router.get("/", Authentication.validateToken, async (req, res) => {
  let getPosts = await posts.findAll({
    where: {
      status: {
        [Op.ne]: "deleted",
      },
    },
    include: [
      { model: users, attributes: ["username"] },
      { model: postsLikes },
      {
        model: postsComments,
        include: [{ model: users, attributes: ["username"] }],
      },
      { model: postImages }, // 👈 le immagini sono incluse direttamente
    ],
  });

  return res.json(getPosts);
});

// 👤 Post di un singolo utente
router.get("/:username", Authentication.validateToken, async (req, res) => {
  const { username } = req.params;

  const user = await users.findOne({ where: { username } });
  if (!user) return res.json({ error: "User Does Not Exist!" });

  const userPosts = await posts.findAll({
    where: {
      userId: user.id,
      status: "active",
    },
    include: [
      { model: users, attributes: ["username"] },
      { model: postsLikes },
      {
        model: postsComments,
        include: [{ model: users, attributes: ["username"] }],
      },
      { model: postImages }, // 👈 include immagini
    ],
  });

  return res.json(userPosts);
});

// 🗑️ Elimina post (soft delete)
router.delete("/:id", Authentication.validateToken, async (req, res) => {
  const { id } = req.params;

  await posts.update({ status: "deleted" }, { where: { id } });

  return res.json({ message: "Deleted Post" });
});

module.exports = router;
