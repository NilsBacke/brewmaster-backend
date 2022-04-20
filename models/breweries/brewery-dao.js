import breweryModel from "./brewery-model.js";
export const findAllBreweries = () => breweryModel.find();
export const createBrewery = (brewery) => breweryModel.create(brewery);
export const deleteBrewery = (tid) => breweryModel.deleteOne({ _id: tid });
export const updateBrewery = (tid, brewery) =>
  breweryModel.updateOne({ _id: tid }, { $set: brewery });
