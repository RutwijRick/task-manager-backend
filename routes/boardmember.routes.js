import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { addBoardMember } from '../controllers/boardmember.controller.js';
import isBoardMember from '../middlewares/isBoardMember.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/board-members:
 *   post:
 *     summary: Add a member to a board
 *     tags: [BoardMembers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               boardId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Board member added
 *       200:
 *         description: Member already exists
 */
router.post('/', isBoardMember, addBoardMember);

export default router;
