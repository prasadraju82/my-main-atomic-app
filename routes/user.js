const controller = require("../controller/user");
const verifySignUp = require("../middlewares/verifySignUp")
const authJwt = require("../middlewares/authJwt");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/users/adduser",[authJwt.verifyToken, verifySignUp.checkDuplicateEmail], controller.addUser);

    app.get("/api/users/getallusers", authJwt.verifyToken, controller.getAllUsers);

    app.get("/api/users/getuserbyid/:emailid", authJwt.verifyToken, controller.getUserById);

    app.post("/api/users/updateuser", authJwt.verifyToken, controller.updateUser);

    app.get("/api/users/deleteuserbyid/:emailid", authJwt.verifyToken, controller.deleteUser);

    app.post("/api/users/activateuser", controller.activateUser);
}