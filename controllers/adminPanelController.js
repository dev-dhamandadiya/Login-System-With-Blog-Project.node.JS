import blogModel from "../models/blogModel.js";
import fs from "fs";

const adminPanelController = {

    // Dashboard
    adminDashboard(req, res) {
        res.render("index", { user: req.user });
    },

    // Show Add Blog Page
    addBlogPage(req, res) {
        res.render("./pages/add-blog");
    },

    // Add Blog
  async addBlog(req, res) {
    try {
        console.log("USER:", req.user); // debug

        const blog = await blogModel.create({
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.path : null,
            user: req.user._id   // 👈 IMPORTANT
        });

        console.log("BLOG SAVED:", blog);

        res.redirect("/admin/my-blogs"); // 👈 show list after add

    } catch (err) {
        console.log(err);
        res.send("Error adding blog");
    }
},

    // My Blogs
    async myBlogsPage(req, res) {
        try {
            const blogs = await blogModel
                .find({ user: req.user._id })
                .populate("user", "username");

            res.render("./pages/my-blogs", { blogs });

        } catch (err) {
            console.log(err);
            res.send("Error loading my blogs");
        }
    },

    // All Blogs
    async allBlogsPage(req, res) {
        try {
            const blogs = await blogModel
                .find()
                .populate("user", "username");

            res.render("./pages/all-blogs", { blogs });

        } catch (err) {
            console.log(err);
            res.send("Error loading blogs");
        }
    },

    // Edit Page
    async editBlogPage(req, res) {
        const blog = await blogModel.findById(req.params.id);
        res.render("./pages/edit-blog", { blog });
    },

    // Update Blog
    async editBlog(req, res) {
        try {
            let blog = await blogModel.findById(req.params.id);

            if (req.file) {
                if (blog.image) {
                    fs.unlinkSync(blog.image);
                }
                req.body.image = req.file.path;
            }

            await blogModel.findByIdAndUpdate(req.params.id, req.body);

            res.redirect("/admin/my-blogs");

        } catch (err) {
            console.log(err);
            res.send("Error updating blog");
        }
    },

    // Delete Blog
    async deleteBlog(req, res) {
        try {
            const blog = await blogModel.findById(req.params.id);

            if (blog.image) {
                fs.unlinkSync(blog.image);
            }

            await blogModel.findByIdAndDelete(req.params.id);

            res.redirect("/admin/my-blogs");

        } catch (err) {
            console.log(err);
            res.send("Error deleting blog");
        }
    }

};

export default adminPanelController;