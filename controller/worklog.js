const WorkLog = require("../model/worklog.js");

exports.saveWorkLog = (req,res) => {
    let taskId = req.body.taskId;
    let logComment = req.body.logcomment;
    let hoursLogged = req.body.loggedhours;
    let user = req.body.userId;
    let userName = req.body.userName;

    const worklog = new WorkLog({
        taskId: taskId,
        logComment: logComment,
        hoursLogged: hoursLogged,
        userId: user,
        isActive: true,
        userName: userName
    })

    worklog.save((err, worklogs) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.send({data: worklogs, message: "Success"});
    })
}

exports.getWorkLogsByTaskId = (req, res) => {

    let taskid = req.params.taskid;

    var taskQuery = WorkLog.find({taskId: taskid, isActive: true});
    taskQuery.exec(function(err, docs){
        console.log(docs);
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(docs !== null){
                return res.status(200).json(docs);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.getWorkLogById = (req, res) => {
    console.log(req.params)
    let worklogId = req.params.worklogid;
    console.log(worklogId);
    var taskQuery = WorkLog.findOne({_id: worklogId, isActive: true});
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
                return res.status(200).json(doc);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.updateWorkLog = (req,res) => {
    let worklogId = req.body.worklogId;
    let comment = req.body.comment;
    let logHours = req.body.logHours;

    WorkLog.findOneAndUpdate({"_id": worklogId},{"$set":{"logComment": comment, "hoursLogged": logHours}})
        .exec(function(err, worklog){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            console.log(worklog);
            res.status(200).send({data: worklog, message: "Success"})
    })
}

exports.deleteWorkLogById = (req, res) => {
    console.log(req.params);
    let worklogId = req.params.worklogid;

    WorkLog.findOneAndUpdate({"_id": worklogId},{"$set":{"isActive": false}})
        .exec(function(err, worklog){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            console.log(worklog);
            res.status(200).send({data: worklog, message: "Success"})
    })
}