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

router.post("/", authenticateJWT, async(request, response) => {
  const { title, description, priority } = request.body;
  const userId = request.user.id;

  try {
    const newTask = await Task.create({
      title,
      description,
      priority,
      userId
    })

    response.status(401).json(newTask);
  } catch(error) {
    console.error("Error creating task:", error);
    response.status(500).json({ message: "Error creating task" });
  }
})


module.exports = router;
