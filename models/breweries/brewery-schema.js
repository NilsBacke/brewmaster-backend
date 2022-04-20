import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    name: String,
    street: String,
    city: String,
    state: String,
    comments: [
      {
        type: String,
      },
    ],
    createdBy: String,
  },
  { collection: "breweries" }
);
export default schema;
