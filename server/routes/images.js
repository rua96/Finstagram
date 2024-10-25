const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Authentication");
const { upload } = require("../services/S3Manager");
const { postImages } = require("../models");

router.post(
  "/upload/:postId",
  [validateToken, upload.single("file")],
  async (req, res) => {
    const { file } = req;
    const { postId } = req.params;

    let postImage = await postImages.create({
      originalName: file.originalname,
      key: file.key,
      size: file.size,
      postId: postId,
    });

    console.log("file", file, postId);

    return res.json(postImage);
  }
);

module.exports = router;
