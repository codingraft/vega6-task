# MERN Blog Application - Backend Documentation

## Overview

This is the backend component of a MERN stack blog application, built with Node.js, Express.js, and MongoDB. It provides a RESTful API for blog post management and a nested comment system with authentication.

## Features

### Blog Post Management
- Create, Read, Update, and Delete blog posts
- Image upload handling for blog images
- Input validation and error handling
- Timestamps for creation and updates

### Comment System
- Add comments to blog posts
- Reply to existing comments (nested comments)
- User association for comments and replies
- Population of user details in responses

### Authentication
- JWT authentication for protected routes
- Password hashing with bcrypt
- Protected comment and reply functionality

## API Endpoints

### Blog Posts
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get single blog post
- `POST /api/blogs` - Create new blog post (requires auth)
- `PUT /api/blogs/:id` - Update blog post (requires auth)
- `DELETE /api/blogs/:id` - Delete blog post (requires auth)

### Comments
- `GET /api/blogs/:blogId/comments` - Get all comments for a blog post
- `POST /api/blogs/:blogId/comments` - Add comment to blog post (requires auth)
- `POST /api/blogs/:blogId/comments/:commentId/replies` - Add reply to comment (requires auth)

## Database Schema

### User
```javascript
{
   name: String,
  email: String,
  profilePicture: String,

}
```
### Blog
```javascript
{
  title: String,
  description: String,
  image: String,
  comments: [Comment]
}
```

### Comment
```javascript
{
  user: ObjectId (ref: 'User'),
  text: String,
  createdAt: Date,
  replies: [Reply]
}
```

### Reply
```javascript
{
  user: ObjectId (ref: 'User'),
  text: String,
  createdAt: Date
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing with Postman

Import the Postman collection from `/postman` directory to test all API endpoints. The collection includes:
- Blog CRUD operations
- Comment and reply functionality
- Example requests with proper authentication

## Dependencies
- express
- mongoose
- multer (for file uploads)
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)
- dotenv (for environment variables)


## Project Structure
```
backend/
├── src/              # source
  ├── lib/              # Database configuration
  ├── controllers/      # Route controllers
  ├── models/           # MongoDB models
  ├── routes/           # API routes
  ├── middleware/       # Custom middleware
  ├── uploads/          # File uploads storage
  ├── app.js            # express server
├── .env              # Environment variables

```
