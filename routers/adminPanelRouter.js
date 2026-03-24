import { Router } from "express";
import adminPanelController from "../controllers/adminPanelController.js";
import auth from "../middlewares/userAuth.js";
import imageUpload from "../middlewares/imageUpload.js";

const adminRouter = Router();

// Dashboard
adminRouter.get("/", auth, adminPanelController.adminDashboard);

// Add Blog
adminRouter.get("/add-blog", auth, adminPanelController.addBlogPage);
adminRouter.post("/add-blog", imageUpload, adminPanelController.addBlog);

// My Blogs
adminRouter.get("/my-blogs", auth, adminPanelController.myBlogsPage);

// All Blogs
adminRouter.get("/all-blogs", auth, adminPanelController.allBlogsPage);

// Edit Blog
adminRouter.get("/edit-blog/:id", auth, adminPanelController.editBlogPage);
adminRouter.post("/edit-blog/:id", auth, imageUpload, adminPanelController.editBlog);

// Delete Blog
adminRouter.get("/delete-blog/:id", auth, adminPanelController.deleteBlog);

export default adminRouter;