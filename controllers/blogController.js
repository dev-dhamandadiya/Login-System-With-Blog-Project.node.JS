import blogModel from "../models/blogModel.js";

const blogController = {

  // Home Page (latest blogs)
  async homePage(req, res) {
    const blogs = await blogModel.find().populate("user").sort({ createdAt: -1 });
    res.render("index", { blogs });
  },

  // All Blogs Page
  async getAllBlogs(req, res) {
    const blogs = await blogModel.find().populate("user").sort({ createdAt: -1 });
    res.render("pages/blog", { blogs });
  },

  // Single Blog
  async getSingleBlog(req, res) {
    const blog = await blogModel.findById(req.params.id).populate("user");
    res.render("pages/singleBlog", { blog });
  },

  // My Blogs
  async myBlogs(req, res) {
    const blogs = await blogModel.find({ user: req.user._id });
    res.render("pages/myBlogs", { blogs });
  }

};

export default blogController;