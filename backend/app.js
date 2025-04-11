const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./Routes/UserRoute");
const ProfileRouter = require("./Routes/ProfileRoute");
const NoteRouter = require("./Routes/NoteRoute");
const CategoryRouter = require("./Routes/CategoryRoute");

const app = express();

//Middleware
app.use(express.json());
app.use("/quill/user", UserRouter);
app.use("/quill/profile", ProfileRouter);
app.use("/quill/note", NoteRouter);
app.use("/quill/category", CategoryRouter);

mongoose
  .connect(
    "mongodb+srv://dasunnavindu2001:GXzYJIltXWvVH4pY@cluster0.oxjraov.mongodb.net/quill"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
