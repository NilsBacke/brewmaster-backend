import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import breweriesController from "./controllers/breweries_controller.js";
import usersController from "./controllers/users_controller.js";
import authController from "./controllers/auth_controller.js";
import session from "express-session";
// const CONNECTION_STRING =
//   process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/webdev";
// mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.set("trust proxy", 1);
app.use(
  session({
    secret: "123", // TODO: change
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // needs HTTPS
  })
);

breweriesController(app);
usersController(app);
authController(app);
app.listen(process.env.PORT || 4000);
