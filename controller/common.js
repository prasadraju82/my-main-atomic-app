var db = require("../models");
const User = require("../model/user.js");

exports.getTaskWithUsers = (req, res) =>{
    let taskId = req.params.taskId;
    let _emailId = "prasadraju82@gmail.com";

    db.ProjectTask.findOne({taskId: taskId}, function(err, task){
        if(!err && task){
            console.log(task.assignedUserId)
            db.User.findOne({_id: task.assignedUserId}).exec(function(err, user){
                task.assignedUserId = user.name;
                task.creatorUserId = user.name;
                res.json(task)
            })
        }
    })

    // User.findOne({email: _emailId}).exec(function(err,test){
    //     console.log('werty')
    // })

    // db.ProjectTask.findOne({taskId: taskId})
    // .populate("user").exec(function(err,task){
    //     task.taskId = 'PPP'
    //     res.json(task)
    // });
}