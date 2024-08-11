const path = require("path");
const express = require("express");
const router = express.Router();

const controller = require("../controller/user.controller");

const verifyUser = require("../utilis/verifyuser");

router.get("/", controller.getUser);


router.post("/update/:id", verifyUser, controller.postUpdateUser);

router.delete("/delete/:id", verifyUser, controller.deleteUser);
router.get('/listing/:id', verifyUser, controller.getUserListing);

router.get('/get/:id', verifyUser, controller.getUserData)
module.exports = router;
