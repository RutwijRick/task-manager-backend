import Task from '../models/Task.js';
import Comment from '../models/Comment.js';
import { Op } from 'sequelize';

export const getTopActiveUsers = async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
        const [tasks, comments] = await Promise.all([
            Task.findAll({ where: { updatedAt: { [Op.gte]: sevenDaysAgo } }, attributes: ['createdBy'] }),
            Comment.findAll({ where: { createdAt: { [Op.gte]: sevenDaysAgo } }, attributes: ['commentedBy'] })
        ]);

        const activityCount = {};

        for (const t of tasks) activityCount[t.createdBy] = (activityCount[t.createdBy] || 0) + 1;
        for (const c of comments) activityCount[c.commentedBy] = (activityCount[c.commentedBy] || 0) + 1;

        const topUsers = Object.entries(activityCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([userId, activity]) => ({ userId, activity }));

        res.json(topUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
