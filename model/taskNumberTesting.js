const mongoose = require("mongoose");

const TaskNumberTesting = mongoose.model(
    "TaskNumberTesting",
    new mongoose.Schema({
        latestTaskNumber: Number
    })
);
module.exports = TaskNumberTesting;