const config = require("../config/auth.js");
const User = require("../model/user.js");
const Role = require("../model/role.js");
const mail = require("../utility/mail/mail.js");
const mailConstants = require("../constants/mailconstants")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signUp = (req, res, next) =>{
    //console.log(req);
    console.log(req.body.password);
    let pwd = bcrypt.hashSync(req.body.password, 8);
    //console.log(req.body.password);
    console.log(pwd);
    const user = new User({
        name: req.body.name,
        email: req.body.emailId,
        password: pwd,
        gender: req.body.gender,
        isInitialLogin: false,
        isActive: false,
        role: 1
    });

    user.save((err, userdetails) => {
        if(err){
            res.status(500).message({message: err});
            return;
        }
        console.log(req.body.emailId);
        //send mail
        const mailContent = {
            from: mailConstants.FROM_EMAIL_ID,
            to: req.body.emailId,
            subject:  "Welcome mail from Atomic",
            html: mailConstants.THANK_YOU + "<br/>" + "<a href='" + mailConstants.ATOMIC_LINK + req.body.emailId + "'>" + mailConstants.CONFIRM_EMAIL + "</a>"
        }
        
        console.log(mailContent);
        mail.sendmyMail(mailContent);
        res.status(200).send({message: "Successful"});
    });
};

exports.checkuser = (req, res) => {
    let emailid = req.body.emailId;
    let password = req.body.password;
    let emailExist = false;
    console.log(emailid);
    
    
    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailid))) {
        return res.status(200).send({
            isEmailExist: false,
            message: "Invalid Email Id"
        })
    }
    
    var userQuery = User.findOne({email: emailid});
    userQuery.exec(function(err, docs){
        if(err){
            console.log(err);
            return res.status(500).send({
                isEmailExist: false,
                message: err
            });
        }
        else{
            if(docs !== null){
               console.log(docs.email);
                return res.status(200).send({
                    isEmailExist: true,
                    isFirstTimeUser: docs.isInitialLogin
                });
            }
            else{
                return res.status(200).send({
                    isEmailExist: false
                });
            }
        }
    })
}

exports.signin = (req, res) => {
    let emailid = req.body.emailId;
    let password = req.body.password;
    console.log(emailid);
    console.log(password);
    var userQuery = User.findOne({email: emailid});
    userQuery.exec(function(err, docs){
        if(err){
            return res.status(500).send({
                message: err
            });
        }
        else{
            if(docs !== null){
                console.log(docs);

                if(bcrypt.compareSync(password, docs.password)){
                    console.log('Yes');

                    var token = jwt.sign({ id: emailid }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    return res.status(200).send({
                        message:"Success",
                        name: docs.name,
                        email: docs.email,
                        role: docs.role,
                        accessToken: token,
                        id: docs._id
                    });
                }
                else{
                    return res.status(200).send({
                        accessToken: null,
                        message:"Failure"
                    });
                }
            }
        }
    })
}

exports.savepassword = (req, res) =>{
    let emailid = {email: req.body.emailId};
    
    //console.log(password);
    let pwd = bcrypt.hashSync(req.body.password, 8);
    console.log(pwd);

    let password = {password: pwd, isInitialLogin: false} ;
    try{
        let doc = User.findOneAndUpdate(emailid, password, {
            new: true
        });
        doc.then(t => {
            return res.status(200).send({
                message:"Success"
            })
        }).catch(t => {
            return res.status(400).send({
                message:"Failure"
            })
        });
        // console.log(doc);
        // console.log(doc.password);
        // if(doc.password === pwd){
        //     return res.status(200).send({
        //         message:"Success"
        //     });
        // }
        // else{
        //     return res.status(200).send({
        //         message:"Failure"
        //     });
        // }
    }
    catch{
        return res.status(400).send({
            message:"Failure"
        });
    }
}

exports.getUsers = (req, res) => {
    let userName = req.params.username;
    console.log(userName)
    var userQuery = User.find({"name":{$regex: '.*' + userName + '.*'}});
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