const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Product = require("./models/product");
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const newproduct = new Product(req.body);
  await newproduct.save();
  res.redirect(`/products/${newproduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const singleProduct = await Product.findById(id);
  res.render("products/productDetails", { singleProduct });
});

app.get("/products/:id/edit", async (req, res) => {
  const id = req.params.id;
  const singleProduct = await Product.findById(id);
  res.render("products/edit", { singleProduct });
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  res.redirect(`/products`);
});

app.listen(port, () => {
  console.log("App is paying attention");
});

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
