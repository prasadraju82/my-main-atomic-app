const controller = require("../controller/worklog");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/worklog/saveworklog", controller.saveWorkLog);

    app.get("/api/worklog/getworklogbytaskid/:taskid", controller.getWorkLogsByTaskId);

    app.get("/api/worklog/getworklogbyid/:worklogid", controller.getWorkLogById);

    app.post("/api/worklog/updateworklog", controller.updateWorkLog);

    app.get("/api/worklog/deleteworklogbyid/:worklogid", controller.deleteWorkLogById);
  };