const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    isInitialLogin: Boolean,
    isActive: Boolean,
    role: Number,
    createdUser: String,
    createdDate: Date,
    updatedUser: String,
    updateddate: Date
  })
);

module.exports = User;