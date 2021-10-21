const Activity = require("../model/activity.js");
const User = require("../model/user.js");

exports.createActivity = (req, res) => {
    let taskId = req.body.taskId;
    let comment = req.body.comment;
    let userId = req.body.userId;
    let commentDate = req.body.commentDate;
    let userName = req.body.userName

    console.log(req.body)
    const activity = new Activity({
        taskId: taskId,
        comment: comment,
        userId: userId,
        createdDateTime:commentDate,
        userName: userName,
        isActive: true
    })

    activity.save((err, act) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.send({data: act, message:"Success"});
    })
}

exports.getActivitiesByTaskId = (req, res) =>{
    console.log(req);
    let taskid = req.params.taskid;
    console.log(taskid)
    var taskQuery = Activity.find({taskId: taskid, isActive: true});

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
                console.log(docs);
                const act = docs.map(activity => ({

                })
                    
                )
                //var json = JSON.parse(docs);
                console.log(act);
                return res.status(200).json(docs);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.getActivityById = (req, res) => {
    let activityId = req.params.activityId;

    var taskQuery = Activity.findOne({_id: activityId});

    taskQuery.exec(function(err, doc){
       // console.log(docs);
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(doc !== null){
                console.log(doc);
                return res.status(200).json(doc);
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.updateActivityById = (req, res) => {
    let activityId = req.body.activityId;
    let comment = req.body.comment;

    Activity.findOneAndUpdate({"_id": activityId},{"$set":{"comment": comment, "updatedDateTime": Date.now()}})
        .exec(function(err, task){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            console.log(task);
            res.status(200).send({data: task, message: "Success"})
    })
}

exports.deleteActivityById = (req, res) => {
    let activityId = req.params.activityId;
    //let comment = req.body.comment;
    console.log(activityId);
    Activity.findOneAndUpdate({"_id": activityId},{"$set":{"isActive": false}})
        .exec(function(err, task){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            console.log(task);
            res.status(200).send({data: task, message: "Success"})
    })
}