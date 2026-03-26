import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      console.log("LOGIN EMAIL:", email);

      const user = await userModel.findOne({ email });

      console.log("DB USER:", user);

      if (!user) {
        console.log("❌ User not found");
        return done(null, false);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      console.log("PASSWORD MATCH:", isMatch);

      if (!isMatch) {
        console.log("❌ Wrong password");
        return done(null, false);
      }

      console.log("✅ LOGIN SUCCESS");

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;