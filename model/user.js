const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    // required: true,
  },
  todos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Todo",
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
