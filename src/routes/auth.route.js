import express from "express";
import { login, signup, logout } from "../controllers/user.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup",singleUpload, signup);
router.post("/logout", logout);


export default router;