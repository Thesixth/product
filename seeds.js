const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmProduct", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected!!");
  })
  .catch((err) => {
    console.log(err, "mongo conncetion failed");
  });

const seedProducts = [
  {
    name: "Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Melon",
    price: 4.5,
    category: "fruit",
  },
  {
    name: "Kale",
    price: 4.99,
    category: "vegetable",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
