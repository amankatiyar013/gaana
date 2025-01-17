import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import error from "./middleware/error.js";
// import "./db.js";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import songRouter from "./routes/song.routes.js";
import mongoose, { connect } from "mongoose";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://katiyaraman266:Shashi@111@cluster0.zy0in4e.mongodb.net/?retryWrites=true&w=majority&appName=database"
  )
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/songs", songRouter);

app.use(error);
