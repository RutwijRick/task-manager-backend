import BoardMember from '../models/BoardMember.js';

export default async function isBoardMember(req, res, next) {
    const boardId = req.body.boardId || req.params.boardId;
    if (!boardId) return res.status(400).json({ error: 'Board ID is required' });

    const member = await BoardMember.findOne({ where: { boardId, userId: req.user.id } });
    if (!member) return res.status(403).json({ error: 'Not authorized for this board' });

    next();
}
