import blogModel from "../models/blogModel.js";

const adminPanelController = {

  // Add Blog Page
  addBlogPage(req, res) {
    res.render("pages/addBlog");
  },

  // Create Blog
  async createBlog(req, res) {
    try {
      const { title, content, excerpt, tags } = req.body;

      await blogModel.create({
        title,
        content,
        excerpt,
        tags: tags ? tags.split(",") : [],
        image: req.file ? req.file.filename : null,
        user: req.user._id
      });

      res.redirect("/blog");
    } catch (error) {
      console.log(error);
    }
  },

  // Edit Page
  async updateBlog(req, res) {
  try {
    const { id } = req.params;

    let updateData = {
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt,
      tags: req.body.tags ? req.body.tags.split(",") : []
    };

    // 🔥 IMAGE UPDATE LOGIC
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await blogModel.findByIdAndUpdate(id, updateData);

    res.redirect("/admin/my-blogs");

  } catch (error) {
    console.log(error);
  }
},
async editBlogPage(req, res) {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    res.render("pages/editBlog", { blog });

  } catch (error) {
    console.log(error);
  }
},

  // Update Blog
  async updateBlog(req, res) {
    try {
      const { title, content, excerpt, tags } = req.body;

      await blogModel.findByIdAndUpdate(req.params.id, {
        title,
        content,
        excerpt,
        tags: tags ? tags.split(",") : [],
        updatedAt: Date.now()
      });

      res.redirect("/blog");
    } catch (error) {
      console.log(error);
    }
  },

  // Delete Blog
  async deleteBlog(req, res) {
    try {
      await blogModel.findByIdAndDelete(req.params.id);
      
      res.redirect("/blog");
    } catch (error) {
      console.log(error);
    }
  }

};

export default adminPanelController;