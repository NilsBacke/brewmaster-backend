import axios from "axios";
import * as breweryDao from "../models/breweries/brewery-dao.js";
import mongoose from "mongoose";

const breweriesController = (app) => {
  app.get("/api/breweries", findAllBreweries);
  app.get("/api/breweries/:uid", findBreweryById);
  app.post("/api/breweries", createBrewery);
  app.put("/api/breweries/:uid", updateBrewery);
};

const findAllBreweries = async (req, res) => {
  const mongoResults = await breweryDao.findAllBreweries();
  let result = {};
  if (req.query.search && req.query.search.length > 0) {
    result = await axios.get(
      `https://api.openbrewerydb.org/breweries/search?query=${req.query.search}`
    );
  } else {
    result = await axios.get(`https://api.openbrewerydb.org/breweries`);
  }

  const fullResults = mongoResults.concat(result.data);
  res.json(fullResults);
};

const findBreweryById = async (req, res) => {
  const id = req.params.uid;
  try {
    const result = await axios.get(
      `https://api.openbrewerydb.org/breweries/${id}`
    );

    if (result.status !== 200) {
      // check mongodb for brewery id
      const mongoResult = await breweryDao.findBreweryById(id);
      res.json(mongoResult);
    } else {
      res.json(result.data);
    }
  } catch {
    // check mongodb for brewery id
    const mongoResult = await breweryDao.findBreweryById(id);
    res.json(mongoResult);
  }
};

const createBrewery = async (req, res) => {
  const newBrewery = req.body;
  newBrewery.createdBy = mongoose.Types.ObjectId(newBrewery.createdBy);
  const insertedBrewery = await breweryDao.createBrewery(newBrewery);
  res.json(insertedBrewery);
};

const updateBrewery = async (req, res) => {
  const id = req.params.uid;
  const newBrewery = req.body;
  const updatedBrewery = await breweryDao.updateBrewery(id, newBrewery);
  res.json(updatedBrewery);
};

export default breweriesController;
