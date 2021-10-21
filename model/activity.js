const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');

const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    id: String,
    taskId: String,
    comment: Object,
    hoursLogged: Double,
    loggedHoursComment: String,
    userId: String,
    userName: String,
    isActive: Boolean,
    createdDateTime: {
        type: Date,
        default: Date.now
    }
  })
);

module.exports = Activity;