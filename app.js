require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const passport = require('./config/passport.js');
const notesRoutes = require('./routes/notesRoutes.js');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3002;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000, // Limit each IP to 3000 requests per windowMs
});

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
app.use('/auth', limiter, authRoutes);

app.use(passport.initialize());

app.use(
  '/api',
  limiter,
  passport.authenticate('jwt', { session: false }),
  notesRoutes
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
