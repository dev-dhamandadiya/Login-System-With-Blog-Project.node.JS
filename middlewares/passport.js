import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Configure local strategy
passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (!user) return done(null, false);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Serialize user id to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport;