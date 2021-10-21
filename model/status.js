const mongoose = require("mongoose");

const Status = mongoose.model(
  "Status",
  new mongoose.Schema({
    statusId: Number,
    statusName: String
  })
);

module.exports = Status;