require('dotenv').config();
const express = require('express');
const { setupMiddlewares } = require('./middlewares');
const { setupRoutes } = require('./routes');

const application = express();
const PORT = process.env.PORT || 5001;

setupMiddlewares(application);
setupRoutes(application);

application.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
