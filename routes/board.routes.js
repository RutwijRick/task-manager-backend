import express from 'express';
import { createBoard, deleteBoard, getBoards, updateBoard } from '../controllers/board.controller.js';
import authMiddleware from '../middlewares/auth.js';
import isBoardUser from '../middlewares/isBoardUser.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Create a board
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Board created
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: List of boards
 */

router.post('/', createBoard);
router.get('/', getBoards);

/**
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     summary: Update board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: Updated board
 *   delete:
 *     summary: Delete board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Deleted
 */
router.put('/:id', isBoardUser, updateBoard);
router.delete('/:id', isBoardUser, deleteBoard);
export default router;
