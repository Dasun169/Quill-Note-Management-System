const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/UserController");

router.post("/", UserController.addUsers);
router.get("/", UserController.getAllUsers);
router.get("/email/:email", UserController.getUserByEmail);
router.get("/id-by-email/:email", UserController.getUserIdByEmail);
router.put("/update/:id", UserController.updateUserById);

module.exports = router;
