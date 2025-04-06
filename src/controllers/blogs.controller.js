
import Blog from "../models/blog.model.js";
import { rm } from "fs";

export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    // console.log("Image", image);
    // console.log("Request Body", req.body);

    if (!title || !description || !image) {
      if (image) {
        rm(image.path, () => {
          console.log("Image deleted");
        });
      }
      return res.status(400).json({ error: "All fields are required" });
    }

    const blog = new Blog({ title, description, image: image.path });
    await blog.save();

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    // delete the image if there is an error
    if (req.file) {
      rm(req.file.path, () => {
        console.log("Image deleted");
      });
    }
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = req.file;
    console.log("Image", image);

    // Find the existing blog
    const blog = await Blog.findById(req.params.id);
    console.log("Blog image", blog.image);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }


    // Update blog
     if (title) {
      blog.title = title;
    }
    if (description) {
      blog.description = description;
    }
    if (image) {

      // Save the new image path
      console.log("New image", image.path);
      blog.image = image.path;
    }
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    console.log("Blog", blog);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
