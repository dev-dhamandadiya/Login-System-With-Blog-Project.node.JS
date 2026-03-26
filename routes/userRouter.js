import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/register", userController.registerPage);
userRouter.post("/register", userController.createUser);

userRouter.get("/login", userController.loginPage);

// ✅ IMPORTANT LINE
userRouter.post("/login", userController.loginUser);

userRouter.get("/logout", userController.logout);

export default userRouter;