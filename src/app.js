require('dotenv').config();
const express = require('express');
const { User } = require("../models");
const { setupMiddlewares } = require('./middlewares');
const { setupRoutes } = require('./routes');

const application = express();
const PORT = process.env.PORT || 5001;

setupMiddlewares(application);
setupRoutes(application);

// // Signup route here...
// application.get("/", async(request, response) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['firstName', 'lastName'],
//     }); 
//     response.json({ success: true, data: users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     response.status(500).json({ success: false, message: "Error fetching users." });
//   }
// })

application.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
