const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
var Schema = mongoose.Schema;

var ProjectTaskSchema = new Schema(
    {
        taskName: String,
        taskDesc: String,
        estimatedTime: Double,
        actualTime: Double,
        
        statusId: String,
        taskTypeId: String,
        projectId: String,
        assignedUserId: String,
        user:{
            type: Schema.Types.ObjectId,
            ref: "Users"
        },
        creatorUserId: String,
        creatorUser:[{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
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
        taskId: String,
        imageUrl: String,
        projectName: String
    }
)

var ProjectTask = mongoose.model("ProjectTask", ProjectTaskSchema);
module.exports = ProjectTask;