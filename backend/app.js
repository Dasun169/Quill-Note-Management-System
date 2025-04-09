const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoute");

const app = express();

//Middleware
app.use("/quill", router);

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
