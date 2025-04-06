const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use("/", (req, res, next) => {
  res.send("It works!");
});

mongoose
  .connect(
    "mongodb+srv://dasunnavindu2001:GXzYJIltXWvVH4pY@cluster0.oxjraov.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
