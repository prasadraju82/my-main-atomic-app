const controller = require("../controller/activity");
const authJwt = require("../middlewares/authJwt");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/activity/saveactivity",authJwt.verifyToken, controller.createActivity);

    app.get("/api/activity/getactivity/:taskid",authJwt.verifyToken, controller.getActivitiesByTaskId);

    app.get("/api/activity/getactivitybyid/:activityId",authJwt.verifyToken, controller.getActivityById);

    app.post("/api/activity/updateactivitybyid",authJwt.verifyToken, controller.updateActivityById);

    app.get("/api/activity/deleteactivitybyid/:activityId",authJwt.verifyToken, controller.deleteActivityById);
}