const Task = require("../model/tasks.js");
const User = require("../model/user.js");
const TaskNumber = require("../model/tasknumber.js");
const TaskNumberSupport = require("../model/tasknumberSupport.js");
const TaskNumberTesting = require("../model/tasknumberTesting.js");
const Project = require("../model/projects.js");
const mail = require("../utility/mail/mail.js");
const mailConstants = require("../constants/mailconstants")
var mongoose = require('mongoose');

exports.getRecentTasksByUser = (req, res) => {
    let userId = req.params.assignedUserId;
    console.log(userId);
    var taskQuery = Task.find({assignedUserId: userId}).populate("projectId").limit(6);
    taskQuery.exec(function(err, docs){
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(docs !== null){
                console.log(docs);
                //var json = JSON.parse(docs);
                return res.status(200).json(docs);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.getTaskByTaskId = (req, res) => {
    let taskId = req.params.taskId;
    console.log(taskId);
    var taskQuery = Task.findOne({taskId: taskId});

    taskQuery.exec(function(err, doc){
        console.log(doc);
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(doc !== null){
                User.findOne({_id: doc.assignedUserId}).exec(function(err, user){
                    doc.assignedUser = user.name;
                    doc.creatorUser = user.name;
                    doc.statusName = getStatus(doc.statusId);
                    doc.taskType = getTaskType(doc.taskTypeId);
                    doc.priority = getPriority(doc.priorityId);
                    res.status(200).json(doc)
                })
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.updateTaskByTaskId = async (req, res) =>{
    let taskId = req.body.taskId;
    let taskType = req.body.taskTypeId;
    let taskStatus = req.body.statusId;
    let taskPriority = req.body.priorityId;
    let taskDesc = req.body.taskDesc;
    let taskName = req.body.taskName;
    let updatedById = req.body.updatedById;
    let updatedByName = req.body.updatedByName;
    let statusName = req.body.statusName;
    let estimatedTime = req.body.estimatedTime;
    //console.log(req.body);
    try{
       let task = await Task.findOneAndUpdate({"taskId": taskId},{"$set":{"taskName": taskName, "taskTypeId": taskType, 
       "statusId": taskStatus, "statusName": statusName, "priorityId": taskPriority, "taskDesc": taskDesc, "estimatedTime": estimatedTime,
       "updatedDateTime": Date.now()}}).exec()

       let userAssigned = await User.findOne({_id: task.assignedUserId}).exec();
       // console.log(userAssigned);

        const mailContent = {
            from: mailConstants.FROM_EMAIL_ID,
            to: userAssigned.email,
            subject:  taskId + ' : ' + taskName,
            text: mailConstants.TASK_ID + taskId + mailConstants.HAS_BEEN_UPDATED + updatedByName
        }
        
        mail.sendmyMail(mailContent);

        console.log(task);
        res.status(200).send({data: task, message: "Success"});
    }
    catch(error){
        res.status(500).send({message: error});
                return;
    }
}

const getStatus = (statusId) => {
    switch(statusId){
        case "1":
            return "Open";
        case "2":
            return "Re-Open";
        case "3":
            return "In Progress";
        case "4":
            return "On Staging";
        case "5":
            return "To Deploy";
        default:
            return "On Live";
    }
}

const getTaskType = (taskTypeId) => {
    switch(taskTypeId){
        case "1":
            return "Enhancement";
        case "2":
            return "Feature";
        case "3":
            return "Bug";
        case "4":
            return "Investigate";
        default:
            return "Change";
    }
}

const getPriority = (priorityId) => {
    switch(priorityId){
        case "1":
            return "Normal";
        case "2":
            return "High";
        case "3":
            return "Low";
        default:
            return "Urgent";
    }
}       

exports.createTask = (req, res) =>{

    const task = new Task({
        taskName : req.body.taskName,
        taskDesc : req.body.taskDesc,
        estimatedTime : req.body.estimatedTime,
        //actualTime : null,
        statusId : 1,
        statusName: "Open",
        taskTypeId : req.body.taskTypeId,
        projectId : req.body.projectId,
        assignedUserId : req.body.assignedUserId,
        creatorUserId : req.body.creatorUserId,
        createdDateTime : Date.Now,
        taskStartdate : null,
        taskendDateTime : null,
        assignedDateTime : Date.Now,
        updatedDateTime : Date.Now,
        priorityId: req.body.priorityId,
        //taskId: null,
        imageUrl: req.body.imageUrl,
        projectName: req.body.projectName
    })

    console.log(req.body.projectId);

    // const documentCount = getLatestTaskNumber();
    // console.log('Hi ' + documentCount);
  
    Project.findOne({_id: req.body.projectId}).then(function(proj){
        
        TaskNumber.findOne({}).then(function(num){
            console.log(proj)
            task.taskId = proj.projectKey + "-" + num.latestTaskNumber;
            task.projectName = proj.projectName;
            console.log("1" + task.taskId); 
            
            let updatedNumber = num.latestTaskNumber + 1
            TaskNumber.updateOne({},{latestTaskNumber:updatedNumber}, function(err, docs){
                if(err){
                    res.status(500).message({message: err});
                    return;
                }
                else{
                    task.save((err, addedtask) => {
                        if(err){
                            res.status(500).message({message: err});
                            return;
                        }
                        console.log('final')

                        User.findOne({_id: req.body.assignedUserId}).then(user => {
                            const mailContent = {
                                from: mailConstants.FROM_EMAIL_ID,
                                to: user.email,
                                subject:  task.taskId + ' : ' + task.taskName,
                                text: mailConstants.TASK_ID + addedtask.taskId + mailConstants.HAS_BEEN_ASSIGNED_TO_YOU
                            }

                            mail.sendmyMail(mailContent);
                        })
                        
                        
                        res.send({message: "Success"});
                    });
                }
            })
        })
    }).catch(err => console.log(err))
}

const getLatestTaskNumber = () =>{
    TaskNumber.findOne({}).exec(function(err, num){
        return num;
    }
    );
    
}

exports.getAllTasksByUser = (req, res) => {
    let userId = req.params.assignedUserId;
    console.log(userId);
    var taskQuery = Task.find({assignedUserId: userId}).populate("projectId");
    taskQuery.exec(function(err, docs){
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(docs !== null){
                console.log(docs);
                //var json = JSON.parse(docs);
                return res.status(200).json(docs);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.getAllTasksByProjectId = (req, res) => {
    let projectId = req.params.projectId;
    let taskStatus = req.params.taskStatus;

    console.log(projectId);
    console.log(taskStatus);
    let projId = mongoose.Types.ObjectId(projectId);
    console.log(projId); // added for ObjectId columns that has reference to another schema
    var taskQuery = Task.find({"projectId": mongoose.Types.ObjectId(projectId), statusId: taskStatus});
    taskQuery.exec(function(err, docs){
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(docs !== null){
               console.log(docs);
                let result = [];
                let sTaskType = "";
                let sTaskPriority = "";
                let sTaskStatus = "";
                //var json = JSON.parse(docs);
                docs.forEach(doc => {
                    sTaskType = getTaskType(doc.taskTypeId);
                    sTaskPriority = getPriority(doc.priorityId)
                    sTaskStatus = getStatus(doc.statusId)
                    result.push({id: doc.taskId, content: {taskId: doc.taskId, taskName: doc.taskName, taskType: sTaskType, taskPriority: sTaskPriority, taskStatus: sTaskStatus, statusId: doc.statusId }})
                })
                return res.status(200).json(result);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.updateTaskStatus = (req, res) => {
    let taskId = req.body.taskId;
    let statusId = req.body.statusId;

    Task.findOneAndUpdate({"taskId": taskId},{"$set":{"statusId": statusId, "updatedDateTime": Date.now()}})
    .exec(function(err, task){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        console.log(task);
        res.status(200).send({data: task, message: "Success"})
    })
}

exports.updateUserTaskId = async (req, res) => {
    let taskId = req.body.taskId;
    let userName = req.body.userName;
    let userId = req.body.userId;

    try{
        let task = await Task.findOneAndUpdate({"taskId": taskId},{"$set":{"assignedUserId": userId, "updatedDateTime": Date.now()}}).exec();
    
        let userAssigned = await User.findOne({_id: req.body.userId}).exec();
        console.log(userAssigned);
        const mailContent = {
            from: mailConstants.FROM_EMAIL_ID,
            to: userAssigned.email,
            subject:  taskId + ' : ' + task.taskName,
            text: mailConstants.TASK_ID + taskId + mailConstants.HAS_BEEN_ASSIGNED_TO_YOU
        }
        mail.sendmyMail(mailContent);

        console.log(task);
        res.status(200).send({data: task, message: "Success"})
    }
    catch(error){
        res.status(500).send({message: error});
                return;
    }
}

exports.getUserByTaskId = async (req,res) => {
    let taskId = req.params.taskid;
    try{

        let task = await Task.findOne({taskId: taskId}).exec();
        let user = await User.findOne({_id: task.assignedUserId}).exec();
        res.status(200).send({data: user.name, message: "Success"})        
    }
    catch(error){
        res.status(500).send({message: error});
    }
}

exports.updateTaskFromKanbanBoard = async (req, res) => {
    let taskId = req.body.taskId;
    let taskStatus = req.body.statusId;

    let statusName = getStatus(taskStatus);

    try{
        let task = await Task.findOneAndUpdate({"taskId": taskId},{"$set":{"statusId": taskStatus, "statusName":statusName, "updatedDateTime": Date.now()}}).exec()
 
        let userAssigned = await User.findOne({_id: task.assignedUserId}).exec();
         console.log(userAssigned);
 
         const mailContent = {
             from: mailConstants.FROM_EMAIL_ID,
             to: userAssigned.email,
             subject:  taskId + ' : ' + task.taskName,
             text: mailConstants.TASK_ID + taskId + mailConstants.HAS_BEEN_UPDATED 
         }
         
         mail.sendmyMail(mailContent);
 
         console.log("Hello");
         res.status(200).send({data: task, message: "Success"});
     }
     catch(error){
         res.status(500).send({message: error});
                 return;
     }
}