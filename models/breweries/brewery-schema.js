import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    name: String,
    street: String,
    city: String,
    state: String,
    createdBy: { ref: "UserModel", type: mongoose.Schema.ObjectId },
    websiteUrl: String,
  },
  { collection: "breweries" }
);
export default schema;
