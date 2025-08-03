import Board from '../models/Board.js';
import Task from '../models/Task.js';

const canEditOrDeleteTask = async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const board = await Board.findByPk(task.boardId);
    if (!board) return res.status(404).json({ error: 'Board not found for this task' });

    const isBoardOwner = board.createdBy === userId;
    const isAssignee = task.assigneeId === userId;

    if (!isBoardOwner && !isAssignee) {
      return res.status(403).json({ error: 'You are not authorized to modify this task' });
    }

    req.task = task; // attach if needed downstream
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default canEditOrDeleteTask;
