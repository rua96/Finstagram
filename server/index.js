const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");

require("dotenv").config();

app.use(express.json());
app.use(cors());
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

db.sequelize.sync().then(() => {
  app.listen(5555, () => {
    console.log("Server running on PORT 5555");
  });
});
