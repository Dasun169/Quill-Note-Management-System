const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  categoryType: {
    type: String,
  },
});

module.exports = mongoose.model("Category", userSchema);
