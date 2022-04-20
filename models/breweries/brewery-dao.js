import breweryModel from "./brewery-model.js";
export const findAllBreweries = () => breweryModel.find();
export const findBreweryById = (id) => breweryModel.findById(id);
export const createBrewery = (brewery) => breweryModel.create(brewery);
export const updateBrewery = (id, brewery) =>
  breweryModel.updateOne({ _id: id }, { $set: brewery });
