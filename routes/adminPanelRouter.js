import { Router } from "express";
import adminPanelController from "../controllers/adminPanelController.js";
import auth from "../middlewares/auth.js";
import imageUpload from "../middlewares/imageUpload.js";

const router = Router();

router.get("/add-blog", auth, adminPanelController.addBlogPage);

router.post("/add-blog", auth, imageUpload, adminPanelController.createBlog);

router.get("/edit-blog/:id", auth, adminPanelController.editBlogPage);

router.post("/edit-blog/:id", auth, adminPanelController.updateBlog);

router.post("/delete-blog/:id", auth, adminPanelController.deleteBlog);

export default router;