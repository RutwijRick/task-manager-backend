import express from 'express';
import { addComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.js';
import isBoardMember from '../middlewares/isBoardMember.js';


const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add comment
 *     tags: [Comments]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment added
 * /api/comments/{taskId}:
 *   get:
 *     summary: Get comments
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 */
router.post('/', addComment);
router.get('/:taskId', getComments);
export default router;