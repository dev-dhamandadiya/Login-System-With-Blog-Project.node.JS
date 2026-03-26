import { Router } from "express";
import blogController from "../controllers/blogController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", blogController.homePage);
router.get("/blog", auth, blogController.getAllBlogs);
router.get("/blog/:id", blogController.getSingleBlog);
router.get("/my-blogs", auth, blogController.myBlogs);

export default router;