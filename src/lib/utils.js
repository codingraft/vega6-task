import jwt from "jsonwebtoken";

export const generateToken = (userId, response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
  });

  response.cookie("jwt", token, {
      httpOnly: true, 
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV !== "development", 
  });

}