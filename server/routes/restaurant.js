const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  addRestaurant,
  deleteRestaurant,
} = require("../controllers/Restaurant");

const router = express.Router();

router.route("/restaurant/add").post(isAuthenticated, addRestaurant);
router.route("/restaurant/:id").delete(isAuthenticated, deleteRestaurant);

module.exports = router;
