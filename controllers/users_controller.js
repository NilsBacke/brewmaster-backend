import * as userDao from "../models/users/user-dao.js";
import mongoose from "mongoose";

const usersController = (app) => {
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:uid", updateUser);
  app.get("/api/users", getAllUsers);
};

const findUserById = async (req, res) => {
  const id = req.params.uid;
  const result =
    (await userDao.findUserByUsername(id)) ?? (await userDao.findUserById(id));
  res.json(result);
};

const createUser = async (req, res) => {
  const newUser = req.body;
  const insertedUser = await userDao.createUser(newUser);
  res.json(insertedUser);
};

const updateUser = async (req, res) => {
  const id = req.params.uid;
  const oldUser = await userDao.findUserById(id);
  const newUser = {
    password: oldUser.password,
    ...req.body,
  };
  newUser.following = newUser.following.map((f) => mongoose.Types.ObjectId(f));
  const insertedUser = await userDao.updateUser(id, newUser);
  res.json(insertedUser);
};

const getAllUsers = async (req, res) => {
  const result = await userDao.findAllUsers();
  res.json(result);
};

export default usersController;
