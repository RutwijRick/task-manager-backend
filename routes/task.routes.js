import express from 'express';
import { createTask, deleteTask, getAllTasksByBoardId, getTasks, updateTask, assignTaskToTeam, changeTaskStatus } from '../controllers/task.controller.js';
import authMiddleware from '../middlewares/auth.js';
import isBoardMember from '../middlewares/isBoardMember.js';
import isTaskBoardMember from '../middlewares/isTaskBoardMember.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 *   get:
 *     summary: Get tasks with filters
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: teamId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.post('/', isBoardMember, createTask);
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks/board/{boardId}:
 *   get:
 *     summary: Get paginated tasks by board ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: List of tasks for the board
 */
router.get('/board/:boardId', getAllTasksByBoardId);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Updated task
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
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
router.put('/:id', isBoardMember, updateTask);
router.delete('/:id', isBoardMember, deleteTask);

/**
 * @swagger
 * /api/tasks/assign/{id}:
 *   put:
 *     summary: Assign task
 *     tags: [Tasks]
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task assigned
 */
router.put('/assign/:id', isTaskBoardMember, assignTaskToTeam);

/**
 * @swagger
 * /api/tasks/changeStatus/{id}:
 *   put:
 *     summary: Change task status
 *     tags: [Tasks]
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task status changed
 */
router.put('/changeStatus/:id', changeTaskStatus);

export default router;
