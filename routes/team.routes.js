import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { createTeam, getTeams } from '../controllers/team.controller.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Team created
 *   get:
 *     summary: Fetch all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: All Teams
 * 
 */

router.post('/', createTeam);
router.get('/', getTeams);

export default router;