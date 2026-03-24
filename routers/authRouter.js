import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "passport";

const authRouter = Router();

// register
authRouter.get("/register", userController.registerPage);
authRouter.post("/register", userController.registerUser);

// login
authRouter.get("/login", userController.loginPage);
authRouter.post("/login",
  passport.authenticate("local", {
    successRedirect: "/admin/add-blog",   // 👈 go to add blog page
    failureRedirect: "/login"
  })
);
// logout
authRouter.get("/logout", userController.logoutUser);

export default authRouter;