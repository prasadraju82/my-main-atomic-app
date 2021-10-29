const Project = require("../model/projects.js");
const User = require("../model/user.js");

exports.getProjectsByUser = (req, res) => {
    
    let emailid = req.params.emailid;
   
    console.log(req.params);
    var userQuery = Project.find({userEmail: emailid}).populate("userId");
    console.log('Test')
    userQuery.exec(function(err, docs){
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
};

exports.getAllProjects = (req, res) => {
    
    var userQuery = Project.find({}).populate("userId");
    console.log('Test')
    userQuery.exec(function(err, docs){
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

exports.createProject = (req, res) =>{
    const project = new Project({
        projectName: req.body.projectName,
        projectDesc: req.body.projectDesc,
        projectKey: req.body.projectKey,
        projectType: req.body.projectType,
        userId: req.body.userId,
        createdDateTime: Date.Now
    }) 

    Project.create(project).then(function(project){
        res.send({data: project, message: "Success"})
    }).catch(function(err){
        res.status(500).send({error: err, message: "Failure"})
    })
}

exports.getProjectByKey = (req, res) =>{
    let projectKey = req.params.projectKey;
    console.log(projectKey);
    var taskQuery = Project.findOne({projectKey: projectKey}).populate("userId");
    console.log(taskQuery);
    taskQuery.exec(function(err, project){
        if(err){
            console.log(err);
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(project != null){
                res.status(200).json(project)
            }
            else{
                return res.status(200).json([]);
            }
        }
    })
}

exports.updateProjectByKey = (req, res) => {
    let projectName = req.body.projectName;
    let projectDesc = req.body.projectDesc;
    let projectKey = req.body.projectKey;
    let projectType = req.body.projectType;
    let userId = req.body.userId;
    let createdDateTime = Date.Now;

    console.log(userId);
    console.log(projectKey)
    Project.findOneAndUpdate({"projectKey": projectKey},{"$set":{"projectName": projectName, "projectDesc": projectDesc, "projectType": projectType, "userId": userId, "updatedDateTime": Date.now()}})
        .exec(function(err, proj){
            if(err){
                console.log(err)
                res.status(500).send({message: err});
                return;
            }
            console.log(proj);
            res.status(200).send({data: proj, message: "Success"})
    })
}