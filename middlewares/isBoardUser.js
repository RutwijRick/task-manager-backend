import Board from '../models/Board.js';

export default async function isBoardUser(req, res, next) {
    const boardId = req.body.id || req.params.id;
    if (!boardId) return res.status(400).json({ error: 'Board ID is required' });

    const member = await Board.findOne({ where: { id: boardId, createdBy: req.user.id } });
    if (!member) return res.status(403).json({ error: 'Not authorized for this board' });

    next();
}
