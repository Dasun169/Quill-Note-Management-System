const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
  let Users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

exports.getAllUsers = getAllUsers;
