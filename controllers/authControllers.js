const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userValSchema = require('../Validations/userValidations');

/**
 * Register a new user.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response indicating success or failure.
 */
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Checking for Validations using Joi
    const { error } = userValSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Validate password complexity
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          'Password must be 8 characters long and must contain at least one capital letter, one special character, and one number.',
      });
    }

    const lowerCaseUsername = username.toLowerCase();

    // Taking username and password and checking if user already exists or not
    const existingUser = await User.findOne({ username: lowerCaseUsername });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hashing password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);

    // Creating newUser using mongoose model
    const newUser = await User.create({
      username: lowerCaseUsername,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    // Handle other types of errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: { $regex: new RegExp(username, 'i') },
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid Credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: '3650d',
    });

    res.status(200).json({
      message: 'login successful',
      token,
      _id: user._id,
      username,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(400).json({ error: 'Login failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
