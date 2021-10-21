const mongoose = require("mongoose");

const TaskNumber = mongoose.model(
    "TaskNumber",
    new mongoose.Schema({
        latestTaskNumber: Number
    })
);
module.exports = TaskNumber;