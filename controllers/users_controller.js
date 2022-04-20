import * as userDao from "../models/users/user-dao.js";

const usersController = (app) => {
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:uid", updateUser);
};

const findUserById = async (req, res) => {
  const id = req.params.uid;
  const result = await userDao.findUserById(id);
  res.json(result);
};

const createUser = async (req, res) => {
  const newUser = req.body;
  newUser._id = new Date().getTime() + "";
  const insertedUser = await userDao.createUser(newUser);
  res.json(insertedUser);
};

const updateUser = async (req, res) => {
  const newUser = req.body;
  const id = req.params.uid;
  const insertedUser = await userDao.updateUser(id, newUser);
  res.json(insertedUser);
};

export default usersController;
