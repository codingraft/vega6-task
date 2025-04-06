import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blogs.controller.js";
const router = express.Router();

import { blogUpload, singleUpload } from "../middleware/multer.js";
import { protectRoute } from "../middleware/auth.js";

router.post("/", protectRoute, blogUpload, createBlog);
router.get("/", protectRoute, getBlogs);
router.get("/:id", protectRoute, getBlog);
router.put("/:id", protectRoute, blogUpload, updateBlog);
router.delete("/:id", protectRoute, deleteBlog);
export default router;
