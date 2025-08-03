import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    const { title, description, boardId, teamId } = req.body;
    try {
        const task = await Task.create({ title, description, boardId, teamId, createdBy: req.user.id });
        global.io.emit('task-created', task);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTasks = async (req, res) => {
    const { status, teamId, page = 1, limit = 10 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (teamId) where.teamId = teamId;
    const offset = (page - 1) * limit;

    try {
        const tasks = await Task.findAndCountAll({ where, offset: +offset, limit: +limit });
        res.json({ total: tasks.count, tasks: tasks.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTasksByBoardId = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { boardId } = req.params;

    if (!boardId) {
        return res.status(400).json({ error: 'Board ID is required' });
    }

    const offset = (page - 1) * limit;

    try {
        const tasks = await Task.findAndCountAll({
            where: { boardId },
            offset: parseInt(offset),
            limit: parseInt(limit),
        });

        res.json({
            total: tasks.count,
            page: parseInt(page),
            totalPages: Math.ceil(tasks.count / limit),
            tasks: tasks.rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ error: 'Title & Description is required' });

        await task.update({ title, description });
        global.io.to(`board-${task.boardId}`).emit('task-updated', task);
        res.json({ message: 'Task Title & Description updated', task: task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        await task.destroy();
        global.io.to(`board-${task.boardId}`).emit('task-deleted', { id: task.id });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const assignTaskToTeam = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const { teamId } = req.body;
        if (!teamId) return res.status(400).json({ error: 'Team ID is required' });

        await task.update({ teamId });
        global.io.to(`board-${task.boardId}`).emit('task-updated', task);
        res.json({ message: 'Task assigned to team: ' + teamId, task: task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const changeTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const { status } = req.body;
        if (!status) return res.status(400).json({ error: 'Status is required' });

        await task.update({ status });

        // Build a structured event object
        const updateEvent = {
            message: `Task "${task.title}" status changed to "${status}".`,
            task: task
        };
        global.io.to(`board-${task.boardId}`).emit('task-updated', updateEvent);

        res.json({ message: 'Task status changed to: ' + status, task: task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}