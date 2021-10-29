const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var Schema = mongoose.Schema;

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    taskName: String,
    taskDesc: String,
    estimatedTime: String,
    actualTime: String,
    statusId: String,
    statusName: String,
    taskTypeId: String,
    taskType: String,
    //projectId: String,
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
  },
    assignedUserId: String,
    creatorUserId: String,
    assignedUser: String,
    creatorUser: String,
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    taskStartdate: Date,
    taskendDateTime: Date,
    assignedDateTime: Date,
    updatedDateTime: {
        type: Date,
        default: Date.now
    },
    priorityId: String,
    priority: String,
    taskId: String,
    imageUrl: String,
    projectName: String
  })
);

module.exports = Task;