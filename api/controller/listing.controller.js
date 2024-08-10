const Listing = require("../models/Listing.model.js");
const errorHandler = require("../utilis/error.js");

module.exports.createListing = async (req, res, next) => {
  console.log("I am in Listing");
  console.log(req.body);
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports.deleteListing = async (req, res, next) => {
  let listing = await Listing.findOne({ _id: req.params.id });
  if (!listing) return next(errorHandler(401, "Listing is not exist"));
  if (listing._id.toString() !== req.params.id) {
    return next(errorHandler(401, "You are not allowed to delete"));
  }

  try {
    let listing = await Listing.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.updateListing = async (req, res, next) => {
  console.log(req.params.id)
  let listing = await Listing.findById({ _id: req.params.id });

  if (!listing) return next(errorHandler(401, "Listig not found"));

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can onlt update your own listing"));
  }

  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({updateListing,
      message: "Listing updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getListing = async (req, res, next) => {
  console.log("inside---2")
  try {
    let listing = await Listing.findById({ _id: req.params.id });
    if(!listing) return next(errorHandler(401,"Listing not found"));
       console.log(listing)
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
