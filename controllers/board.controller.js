import Board from '../models/Board.js';

// Boards created with board member also added
export const createBoard = async (req, res) => {
    const { name } = req.body;

    try {
        const board = await Board.create({
            name,
            createdBy: req.user.id,
        });

        // 👇 Uses Sequelize magic method (boardId is auto-added)
        await board.createMembership({ userId: req.user.id });

        res.status(201).json(board);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all Boards
export const getBoards = async (req, res) => {
    try {
        const boards = await Board.findAll();
        res.json(boards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update board details
export const updateBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Board name is required' });

    await board.update({ name });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete the board
export const deleteBoard = async (req, res) => {
    try {
        const board = await Board.findByPk(req.params.id);
        if (!board) return res.status(404).json({ error: 'Board not found' });
        await board.destroy();
        res.json({ message: 'Board deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};