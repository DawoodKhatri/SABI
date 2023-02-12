const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

exports.addRestaurant = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.isBusiness) {
      return res.status(401).json({
        success: false,
        message: "Business account required",
      });
    }

    const { name, description, type, address, service, cuisines } = req.body;

    const newRestaurant = {
      owner: req.user._id,
      name,
      description,
      type,
      address,
      service,
      cuisines,
    };

    const restaurant = await Restaurant.create(newRestaurant);

    user.restaurants.push(restaurant._id);
    await user.save();

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await restaurant.remove();

    const user = await User.findById(req.user._id);
    const index = user.restaurants.indexOf(req.params.id);

    user.restaurants.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Restaurant deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
