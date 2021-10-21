const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');

const WorkLog = mongoose.model(
  "WorkLog",
  new mongoose.Schema({
    taskId: String,
    logComment: Object,
    hoursLogged: String,
    userId: String,
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    isActive: Boolean,
    userName: String
  })
);

module.exports = WorkLog;