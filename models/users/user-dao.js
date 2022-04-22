import userModel from "./user-model.js";
export const createUser = (user) => userModel.create(user);
export const findUserById = (id) => userModel.findById(id);
export const updateUser = (id, user) =>
  userModel.updateOne({ _id: id }, { $set: user });
export const findUserByCredentials = (username, password) => {
  return userModel.findOne({
    username: username,
    password: password,
  });
};
export const findUserByUsername = (username) => {
  return userModel.findOne({
    username,
  });
};
