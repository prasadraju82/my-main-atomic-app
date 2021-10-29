const User = require('../model/user.js');

const validateTaskCreateInput = (req, res, next) => {
    try{
        if(req.body.taskName !== "" && req.body.taskType !== "0" && req.body.taskType !== '' 
            && req.body.projectId !== "" && req.body.projectId !== "0" && req.body.userName !== "" 
            && req.body.estimatedTime !== "" ){
            next();
        }
        else{
            return res.status(401).send({message: "Invalid Input"});
        }
    }
    catch(error){
        return res.status(401).send({message: error});
    }
}

const validateTaskEditInput = (req, res, next) => {
    try{
        if(req.body.taskName !== "" && req.body.taskType !== "0" && req.body.taskType !== '' 
            && (req.body.taskType === "1" || req.body.taskType === "2" || 
                req.body.taskType === "3" || req.body.taskType === "4" || req.body.taskType === "5")){

            next();
        }
        else{
            return res.status(401).send({message: "Invalid Input"});
        }
    }
    catch(error){
        return res.status(401).send({message: error});
    }
}

const validateSignUpInput = (req, res, next) => {
    try{
        console.log(req.body);
        
        if(req.body.name !== "" && (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.emailId)) && req.body.gender !== "N" && req.body.gender !== '' 
            && req.body.password !== "" && (req.body.gender.toUpperCase() === "MALE" || req.body.gender.toUpperCase() === "FEMALE")){
                next();
        }
        else{
            return res.status(401).send({message: "Invalid Input"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(401).send({message: error});
    }
}

const validateCreateProject = (req, res, next) => {
    try{
        if(req.body.projectName !== "" && req.body.projectType !== "0" && req.body.projectType !== '' 
            &&(req.body.projectType === "1" || req.body.projectType === "2" || req.body.projectType === "3") 
            && req.body.projectKey !== ""){
            next();
        }
        else{
            return res.status(401).send({message: "Invalid Input"});
        }
    }
    catch(error){
        return res.status(401).send({message: error});
    }
    
}

const validateUpdateProject = (req, res, next) =>{
    try{
        if(req.body.projectName !== "" && req.body.userId !== "" 
            &&(req.body.projectType === "1" || req.body.projectType === "2" || req.body.projectType === "3") ){
            next()
        }
        else{
            return res.status(401).send({message: "Invalid Input"});
        }
    }
    catch(error){
        return res.status(401).send({message: error});
    }
    
}

const ValidateCreateTask = (req, res, next) => {
    try{
        if(req.body.taskName !== "" && (req.body.taskTypeId === "1" || req.body.taskTypeId === "2" || req.body.taskTypeId === "3" 
            || req.body.taskTypeId === "4" || req.body.taskTypeId === "5") && req.body.projectId !== "" && req.body.projectId !== "0" 
            && req.body.assignedUserId !== "" && req.body.estimatedTime !== "" && (req.body.priorityId === "1" ||req.body.priorityId === "2" 
            || req.body.priorityId === "3" ||req.body.priorityId === "4") && req.body.creatorUserId != ""){
                next();
            }
            else{
                return res.status(401).send({message: "Invalid Input"});
            }
    }
    catch(error){
        return res.status(401).send({message: error});
    }
}


const ValidateUpdateTask = (req, res, next) => {
    try{
        if(req.body.taskName !== "" && (req.body.taskTypeId === "1" || req.body.taskTypeId === "2" || req.body.taskTypeId === "3" 
            || req.body.taskTypeId === "4" || req.body.taskTypeId === "5") && req.body.projectId !== "" && req.body.projectId !== "0" 
            && req.body.updatedById !== "" && (req.body.priorityId === "1" ||req.body.priorityId === "2" || req.body.priorityId === "3" 
            || req.body.priorityId === "4") && (req.body.statusId === "1" || req.body.statusId === "2" || req.body.statusId === "3"
            || req.body.statusId === "4" || req.body.statusId === "5" || req.body.statusId === "6")){
                next();
            }
            else{
                return res.status(401).send({message: "Invalid Input"});
            }
    }
    catch(error){
        return res.status(401).send({message: error});
    }
}
const validateinput = {
    validateTaskCreateInput,
    validateTaskEditInput,
    validateSignUpInput,
    validateCreateProject,
    validateUpdateProject,
    ValidateCreateTask,
    ValidateUpdateTask
};

module.exports = validateinput;