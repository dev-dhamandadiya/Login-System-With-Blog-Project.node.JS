import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const userController = {

  // login page
  loginPage(req, res) {
    res.render("pages/login");
  },

  // register page
  registerPage(req, res) {
    res.render("pages/register");
  },

  // register user
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const hash = await bcrypt.hash(password, 10);

      await UserModel.create({
        username,
        email,
        password: hash
      });

      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  },

  // logout
  logoutUser(req, res) {
    req.logout(() => {
      res.redirect("/login");
    });
  }

};

export default userController;