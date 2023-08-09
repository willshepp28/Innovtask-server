const authenticationRoutes = require('./authentication.routes');

function setupRoutes(application) {
  application.use('/authenticate', authenticationRoutes);
}

module.exports = {
  setupRoutes
};
