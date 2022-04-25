import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    name: String,
    type: String,
    ownedBreweryId: String, // only exists if type === BreweryOwner
    bookmarkedBreweries: [{ type: String }],
    following: [{ ref: "UserModel", type: mongoose.Schema.ObjectId }],
  },
  { collection: "users" }
);
export default userSchema;
