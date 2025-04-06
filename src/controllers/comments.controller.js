import Blog from "../models/blog.model.js";

export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;

        
        if (!text) {
          return res.status(400).json({ error: 'Comment text is required' });
        }
    
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
    
        blog.comments.push({ user: userId, text });
        await blog.save();
    
        // Populate user details in the response
        const populatedBlog = await Blog.findById(blog._id)
          .populate('comments.user', 'username email')
          .populate('comments.replies.user', 'username email');
    
        res.status(201).json({
          success: true,
          data: populatedBlog.comments[populatedBlog.comments.length - 1]
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    };
export const addReply = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;
        const { blogId, commentId } = req.params;
        
        if (!text) {
          return res.status(400).json({ error: 'Reply text is required' });
        }
    
        const blog = await Blog.findById(blogId);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
    
        const comment = blog.comments.id(commentId);
        if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
    
        comment.replies.push({ user: userId, text });
        await blog.save();
    
        // Populate user details in the response
        const populatedBlog = await Blog.findById(blog._id)
          .populate('comments.user', 'username email')
          .populate('comments.replies.user', 'username email');
    
        const updatedComment = populatedBlog.comments.id(commentId);
        
        res.status(201).json({
          success: true,
          data: updatedComment.replies[updatedComment.replies.length - 1]
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    };
export const getComments = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId)
          .populate('comments.user', 'username email')
          .populate('comments.replies.user', 'username email')
          .select('comments');
    
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
    
        res.status(200).json({
          success: true,
          data: blog.comments
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    };

