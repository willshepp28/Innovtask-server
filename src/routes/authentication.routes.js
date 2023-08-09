const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../../models");

const router = express.Router();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

router.post('/signup', async (request, response) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: request.body.email } });
        if (existingUser) {
            return response.status(400).json({ success: false, message: 'Email already in use.' });
        }

        // Hash the password and create user
        const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);
        const user = await User.create({
            email: request.body.email,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            password: hashedPassword
        });

        // Create a JWT
        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: '14d'  // Token expiration time. Adjust as needed.
        });

        response.status(201).json({ success: true, token: token });

    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;
