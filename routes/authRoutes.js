const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');

// Route to register a new user
router.post('/signup', authController.registerUser);

// Route to log in a user
router.post('/login', authController.loginUser);

module.exports = router;
