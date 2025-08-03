import Task from "../models/Task";

export default async function isTaskExists(req, res, next) {
    const taskId = req.body.id || req.params.id;
    if (!taskId) return res.status(400).json({ error: 'Task ID is required' });

    // is the user the creator
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    next();
}
