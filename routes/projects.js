const controller = require("../controller/projects");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/projects/projectlist/:emailid", controller.getProjectsByUser);

    app.get("/api/projects/getallprojects", controller.getAllProjects);

    app.post("/api/projects/createproject", controller.createProject);

    app.get("/api/projects/getprojectbykey/:projectKey", controller.getProjectByKey);

    app.post("/api/projects/updateproject", controller.updateProjectByKey);
  };