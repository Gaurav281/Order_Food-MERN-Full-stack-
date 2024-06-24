/* eslint-disable no-undef */
const mongoose = require("mongoose");

const databaseURL =
  "mongodb+srv://gauravpushpa28:Pushpa123@cluster0.cbszc6v.mongodb.net/foody?retryWrites=true&w=majority&appName=Cluster0";

const db = async () => {
  try {
    await mongoose.connect(databaseURL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const foodItems = await mongoose.connection.db.collection("food_items");
    const items = await foodItems.find({}).toArray();
    const food_category = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const category = await food_category.find({}).toArray();
    global.food_items = items;
    global.foodCategory = category;
    // console.log(global.food_items);
    // console.log(global.foodCategory);
    // if (items) {
    //   global.food_items = items;
    // }
    // if (category) {
    //   global.foodCategory = category;
    // }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = db;
