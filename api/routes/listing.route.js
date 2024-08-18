const express = require("express");
const router = express.Router();

const listingController = require("../controller/listing.controller");

const verifyUser = require("../utilis/verifyuser");

router.post("/create", listingController.createListing);


router.delete('/delete/:id',listingController.deleteListing);

console.log("updated")

router.post('/update/:id',listingController.updateListing);

router.get('/get/:id',listingController.getListing );

router.get('/get', listingController.getListings);

module.exports = router;
