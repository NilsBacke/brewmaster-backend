import axios from "axios";
import * as breweryDao from '../models/breweries/brewery-dao'

const breweriesController = (app) => {
  app.get("/api/breweries", findAllBreweries);
  app.get("/api/breweries/:uid", findBreweryById);
  app.post("/api/breweries", createBrewery);
  app.delete("/api/breweries/:uid", deleteBrewery);
  app.put("/api/breweries/:uid", updateBrewery);
};

const findAllBreweries = async (req, res) => {
  let result = {};
  if (req.query.search) {
    result = await axios.get(
      `https://api.openbrewerydb.org/breweries/search?query=${req.query.search}`
    );
  } else {
    result = await axios.get(`https://api.openbrewerydb.org/breweries`);
  }
  res.json(result);
};

const findBreweryById = async (req, res) => {
  const result = await axios.get(
    `https://api.openbrewerydb.org/breweries/${req.params.uid}`
  );
  res.json(result);
};

const createBrewery = (req, res) => {
    const newBrewery = req.body;
  const insertedBrewery = await breweryDao.createBrewery(newBrewery);
  res.json(insertedBrewery);
};

const deleteBrewery = (req, res) => {};

const updateBrewery = (req, res) => {};

export default breweriesController;
