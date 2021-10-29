const User = require("../model/user.js");
const mail = require("../utility/mail/mail.js")
const mailConstants = require("../constants/mailconstants")

exports.addUser = (req, res) => {
    const user = new User({
        name: req.body.userName,
        email: req.body.emailId,
        gender: req.body.gender,
        isInitialLogin: true,
        isActive: true,
        role: req.body.userRole,
        createdUser: req.body.createdUser,
        createdDate: Date.Now,
        updatedUser: req.body.createdUser,
        updateddate: Date.Now
    }) 

    const mailContent = {
        from: 'hi2alldears@gmail.com',
        to: req.body.emailId,
        subject: 'You have been added to the Atomic team',
        text: 'Log in to http://localhost:3000 with your email id'
    }
    console.log(user);
    User.create(user).then(function(userdetails){

        //mail send
        //Send mail
        const mailContent = {
            from: mailConstants.FROM_EMAIL_ID,
            to: req.body.userEmail,
            subject: mailConstants.YOU_HAVE_BEEN_ADDED,
            text: mailConstants.LOGGIN_TO
        }
        mail.sendmyMail(mailContent);
        res.send({data: userdetails, message: "Success"})
    }).catch(function(err){
        console.log(err);
        res.status(500).send({error: err, message: "Failure"})
    })
}

exports.getAllUsers = (req, res) => {
    
    var userQuery = User.find({isActive:true});
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

exports.getUserById = (req, res) => {
    userEmail = req.params.emailid;
    console.log(userEmail);
    var userQuery = User.findOne({email: userEmail});
    console.log('Test')
    userQuery.exec(function(err, doc){
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

exports.updateUser = (req, res) => {

       let name = req.body.userName;
       let email = req.body.emailId;
       let gender = req.body.gender;
       let role = req.body.userRole;
       let updatedUser = req.body.updatedUser;
        // updateddate: Date.Now
    
    User.findOneAndUpdate({"email": email},{"$set":{"name": name, "role": role, "gender": gender, "updatedUser": updatedUser, "updatedDateTime": Date.now()}})
    .exec(function(err, user){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        console.log(user);
        res.status(200).send({data: user, message: "Success"})
    })
}

exports.deleteUser = (req, res) => {
    let userEmail = req.params.emailid;
    console.log(userEmail);
    User.findOneAndUpdate({"email": userEmail},{"$set":{ "isActive": false }})
    .exec(function(err, user){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({data: user, message: "Success"})
    })
}

exports.activateUser = (req, res) => {
    let userEmail = req.body.emailid;
    console.log(userEmail);
    User.findOneAndUpdate({"email": userEmail},{"$set":{ "isActive": true }})
    .exec(function(err, user){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({data: user, message: "Success"})
    })
}