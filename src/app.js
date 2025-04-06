import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/auth.route.js";
import blogsRoutes from "./routes/blog.route.js";
import commentsRoutes from "./routes/comments.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); 
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4000;

app.get("/", (_, res) => {
  res.send("Hello Worlds!");
});
app.use("/users", usersRoutes);
app.use("/blogs", blogsRoutes);
app.use('/comments', commentsRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
