import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
    const { text, taskId } = req.body;
    try {
        const comment = await Comment.create({ text, taskId, commentedBy: req.user.id });
        global.io.emit('comment-added', comment);
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getComments = async (req, res) => {
    const { taskId } = req.params;
    try {
        const comments = await Comment.findAll({ where: { taskId } });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Not in the requirement but can be added/implemented later 

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        await comment.update(req.body);
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        await comment.destroy();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};