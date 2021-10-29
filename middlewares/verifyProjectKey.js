const Project = require('../model/projects.js');

const checkDuplicateProjectKey = (req, res, next) => {
    Project.findOne({
         projectKey: req.body.projectKey
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(200).send({ message: "Duplicate Project Key" });
            return;
        }

        next();
    });
};

const verifyProjectKey = {
    checkDuplicateProjectKey
}

module.exports = verifyProjectKey;