import { Router } from "express";
import adminRouter from "./adminPanelRouter.js";
import authRouter from "./authRouter.js";
import blogModel from "../models/blogModel.js";

const router = Router();

// Homepage (SHOW BLOGS)
router.get("/", async (req, res) => {
    const blogs = await blogModel.find().populate("user", "username");

    res.render("index", {
        blogs,
        user: req.user
    });
});

// Admin Routes
router.use("/admin", adminRouter);

// Auth Routes
router.use("/", authRouter);

export default router;