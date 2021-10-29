const controller = require("../controller/projects");
const verifyProjectKey = require("../middlewares/verifyProjectKey");
const authJwt = require("../middlewares/authJwt");
const validateinput = require("../middlewares/validateinputs")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/projects/projectlist/:emailid",authJwt.verifyToken, controller.getProjectsByUser);

    app.get("/api/projects/getallprojects", authJwt.verifyToken, controller.getAllProjects);

    app.post("/api/projects/createproject",[authJwt.verifyToken, validateinput.validateCreateProject, verifyProjectKey.checkDuplicateProjectKey], controller.createProject);

    app.get("/api/projects/getprojectbykey/:projectKey",authJwt.verifyToken, controller.getProjectByKey);

    app.post("/api/projects/updateproject",[authJwt.verifyToken, validateinput.validateUpdateProject] , controller.updateProjectByKey);
  };