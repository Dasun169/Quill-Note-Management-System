const User = require("../Model/UserModel");

//get all users
const getAllUsers = async (req, res, next) => {
  let user;

  try {
    user = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ user });
};

//user insert
const addUsers = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user;

  try {
    user = new User({ name, email, password });
    await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to add a user" });
  }
  return res.status(200).json({ user });
};

// get user by email
const getUserByEmail = async (req, res, next) => {
  const { email } = req.params;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error retrieving user" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

// get user ID by email
const getUserIdByEmail = async (req, res, next) => {
  const { email } = req.params;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error retrieving user" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ _id: user._id });
};

// update user by id
const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  let user;
  try {
    user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating user" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getUserByEmail = getUserByEmail;
exports.getUserIdByEmail = getUserIdByEmail;
exports.updateUserById = updateUserById;
