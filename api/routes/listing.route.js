const express = require("express");
const router = express.Router();

const listingController = require("../controller/listing.controller");

const verifyUser = require("../utilis/verifyuser");

router.post("/create", verifyUser,listingController.createListing);


router.delete('/delete/:id',verifyUser,listingController.deleteListing);

console.log("updated")

router.post('/update/:id',verifyUser,listingController.updateListing);

router.get('/get/:id',listingController.getListing );

module.exports = router;
