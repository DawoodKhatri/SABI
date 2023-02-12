const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  addRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
} = require("../controllers/Restaurant");

const router = express.Router();

router.route("/restaurant/add").post(isAuthenticated, addRestaurant);
router.route("/restaurant/:id").delete(isAuthenticated, deleteRestaurant);
router.route("/restaurant/:id").get(isAuthenticated, getRestaurant);
router.route("/restaurants").get(isAuthenticated, getRestaurants);

module.exports = router;
