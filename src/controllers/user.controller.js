import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { rm } from "fs";
export const signup = async (req, res) => {
  
  try {
    const { name, email, password } = req.body;
    const profilePicture = req.file;
    console.log("Profile Picture", profilePicture);
    console.log("Request Body", req.body);
    if (!profilePicture) {
      return next(new ErrorHandler("Please upload an image", 400));
    }
    if (!name || !email || !password ) {
      rm(profilePicture.path, () => {
        console.log("Image deleted");
      });
      return res.status(400).json({ message: "All fields are required" });
    }
   

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
   

    const user = await User.findOne({ email });

    if (user){
      rm(profilePicture.path, () => {
        console.log("Image deleted");
      });
      return res.status(400).json({ message: "Email already exists" });
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture: profilePicture ? profilePicture.path : "",
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    // delete the image if user creation fails
    if (req.file) {
      rm(profilePicture.path, () => {
        console.log("Image deleted");
      });
    }
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

