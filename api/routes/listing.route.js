const express = require("express");
const router = express.Router();

const listingController = require("../controller/listing.controller");

const verifyUser = require("../utilis/verifyuser");

router.post("/create", listingController.createListing);

module.exports = router;
