import Task from '../models/Task.js';
import BoardMember from '../models/BoardMember.js';

export default async function isTaskBoardMember(req, res, next) {
  const taskId = req.body.id || req.params.id;
  if (!taskId) return res.status(400).json({ error: 'Task ID is required' });

  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const boardId = task.boardId;
    const userId = req.user.id;

    // Is user a board member?
    const isMember = await BoardMember.findOne({
      where: { boardId, userId }
    });

    if (isMember) return next();

    return res.status(403).json({ error: 'Not authorized for this task' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
