const Listing = require("../models/Listing.model.js");

module.exports.createListing = async (req, res, next) => {
    console.log("I am in Listing")
    console.log(req.body);
  try {

    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
