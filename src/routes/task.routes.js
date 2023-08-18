const express = require("express");
const { Task, Subtask } = require("../../models");
const { authenticateJWT } = require("../middlewares");

const router = express.Router();

router.get("/", authenticateJWT, async (request, response) => {
  const userId = request.user.id;

  const tasks = await Task.findAll({
    where: { userId: userId },
  });

  response.status(200).json(tasks);
});

router.post("/", authenticateJWT, async (request, response) => {
  const { title, description, priority } = request.body;
  const userId = request.user.id;

  try {
    const newTask = await Task.create({
      title,
      description,
      priority,
      userId,
    });

    response.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    response.status(500).json({ message: "Error creating task" });
  }
});

router.get("/:taskId/subtasks", authenticateJWT, async (request, response) => {
  const userId = request.user.id;
  const taskId = request.params.taskId;

  try {
    // Fetch the task with the specified taskId
    const task = await Task.findOne({
      where: { userId: userId, id: taskId },
      attributes: ["title"], // Only retrieve the title attribute
    });

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    // Fetch all subtasks that belong to the specified task
    const subtasks = await Subtask.findAll({
      where: { taskId: taskId },
    });

    response.status(200).json({ taskTitle: task.title, subtasks });
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    response.status(500).json({ message: "Error fetching subtasks" });
  }
});

module.exports = router;
