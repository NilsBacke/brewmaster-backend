import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import breweriesController from "./controllers/breweries_controller.js";
import usersController from "./controllers/users_controller.js";
import authController from "./controllers/auth_controller.js";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/brewmaster";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://lambent-mochi-4b18f2.netlify.app",
  })
);

let sess = {
  secret: "1231412323124",
  cookie: { secure: false },
};

if (process.env.ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie = { secure: true, maxAge: 1000 * 60 * 60 * 48, sameSite: "none" };
}

app.use(session(sess));

breweriesController(app);
usersController(app);
authController(app);
app.listen(process.env.PORT || 4000);
