const mongoose = require("mongoose");

const Projectuser = mongoose.model(
  "Projectuser",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    isInitialLogin: Boolean,
    isActive: Boolean,
    role: Number
      
  }, { collection: 'user' })
);

module.exports = Projectuser;