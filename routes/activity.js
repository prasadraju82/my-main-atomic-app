const controller = require("../controller/activity");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/activity/saveactivity", controller.createActivity);

    app.get("/api/activity/getactivity/:taskid", controller.getActivitiesByTaskId);

    app.get("/api/activity/getactivitybyid/:activityId", controller.getActivityById);

    app.post("/api/activity/updateactivitybyid", controller.updateActivityById);

    app.get("/api/activity/deleteactivitybyid/:activityId", controller.deleteActivityById);
}