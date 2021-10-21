const controller = require("../controller/user");
const verifySignUp = require("../middlewares/verifySignUp")

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/users/adduser", verifySignUp.checkDuplicateEmail, controller.addUser);

    app.get("/api/users/getallusers", controller.getAllUsers);

    app.get("/api/users/getuserbyid/:emailid", controller.getUserById);

    app.post("/api/users/updateuser", controller.updateUser);

    app.get("/api/users/deleteuserbyid/:emailid", controller.deleteUser);
}