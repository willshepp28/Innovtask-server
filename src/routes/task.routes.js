const express = require("express");

const router = express.Router();

router.get("/", async (request, response) => {
  response.status(200).json({ data: [{ id: 1, title: "up" }] });
});

module.exports = router;
