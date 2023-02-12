const Restaurant = require("../models/Restaurant");

exports.addRestaurant = async (req, res) => {
  try {
    const { name, description, type, address, service, cuisines } = req.body;

    const restaurant = await Restaurant.create({
      name,
      description,
      type,
      address,
      service,
      cuisines,
    });

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
