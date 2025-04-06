import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { addComment, addReply, getComments } from '../controllers/comments.controller.js';

const router = express.Router();


router.post('/:blogId/comments', protectRoute, addComment);
router.post('/:blogId/comments/:commentId/replies', protectRoute, addReply);
router.get('/:blogId/comments', getComments);


export default router;