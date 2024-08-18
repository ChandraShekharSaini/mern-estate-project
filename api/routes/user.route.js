const path = require("path");
const express = require("express");
const router = express.Router();

const controller = require("../controller/user.controller");

const verifyUser = require("../utilis/verifyuser");

router.get("/", controller.getUser);


router.post("/update/:id", controller.postUpdateUser);

router.delete("/delete/:id", controller.deleteUser);
router.get('/listing/:id', controller.getUserListing);

router.get('/get/:id', controller.getUserData)
module.exports = router;
