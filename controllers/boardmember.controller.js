import BoardMember from '../models/BoardMember.js';

export const addBoardMember = async (req, res) => {
    const { userId, boardId } = req.body;

    if (!userId || !boardId) {
        return res.status(400).json({ error: 'userId and boardId are required' });
    }

    try {
        const existing = await BoardMember.findOne({ where: { userId, boardId } });

        if (existing) {
            return res.status(200).json({ message: 'Member already exists', member: existing });
        }

        const boardMember = await BoardMember.create({ userId, boardId });
        res.status(201).json({ message: 'Board member added', member: boardMember });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

