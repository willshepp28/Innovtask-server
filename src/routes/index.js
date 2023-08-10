const authenticationRoutes = require("./authentication.routes");
const taskRoutes = require("./task.routes");

function setupRoutes(application) {
  application.use("/authenticate", authenticationRoutes);
  application.use("/tasks", taskRoutes);
}

module.exports = {
  setupRoutes,
};
