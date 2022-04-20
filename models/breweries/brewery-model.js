import mongoose from "mongoose";
import brewerySchema from "./brewery-schema.js";
const breweryModel = mongoose.model("BreweryModel", brewerySchema);
export default breweryModel;
