const controller = require("../controller/tasks");
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
  
    app.get("/api/tasks/recenttaskslist/:assignedUserId",authJwt.verifyToken, controller.getRecentTasksByUser);

    app.get("/api/tasks/gettaskbyid/:taskId",authJwt.verifyToken, controller.getTaskByTaskId);

    app.post("/api/tasks/updatetaskbytaskid",[authJwt.verifyToken, validateinput.ValidateUpdateTask], controller.updateTaskByTaskId);

    app.post("/api/tasks/createtask",[authJwt.verifyToken, validateinput.ValidateCreateTask] , controller.createTask);

    app.get("/api/tasks/alltaskslist/:assignedUserId",authJwt.verifyToken, controller.getAllTasksByUser);

    app.get("/api/tasks/alltasksbyprojectid/:projectId/:taskStatus",authJwt.verifyToken, controller.getAllTasksByProjectId);

    app.post("/api/tasks/updatetaskstatus",authJwt.verifyToken, controller.updateTaskStatus);

    app.post("/api/tasks/updateuserbytaskid",authJwt.verifyToken, controller.updateUserTaskId);

    app.get("/api/tasks/getuserbytaskid/:taskid",authJwt.verifyToken, controller.getUserByTaskId);
  };