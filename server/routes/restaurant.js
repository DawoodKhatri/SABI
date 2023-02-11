const express = require("express");
const { addRestaurant, login } = require("../controllers/Restaurant");

const router = express.Router();

router.route("/restaurant").post(addRestaurant);

module.exports = router;
