const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const UserRouter = require("./Routes/UserRoute");
const ProfileRouter = require("./Routes/ProfileRoute");
const NoteRouter = require("./Routes/NoteRoute");
const CategoryRouter = require("./Routes/CategoryRoute");
const AuthRouter = require("./Routes/AuthRoute");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://precious-brioche-f13d21.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Middleware
app.use(cookieParser());
app.use(express.json());

app.use("/quill", AuthRouter);
app.use("/quill/user", UserRouter);
app.use("/quill/profile", ProfileRouter);
app.use("/quill/note", NoteRouter);
app.use("/quill/category", CategoryRouter);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
