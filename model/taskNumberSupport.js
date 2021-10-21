const mongoose = require("mongoose");

const TaskNumberSupport = mongoose.model(
    "TaskNumberSupport",
    new mongoose.Schema({
        latestTaskNumber: Number
    })
);
module.exports = TaskNumberSupport;