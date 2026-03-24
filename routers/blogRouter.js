import { Router } from "express";
import blogController from "../controllers/blogController.js";
import imageUpload from "../middlewares/imageUpload.js";
import auth from "../middlewares/userAuth.js";

const blogRouter = Router();

// Create blog
blogRouter.get("/create-blog", auth, blogController.createBlogPage);
blogRouter.post("/create-blog", auth, imageUpload, blogController.createBlog);

// View blog
blogRouter.get("/view/:id", blogController.viewBlog);

// Edit blog
blogRouter.get("/edit/:id", auth, blogController.editBlog);
blogRouter.post("/update/:id", auth, imageUpload, blogController.updateBlog);

// Delete blog
blogRouter.get("/delete/:id", auth, blogController.deleteBlog);

// My blogs
blogRouter.get("/my-blog", auth, blogController.myBlog);

export default blogRouter;