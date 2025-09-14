const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Carica le variabili d'ambiente da .env

const db = require("./models");

// Configura Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CORS: Definisci le origini consentite
const allowedOrigins = [
  "https://instagram-w4xs.onrender.com/images/upload/2",
  "https://finstagram-8h61.vercel.app",
  "https://instagram-clss.vercel.app/users",
  "https://instagram-one-wheat.vercel.app",
  "https://instagram-clss.vercel.app/users",
  "entry:1",
  "finstagram-8h61-r939adwpj-andreas-projects-13e88ddf.vercel.app",
  "https://instagram-w4xs.onrender.com",
  "https://finstagram-8h61.vercel.app",
  "https://finstagram-8h61-hhno8f6cs-andreas-projects-13e88ddf.vercel.app",
  "https://instagram-w4xs.onrender.com/users/login",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Non autorizzato"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "authtoken"],
  credentials: true,
};

// Middleware
//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// Se usi file statici (opzionale, per immagini locali)
app.use("/public", express.static("public"));

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
const PORT = process.env.PORT || 5555;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server avviato su PORTA ${PORT}`);
  });
});
