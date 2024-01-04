require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const passport = require('./config/passport.js');
const notesRoutes = require('./routes/notesRoutes.js');

const app = express();
const PORT = 3002;

const DB_URI = process.env.DB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to db at, ' + DB_URI);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//health check route
app.get('/health', (req, res) => {
  console.log('server is running healthy');
  res.status(200).json({ message: 'Server is healthy' });
});

//User signup/login route
app.use('/auth', authRoutes);

app.use(passport.initialize());

// JWT-protected route
app.use(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('All todos here');
    res.status(200).json({ message: 'todos' });
  }
);

app.use('/api', passport.authenticate('jwt', { session: false }), notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
