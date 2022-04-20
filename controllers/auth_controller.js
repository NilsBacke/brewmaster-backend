import * as userDao from "../models/users/user-dao.js";

const authController = (app) => {
  app.post("/api/auth/login", login);
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);
};

const login = async (req, res) => {
  const user = req.body;
  const username = user.username;
  const password = user.password;
  const existingUser = await userDao.findUserByCredentials(username, password);
  if (existingUser) {
    existingUser.password = "";
    req.session["profile"] = existingUser;
    res.json(existingUser);
  } else {
    res.sendStatus(403);
  }
};

const profile = (req, res) => res.json(req.session["profile"]);

const signup = async (req, res) => {
  const newUser = req.body;
  const existingUser = await userDao.findUserByUsername(req.body.username);
  if (existingUser) {
    res.sendStatus(403);
    return;
  } else {
    const insertedUser = await userDao.createUser(newUser);
    insertedUser.password = "";
    req.session["profile"] = insertedUser;
    res.json(insertedUser);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

export default authController;
