const controller = require("../controller/tasks");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/tasks/recenttaskslist/:assignedUserId", controller.getRecentTasksByUser);

    app.get("/api/tasks/gettaskbyid/:taskId", controller.getTaskByTaskId);

    app.post("/api/tasks/updatetaskbytaskid", controller.updateTaskByTaskId);

    app.post("/api/tasks/createtask", controller.createTask);

    app.get("/api/tasks/alltaskslist/:assignedUserId", controller.getAllTasksByUser);

    app.get("/api/tasks/alltasksbyprojectid/:projectId/:taskStatus", controller.getAllTasksByProjectId);

    app.post("/api/tasks/updatetaskstatus", controller.updateTaskStatus);

    app.post("/api/tasks/updateuserbytaskid", controller.updateUserTaskId);

    app.get("/api/tasks/getuserbytaskid/:taskid", controller.getUserByTaskId);
  };