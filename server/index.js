const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 4040;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
client.connect(() => {
  console.log("Connected to Database");
});

app.get("/sendemail", async (req, res) => {
  const options = {
    from: "MyDine <dk.appmailservice@gmail.com>",
    to: req.query["to"],
    subject: "OTP for MyDine",
    html: `<h2>Your OTP is ${req.query["OTP"]} </h2>`
  };
  let transpoter = nodemailer.createTransport({
    service: "gmail", //i use outlook
    auth: {
      user: "dk.appmailservice@gmail.com", // email
      pass: "zehqwquqxbzpykyu" //password
    }
  });
  transpoter.sendMail(options).then((e) => {
    res.status(200);
    res.json({ result: "success" });
  });
});

app.get("/signup", cors(), async (req, res) => {
  client
    .db("restaurant-booking")
    .collection("authentication")
    .insertOne(req.query)
    .then((user) => {
      res.status(200);
      res.json({ result: "success", id: user["insertedId"].toString() });
    });
});

app.get("/login", cors(), async (req, res) => {
  client
    .db("restaurant-booking")
    .collection("authentication")
    .findOne({ email: req.query["email"], password: req.query["password"] })
    .then((user) => {
      if (user) {
        delete user["password"];

        if (user["type"] === "restaurant") {
          client
            .db("restaurant-booking")
            .collection("restaurants")
            .findOne({ _id: new ObjectId(user["restaurant"]) })
            .then((restaurant) => {
              user["restaurant"] = restaurant;
              res.status(200);
              res.json({ result: "success", userData: user });
            });
        } else {
          res.status(200);
          res.json({ result: "success", userData: user });
        }
      } else {
        res.status(200);
        res.json({ result: "incorrect" });
      }
    });
});

app.get("/addrestaurant", cors(), async (req, res) => {
  var uid = req.query["uid"];
  var data = req.query;
  delete data.uid;
  client
    .db("restaurant-booking")
    .collection("restaurants")
    .insertOne(data)
    .then((restaurant) => {
      client
        .db("restaurant-booking")
        .collection("authentication")
        .updateOne(
          { _id: ObjectId(uid) },
          {
            $push: {
              restaurants: restaurant.insertedId.toString()
            }
          }
        )
        .then(() => {
          res.status(200);
          res.json({ result: "success" });
        });
    });
});

app.get("/addchefs", cors(), async (req, res) => {
  var rid = req.query["rid"];
  var data = req.query;
  delete data.rid;
  client
    .db("restaurant-booking")
    .collection("chefs")
    .insertOne(data)
    .then((chef) => {
      client
        .db("restaurant-booking")
        .collection("restaurants")
        .updateOne(
          { _id: ObjectId(rid) },
          {
            $push: {
              chefs: chef.insertedId.toString()
            }
          }
        )
        .then(() => {
          res.status(200);
          res.json({ result: "success" });
        });
    });
});

app.get("/adddishes", cors(), async (req, res) => {
  var cid = req.query["cid"];
  var data = req.query;
  delete data.cid;
  client
    .db("restaurant-booking")
    .collection("dishes")
    .insertOne(data)
    .then((dish) => {
      client
        .db("restaurant-booking")
        .collection("chefs")
        .updateOne(
          { _id: ObjectId(cid) },
          {
            $push: {
              dishes: dish.insertedId.toString()
            }
          }
        )
        .then(() => {
          res.status(200);
          res.json({ result: "success" });
        });
    });
});

app.get("/all", cors(), async (req, res) => {
  client
    .db("restaurant-booking")
    .collection(req.query["type"])
    .find({})
    .toArray()
    .then((data) => {
      res.status(200);
      res.json({ result: "success", data: data });
    });
});

