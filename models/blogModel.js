import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  tags: {
    type: [String],
  },
  publishedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Model name should be singular (mongoose auto-pluralizes to "blogs")
const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;