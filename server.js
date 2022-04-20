import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import breweriesController from "./controllers/breweries_controller.js";
import usersController from "./controllers/users_controller.js";
// const CONNECTION_STRING =
//   process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/webdev";
// mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(cors());
breweriesController(app);
usersController(app);
app.listen(process.env.PORT || 4000);