app.get("/bookings", cors(), async (req, res) => {
  var query = {};
  query[req.query["type"]] = req.query["id"];

  var bookingDetails = [];
  client
    .db("restaurant-booking")
    .collection("bookings")
    .find(query)
    .toArray()
    .then((bookingDatas) => {
      bookingDatas.forEach((bookingData) => {
        bookingDetails.push({ schedule: bookingData.schedule });
      });
      bookingDatas.forEach((bookingData) => {
        client
          .db("restaurant-booking")
          .collection(
            req.query["type"] === "customer" ? "restaurants" : "authentication"
          )
          .findOne({
            _id: new ObjectId(
              bookingData[
                req.query["type"] === "customer" ? "restaurant" : "customer"
              ]
            )
          })
          .then((type) => {
            bookingDetails[bookingDatas.indexOf(bookingData)][
              req.query["type"] === "customer" ? "restaurant" : "customer"
            ] = type;
          });
        var dishes = [];
        var chefs = [];
        for (let i in bookingData.dishes) {
          dishes.push(new ObjectId(bookingData.dishes[i].dish));
          chefs.push(new ObjectId(bookingData.dishes[i].chef));
        }
        client
          .db("restaurant-booking")
          .collection("dishes")
          .find({ _id: { $in: dishes } })
          .toArray()
          .then((dishesData) => {
            dishes.forEach((dish) => {
              dishesData.forEach((dishData) => {
                if (dish.toString() === dishData._id.toString()) {
                  dishes[dishes.indexOf(dish)] =
                    dishesData[dishesData.indexOf(dishData)];
                }
              });
            });
            client
              .db("restaurant-booking")
              .collection("chefs")
              .find({ _id: { $in: chefs } })
              .toArray()
              .then((chefsData) => {
                chefs.forEach((chef) => {
                  chefsData.forEach((chefData) => {
                    if (chef.toString() === chefData._id.toString()) {
                      chefs[chefs.indexOf(chef)] =
                        chefsData[chefsData.indexOf(chefData)];
                    }
                  });
                });
                for (let i in dishes) {
                  let chef = chefs[i];
                  delete chef.dishes;
                  dishes[i].chef = chef;
                }
                bookingDetails[
                  bookingDatas.indexOf(bookingData)
                ].dishes = dishes;
                if (bookingDetails.length === bookingDatas.length) {
                  let flag = true;
                  bookingDetails.forEach((data) => {
                    if (
                      !data[
                        req.query["type"] === "customer"
                          ? "restaurant"
                          : "customer"
                      ] ||
                      !data.dishes
                    ) {
                      flag = false;
                    }
                  });
                  if (flag) {
                    console.log(bookingDetails);
                    res.status(200);
                    res.json({
                      result: "success",
                      bookingDetails: bookingDetails
                    });
                  }
                }
              });
          });
      });
    });
});

app.get("/chefs", cors(), async (req, res) => {
  var ids = JSON.parse(req.query["ids"]);
  var chefs = [];
  ids.forEach(async (id) => {
    chefs.push(
      await client
        .db("restaurant-booking")
        .collection("chefs")
        .findOne({ _id: new ObjectId(id) })
    );
    if (chefs.length === ids.length) {
      res.status(200);
      res.json({ result: "success", chefData: chefs });
    }
  });
});

app.get("/dishes", cors(), async (req, res) => {
  var ids = JSON.parse(req.query["ids"]);
  var dishes = [];
  ids.forEach((id) => {
    ids[ids.indexOf(id)] = new ObjectId(id);
  });
  client
    .db("restaurant-booking")
    .collection("dishes")
    .find({ _id: { $in: ids } })
    .toArray()
    .then((data) => {
      dishes = data;
      res.status(200);
      res.json({ result: "success", dishData: dishes });
    });
});

app.get("/dish/chefs", cors(), async (req, res) => {
  var ids = JSON.parse(req.query["ids"]);
  var chefs = [];
  client
    .db("restaurant-booking")
    .collection("chefs")
    .find({
      dishes: { $in: ids }
    })
    .toArray()
    .then((data) => {
      ids.forEach((id) => {
        chefs[ids.indexOf(id)] = [];
        data.forEach((item) => {
          if (item.dishes.includes(id)) {
            chefs[ids.indexOf(id)].push(item);
          }
        });
      });
      res.status(200);
      res.json({ result: "success", chefData: chefs });
    });
});

app.get("/newBooking", cors(), async (req, res) => {
  var details = JSON.parse(req.query["details"]);
  client
    .db("restaurant-booking")
    .collection("bookings")
    .insertOne(details)
    .then(() => {
      res.status(200);
      res.json({ result: "success" });
    });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

module.exports = app
