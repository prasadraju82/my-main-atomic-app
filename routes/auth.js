const controller = require("../controller/auth");
const verifySignUp = require("../middlewares/verifySignUp")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/auth/signup",verifySignUp.checkDuplicateEmail,controller.signUp);
  
    app.post("/api/auth/checkuser", controller.checkuser);

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/savepassword", controller.savepassword);

    app.get("/api/auth/getusers/:username", controller.getUsers);
  };