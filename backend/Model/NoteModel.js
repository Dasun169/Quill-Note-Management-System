const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryType: {
    type: String,
  },
  keyWords: {
    type: [String],
  },
});

module.exports = mongoose.model("Note", userSchema);
