import userModel from "./user-model.js";
export const createUser = (user) => userModel.create(user);
export const findUserById = (id) => userModel.findById(id);
export const updateUser = (id, user) =>
  userModel.updateOne({ _id: id }, { $set: user });
