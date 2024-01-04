const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/userSchema');

const secretKey = process.env.SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    // Find the user by username (based on the payload data)
    const user = await User.findOne({ username: payload.username });
    if (user) {
      // If the user is found, pass it to the next middleware
      return done(null, user);
    } else {
      // If the user is not found, return 'false' indicating authentication failure
      return done(null, false);
    }
  } catch (error) {
    // If there is an error, return it with 'false' indicating authentication failure
    return done(error, false);
  }
});

passport.use(jwtStrategy);

module.exports = passport;
