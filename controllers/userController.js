import userModel from "../models/userModel.js";
import passport from "passport";

const userController = {

  // ================= REGISTER PAGE =================
  registerPage(req, res) {
    res.render("pages/register");
  },

  // ================= LOGIN PAGE =================
  loginPage(req, res) {
    res.render("pages/login");
  },

  // ================= CREATE USER =================
  async createUser(req, res) {
    try {
      const { username, email, password, confirmpassword } = req.body;

      // Password match check
      if (password !== confirmpassword) {
        return res.redirect("/register");
      }

      // Check existing user
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.redirect("/register");
      }

      // Create user (password hashed automatically)
      await userModel.create({ username, email, password });

      // Redirect to login
      res.redirect("/login");

    } catch (error) {
      console.log(error);
    }
  },

  // ================= LOGIN USER (PASSPORT) =================
  loginUser(req, res, next) {
  console.log("BODY:", req.body);

  passport.authenticate("local", (err, user) => {
    console.log("USER:", user); // 👈 add this

    if (err) return next(err);

    if (!user) {
      console.log("LOGIN FAILED");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      console.log("LOGIN SUCCESS"); // 👈 add this

      return res.redirect("/blog");
    });
  })(req, res, next);
},

  // ================= LOGOUT =================
  logout(req, res) {
    req.logout(() => {
      res.redirect("/");
    });
  }

};

export default userController;