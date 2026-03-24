import blogModel from "../models/blogModel.js";
import fs from "fs";

const blogController = {
  async createBlogPage(req, res) {
    res.render("pages/createBlog", { user: req.user || null });
  },

 async createBlog(req, res) {
    try {
        const { title, content, excerpt, tags } = req.body;

        let image = "";

        if (req.file) {
            image = "uploads/" + req.file.filename;
        }

        const blog = await Blog.create({
            title,
            content,
            excerpt,
            tags,
            image,
            user: req.user?._id
        });

        console.log("BLOG CREATED:", blog);

        return res.redirect("/admin/my-blogs");

    } catch (error) {
        console.log(error);
        res.send("Error creating blog");
    }
},

  async viewBlog(req, res) {
    try {
      const blog = await blogModel.findById(req.params.id);

      res.render("pages/viewBlog", {
        blog,
        user: req.user || null,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async addBlog(req, res) {
    try {
        const newBlog = await blogModel.create({
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.path : null,
            user: req.user?._id
        });

        console.log("Blog Saved:", newBlog);

        res.redirect('/admin/my-blogs');

    } catch (err) {
        console.log("Error:", err);
        res.send("Error adding blog");
    }
},

  async editBlog(req, res) {
    try {
      const blog = await blogModel.findById(req.params.id);

      res.render("pages/editBlog", {
        blog,
        user: req.user || null,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async deleteBlog(req, res) {
    try {
      const id = req.params.id;
      const blog = await blogModel.findById(id);

      if (blog.image) {
        try {
          fs.unlinkSync("uploads/" + blog.image);
        } catch {
          console.log("Image not found");
        }
      }

      await blogModel.findByIdAndDelete(id);

      return res.redirect("/blog/my-blog");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/blog/my-blog");
    }
  },

  async updateBlog(req, res) {
    try {
      const id = req.params.id;
      const blog = await blogModel.findById(id);

      if (req.file) {
        try {
          fs.unlinkSync("uploads/" + blog.image);
        } catch {
          console.log("Old image not found");
        }

        req.body.image = req.file.filename;
      }

      await blogModel.findByIdAndUpdate(id, req.body);

      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  },
async myBlog(req, res) {
    try {
        const blogs = await Blog.find({ user: req.user._id });

        res.render("pages/myBlogs", { blogs });

    } catch (error) {
        console.log(error);
    }
},

  async allBlogsPage(req, res) {
    const blogs = await blogModel
        .find()
        .populate('user', 'username');

    res.render('./pages/all-blogs', { blogs });
},
};

export default blogController;