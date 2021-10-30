const Role = require('../model/role.js');
const User = require('../model/user.js');

const checkDuplicateEmail = (req, res, next) => {
    
    console.log(req.body.emailId)
    User.findOne({
        email: req.body.emailId
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(200).send({ message: "Email Id is already in use!" });
            return;
        }

        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail
}

module.exports = verifySignUp;