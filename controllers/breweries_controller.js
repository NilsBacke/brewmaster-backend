import axios from "axios";
import * as breweryDao from "../models/breweries/brewery-dao.js";

const breweriesController = (app) => {
  app.get("/api/breweries", findAllBreweries);
  app.get("/api/breweries/:uid", findBreweryById);
  app.post("/api/breweries", createBrewery);
  app.put("/api/breweries/:uid", updateBrewery);
};

const findAllBreweries = async (req, res) => {
  const mongoResults = await breweryDao.findAllBreweries();
  let result = {};
  if (req.query.search) {
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
};

const createBrewery = async (req, res) => {
  const newBrewery = req.body;
  newBrewery._id = new Date().getTime() + "";
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
