const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  addRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  getUserRestaurants,
} = require("../controllers/Restaurant");

const router = express.Router();

router.route("/restaurant/add").post(isAuthenticated, addRestaurant);
router.route("/restaurant/:id").delete(isAuthenticated, deleteRestaurant);
router.route("/user/restaurants").get(isAuthenticated, getUserRestaurants);
router.route("/restaurant/:id").get(getRestaurant);
router.route("/restaurants").get(getRestaurants);

module.exports = router;
