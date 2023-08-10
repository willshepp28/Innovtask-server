const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.post("/signup", async (request, response) => {
  try {
    const existingUser = await User.findOne({
      where: { email: request.body.email },
    });
    if (existingUser) {
      return response
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }

    const newUser = await User.create({
      email: request.body.email,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
    });

    response
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error during signup:", error);
    response
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ where: { email: request.body.email } });
    if (!user) {
      return response
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    if (!user.validPassword(request.body.password)) {
      return response
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "14d", // Token expiration time. Adjust as needed.
    });

    response.status(200).json({ success: true, token: token });
  } catch (error) {
    console.error("Error during login:", error);
    response
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
