const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authentication");
const { upload } = require("../services/upload"); // getImage RIMOSSO
const { postImages } = require("../models");

router.post(
  "/upload/:postId",
  [validateToken, upload.single("file")],
  async (req, res) => {
    const { file } = req;
    const { postId } = req.params;

    if (!file) {
      return res.status(400).json({ error: "Nessun file ricevuto" });
    }

    // Salva solo l'URL dell'immagine (file.path) nel DB
    const postImage = await postImages.create({
      imageUrl: file.path, // 👈 URL pubblico Cloudinary
      postId: postId,
    });

    return res.json(postImage);
  }
);

// 🔴 Questa route NON SERVE PIÙ con Cloudinary
// router.post("/postImage", validateToken, async (req, res) => {
//   const { key } = req.body;
//   return await getImage(key, res);
// });

module.exports = router;
