const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    projectName: String,
    projectDesc: String,
    projectType: String,
    projectTypeId: String,
    projectKey: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    startDateTime: Date,
    updatedDateTime: Date,
    endDateTime: Date
  })
);

module.exports = Project;