const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // <-- carica .env PRIMA di tutto

const db = require("./models");

// Configura Cloudinary (solo inizializzazione, upload è nei router)
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cors());

// ROUTES
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

const postsLikesRouter = require("./routes/postsLikes");
app.use("/postsLikes", postsLikesRouter);

const postsCommentsRouter = require("./routes/postsComments");
app.use("/postsComments", postsCommentsRouter);

const imagesRouter = require("./routes/images");
app.use("/images", imagesRouter);

// AVVIO SERVER
db.sequelize.sync().then(() => {
  app.listen(5555, () => {
    console.log("🚀 Server avviato su PORTA 5555");
  });
});
