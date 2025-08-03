import express from 'express';
import { getTopActiveUsers } from '../controllers/analytics.controller.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/analytics/top-active-users:
 *   get:
 *     summary: Top 3 active users (7 days)
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Active users
 */
router.get('/top-active-users', getTopActiveUsers);

export default router;