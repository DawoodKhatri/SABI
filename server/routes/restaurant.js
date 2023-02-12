const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { addRestaurant } = require("../controllers/Restaurant");

const router = express.Router();

router.route("/restaurant").post(isAuthenticated, addRestaurant);

module.exports = router;
