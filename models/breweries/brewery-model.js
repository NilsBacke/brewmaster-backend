import mongoose from "mongoose";
import brewerySchema from "./brewery-schema";
const breweryModel = mongoose.model("BreweryModel", brewerySchema);
export default breweryModel;
