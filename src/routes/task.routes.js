const express = require("express");
const { Task } = require("../../models");
const { authenticateJWT } = require("../middlewares");

const router = express.Router();


router.get("/", authenticateJWT, async (request, response) => {
  const userId = request.user.id;

  const tasks = Task.findAll({ 
    where: { userId: userId }
  });

  response.status(200).json(tasks);
});

module.exports = router;
